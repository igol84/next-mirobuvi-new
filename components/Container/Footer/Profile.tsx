import React, {useContext} from 'react';
import {Box, Flex, Heading, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import {signIn, signOut} from "next-auth/react";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

type Props = {
  isAuthorized: boolean
}

const Profile = ({isAuthorized}: Props) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("footer")
  return (
    <Box>
      <Heading size='xl' pb={2}>{d('profile')}</Heading>
      {isAuthorized ? (
        <Link as={NextLink} href='#' onClick={() => signOut()} _hover={{color: 'hoverLinkTextColor'}}>
          <Flex alignItems='center' gap={1} p={2}>
            <span className="_icon-person"/>
            {d('signOut')}
          </Flex>
        </Link>
      ) : (
        <Link as={NextLink} href='#' onClick={() => signIn()} _hover={{color: 'hoverLinkTextColor'}}>
          <Flex alignItems='center' gap={1}  p={2}>
            <span className="_icon-person"/>
            {d('signIn')}
          </Flex>
        </Link>
      )}
      <Link as={NextLink} href={`/${lang}/profile/orders-list`} _hover={{color: 'hoverLinkTextColor'}}>
        <Flex alignItems='center' gap={1} p={2}>
          <span className="_icon-credit-card"/>
          {d('orders')}
        </Flex>
      </Link>
    </Box>
  );
};

export default Profile;