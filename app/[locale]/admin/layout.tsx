import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/auth";
import {env} from "@/lib/env";
import {redirect} from "next/navigation";
import Container from "./Container";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";


export async function generateMetadata({params: {locale}}: { params: { locale: Locale } }) {
  const t = await getTranslations({locale, namespace: 'home'})
  return {
    title: t('admin'),
    description: t('admin'),
  }
}


export default async function RootLayout(
  {
    children,
    params: {locale},
  }: {
    children: React.ReactNode
    params: { locale: Locale }
  }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${locale}/admin/orders`)
  }
  const user = session.user;
  const admins = JSON.parse(env.ADMINS)
  if (!admins.includes(String(user.email))){
    const t = await getTranslations({locale, namespace: 'home'})
    return <div>{t('notAdmin')}</div>
  }

  return <Container>{children}</Container>
}
