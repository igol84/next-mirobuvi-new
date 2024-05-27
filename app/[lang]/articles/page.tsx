import {Lang} from "@/dictionaries/get-dictionary";

type Props = {
  params: {
    lang: Lang
  }
}

const Page = async ({params: {lang}}: Props) => {
  return (
    <div>
      articles
    </div>
  )
}

export default Page