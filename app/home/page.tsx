import { auth } from "@/auth";
import Logout from "@/components/Logout";
import RoomOpsCard from "@/components/RoomOpsCard";

import Image from "next/image";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) redirect("/auth/login");

  return (
    <div className="flex flex-col items-center m-4 gap-[2vh]">
      <h1>{session.user.name}</h1>
      <Image
        className="rounded-full"
        src={session.user.image || ""}
        alt={session.user.name || ""}
        width={72}
        height={72}
      />
      <Logout />

      <RoomOpsCard />
    </div>
  );
};

export default page;
