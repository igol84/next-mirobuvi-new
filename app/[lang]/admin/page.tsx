import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {redirect} from "next/navigation";

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.admin.title,
    description: dict.admin.description,
  }
}

type Props = {
  params: {
    lang: Lang
  }
}

async function Page({params: {lang}}: Props) {
  redirect(`/${lang}/admin/orders`)
}

export default Page;