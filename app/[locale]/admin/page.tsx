import {redirect} from "next/navigation";
import {Locale} from "@/i18n";
import {getTranslations} from "next-intl/server";

type Props = {
  params: {
    locale: Locale
  }
}


export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'admin'})
  return {
    title: t('title'),
    description: t('description'),
  }
}


async function Page({params: {locale}}: Props) {
  redirect(`/${locale}/admin/orders`)
}

export default Page;