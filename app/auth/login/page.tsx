import { auth } from "@/auth";
import LoginCard from "@/components/LoginCard";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/home");
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoginCard />
    </div>
  );
};

export default LoginPage;
