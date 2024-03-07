import React from 'react';
import {Box, Flex, Heading, Link} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const Contacts = () => {
  const d = useDictionaryTranslate("footer")
  return (
    <Box>
      <Heading size='xl' pb={2}>{d('contacts')}</Heading>
      <Link href="tel:+380933375372" _hover={{color: 'hoverLinkTextColor'}}>
        <Flex alignItems='center' gap={1} p={2}>
          <span className="_icon-phone"/>
          +38(093)33-75-372
        </Flex>
      </Link>
      <Link href="mailto:info@mirobuvi.com.ua" _hover={{color: 'hoverLinkTextColor'}}>
        <Flex alignItems='center' gap={1} p={2}>
          <span className="_icon-mail"/>
          info@mirobuvi.com.ua
        </Flex>
      </Link>
      <Box>
        <Flex alignItems='center' gap={1} p={2}>
          <span className="_icon-clock"/>
          {d('monFri')} 9:00-19:00
        </Flex>
      </Box>
    </Box>
  );
};

export default Contacts;