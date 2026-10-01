import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";
import { getOrCreateUser } from "@/lib/db/queries/user";

export default async function DashboardPage() {
  const user = await getOrCreateUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Welcome, {user.name ?? "User"}</h1>

      <p>You are successfully authenticated.</p>

      <p>Email: {user.email}</p>

      <LogoutButton />
    </main>
  );
}