import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-[4vh]">
      <p>Welcome to Whiteboard</p>
      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
