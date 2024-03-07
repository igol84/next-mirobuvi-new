import React from "react";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {env} from "@/lib/env";
import {redirect} from "next/navigation";
import Container from "./Container";


export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.home.admin,
    description: dict.home.admin,
  }
}


export default async function RootLayout(
  {
    children,
    params: {lang},
  }: {
    children: React.ReactNode
    params: { lang: Lang }
  }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${lang}/admin/orders`)
  }
  const user = session.user;
  const admins = JSON.parse(env.ADMINS)
  if (!admins.includes(String(user.email))){
    const dict = await getDictionary(lang)
    return <div>{dict.home.notAdmin}</div>
  }

  return <Container>{children}</Container>
}
