import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
const ThemeIcon = ({theme, ...props}: any) => {
    if(theme === 'dark'){
      return <MoonIcon {...props}/>
    }
    else{
      return <SunIcon {...props}/>
    }
};

export default ThemeIcon;