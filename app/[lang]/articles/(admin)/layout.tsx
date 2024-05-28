import React from "react";
import {checkForAdmin} from "@/utility/auth";
import {redirect} from "next/navigation";

interface Props {
  children: React.ReactNode
}

export default async function RootLayout({children}: Props) {

  const isAdmin = await checkForAdmin()
  if (!isAdmin) redirect('/')
  return <>{children}</>
}
