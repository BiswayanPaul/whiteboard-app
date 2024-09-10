"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { doSocialLogin, doCredentialLogin } from "@/app/actions";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginCard() {
  const route = useRouter();
  async function handleFormSubmit(event: any) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);

      if (response.error === "No User found") {
        route.push("/auth/register");
      }

      if (!response.error) {
        route.push("/home");
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="flex justify-center items-center">
      <Card className="w-[38vh]">
        <CardHeader>
          <CardTitle>Authenticate Yourself</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder=" johndoe@example.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="*******"
                />
              </div>
              <Button>SignIn</Button>
            </div>
          </form>
          <Link href="/auth/register">
            <Button variant="link">don't have account?</Button>
          </Link>
          <div className="flex items-center justify-center text-amber-950">
            {" "}
            OR{" "}
          </div>
          <form action={doSocialLogin}>
            <div className="flex justify-between gap-x-4">
              <Button
                className="w-full"
                type="submit"
                name="action"
                value="google"
                variant="destructive"
              >
                <FaGoogle />
              </Button>
              <Button
                className="w-full"
                type="submit"
                name="action"
                value="github"
                variant="outline"
              >
                <FaGithub />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginCard;
