import db from "@/lib/db";

export const getUserByEmail = async (email: string | undefined) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (e) {}
};

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (e) {
    return { error: "No user Found" };
  }
};
