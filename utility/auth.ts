'use server'
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {env} from "@/lib/env";

export const checkForAdmin = async () => {
  const session = await getServerSession(authOptions)
  const admins = JSON.parse(env.ADMINS) as string[]
  return admins.includes(String(session?.user.email))
}
