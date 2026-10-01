import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db/prisma";

export async function getOrCreateUser() {
  const supabase = await createClient();

  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Authentication error: ${error.message}`);
  }

  if (!authUser) {
    return null;
  }

  const name =
    authUser.user_metadata?.name ??
    authUser.user_metadata?.full_name ??
    null;

  const email = authUser.email;

  if (!email) {
    throw new Error("Authenticated user does not have an email address.");
  }

  const user = await prisma.user.upsert({
    where: {
      authUserId: authUser.id,
    },

    update: {
      email,
      name,
    },

    create: {
      id: crypto.randomUUID(),
      authUserId: authUser.id,
      email,
      name,
      updatedAt: new Date(),
    },
  });

  return user;
}