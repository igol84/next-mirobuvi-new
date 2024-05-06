'use server'
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {env} from "@/lib/env";

export const checkForAdmin = async (): Promise<boolean> => {
  const session = await getServerSession(authOptions)
  const admins = JSON.parse(env.ADMINS) as string[]
  if (session?.user.email)
    return admins.includes(session.user.email)
  return false
}


export const checkForAuth = async () => {
  const session = await getServerSession(authOptions)
  return !!session
}