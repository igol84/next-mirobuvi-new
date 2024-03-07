import React from 'react';
import {Box, Divider, Flex} from "@chakra-ui/react";
import Profile from "@/components/Container/Footer/Profile";
import Contacts from "@/components/Container/Footer/Contacts";

type Props = {
  isAuthorized: boolean
}

const Footer = ({isAuthorized}: Props) => {
  return (
    <Flex direction={{base: 'column', md: 'row'}} justifyContent={{md: 'space-between'}}>
      <Flex direction={{base: 'column', md: 'row'}} p={[1, 4, 8]} gap={[8, 16]} justifyContent='end'>
        <Profile isAuthorized={isAuthorized}/>
        <Divider orientation='vertical'/>
        <Contacts/>
      </Flex>
      <Flex p={[1, 4, 8]} justifyContent='end' alignSelf='end'>
        <Flex direction='column' alignItems='center'>
          <Box className="_icon-logo"/>
          2009-2023
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;