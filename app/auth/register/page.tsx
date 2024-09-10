import { auth } from "@/auth";
import RegisterCard from "@/components/RegisterCard";
import { redirect } from "next/navigation";

const RegsterPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/home");
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <RegisterCard />
    </div>
  );
};

export default RegsterPage;
