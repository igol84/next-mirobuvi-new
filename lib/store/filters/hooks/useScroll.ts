import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

const useScroll = () => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])
}

export default useScroll