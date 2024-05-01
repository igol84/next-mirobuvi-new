import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {getTagUrls} from "@/lib/db/tagUrl";

export async function generateMetadata({params: {lang}}: { params: { lang: Lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.admin.title,
    description: dict.admin.description,
  }
}

interface Props {
  params: { lang: Lang }
}

const Page = async ({params: {lang}}: Props) => {
  const dict = await getDictionary(lang)
  const tags = await getTagUrls()
  if (tags && tags.length > 0) {
    return <div>{dict.tagAdmin.tagsNotFound}</div>
  }
  return <div>Page</div>
  
}

export default Page