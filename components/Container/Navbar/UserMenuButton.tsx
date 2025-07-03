"use client";
import {signIn, signOut} from "next-auth/react";
import {
  Avatar,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import React, {useContext} from "react";
import {BiUser} from "react-icons/bi";
import Link from "next/link";
import {IsAdminContext} from "@/app/providers";
import {useStore} from "@/lib/store";
import {useLocale, useTranslations} from "next-intl";
import {Locale} from "@/i18n/request";


export default function UserMenuButton() {
  const user = useStore(
    (state) => state.user
  )
  const {onOpen, onClose, isOpen} = useDisclosure()
  const t = useTranslations('home')
  const locale = useLocale() as Locale
  const isAdmin = useContext(IsAdminContext)
  const text = {admin: t('admin'), orders: t('orders'), signOut: t('signOut'), signIn: t('signIn')}
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} autoFocus={false}>
      <PopoverTrigger>
        {user
          ? <Avatar name={user.name || ''} src={user.image || undefined} size={'sm'} sx={{cursor: 'pointer'}}/>
          :
          <IconButton variant='outline' icon={<BiUser/>} aria-label={'user'} fontSize={[20, 25, 30, 35]} isRound={true}
                      minW={[1, 2]}/>
        }
      </PopoverTrigger>
      <PopoverContent w='auto'>
        <PopoverArrow/>
        <PopoverBody>
          {user ? (
              <VStack align='flex-start'>
                {isAdmin && (
                  <Link href={`/${locale}/admin/orders`} onClick={onClose}>
                    {text.admin}
                  </Link>
                )}
                <Link href={`/${locale}/profile/orders-list`} onClick={onClose}>
                  {text.orders}
                </Link>
                <Link href='#' onClick={() => signOut()}>
                  {text.signOut}
                </Link>
              </VStack>
            )
            : (
              <Link href='#' onClick={() => signIn()}>
                {text.signIn}
              </Link>
            )
          }
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
