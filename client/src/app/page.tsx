import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    redirect("/pets");
  }

  redirect("/sign-in");
}
