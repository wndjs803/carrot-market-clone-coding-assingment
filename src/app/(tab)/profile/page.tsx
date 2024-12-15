import { notFound, redirect } from "next/navigation";

import db from "@/utils/db";
import { getSession } from "@/utils/session";
import Button from "@/components/button";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <main className="flex flex-col gap-20 items-center justify-center">
      <h1 className="mt-40 text-xl font-bold">Welcome! {user?.username}!</h1>
      <form className="w-full" action={logOut}>
        <Button text="Log out" />
      </form>
    </main>
  );
}
