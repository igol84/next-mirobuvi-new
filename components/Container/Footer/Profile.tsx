import React from 'react';
import {Box, Flex, Heading, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import {signIn, signOut} from "next-auth/react";
import {useLocale, useTranslations} from "next-intl";

type Props = {
  isAuthorized: boolean
}

const Profile = ({isAuthorized}: Props) => {
  const t = useTranslations('footer')
  const locale = useLocale()
  return (
    <Box>
      <Heading size='xl' pb={2}>{t('profile')}</Heading>
      {isAuthorized ? (
        <Link as={NextLink} href='#' onClick={() => signOut()} _hover={{color: 'hoverLinkTextColor'}}>
          <Flex alignItems='center' gap={1} p={2}>
            <span className="_icon-person"/>
            {t('signOut')}
          </Flex>
        </Link>
      ) : (
        <Link as={NextLink} href='#' onClick={() => signIn()} _hover={{color: 'hoverLinkTextColor'}}>
          <Flex alignItems='center' gap={1}  p={2}>
            <span className="_icon-person"/>
            {t('signIn')}
          </Flex>
        </Link>
      )}
      <Link as={NextLink} href={`/${locale}/profile/orders-list`} _hover={{color: 'hoverLinkTextColor'}}>
        <Flex alignItems='center' gap={1} p={2}>
          <span className="_icon-credit-card"/>
          {t('orders')}
        </Flex>
      </Link>
    </Box>
  );
};

export default Profile;