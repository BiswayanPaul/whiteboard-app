"use server";

import { signIn, signOut } from "@/auth";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export async function doSocialLogin(formData: any) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/home" });
}
export async function doLogout() {
  await signOut({ redirectTo: "/auth/login" });
}

export async function doCredentialLogin(formData: any) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "No User found" };
    }

    const validatePassword = await bcrypt.compare(
      password as string,
      existingUser.password
    );

    if (!validatePassword) {
      return { error: "Incorrect Password" };
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch (e) {
    return { error: "Something went wrong" };
  }
}

export async function doCredentialRegister(formData: any) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) return { error: "User already exists" };

    const hashedPassword = await bcrypt.hash(password as string, 10);
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "User created" };
  } catch (e) {
    throw new Error("User can't be created");
  }
}
