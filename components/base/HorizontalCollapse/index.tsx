import React, {useState} from 'react';
import {motion} from "framer-motion";

interface Props{
  children?: React.ReactNode
  isOpen: boolean
}

const HorizontalCollapse = ({children, isOpen}: Props) => {
  const [hidden, setHidden] = useState(!isOpen);
  return (
    <motion.div
      hidden={hidden}
      initial={false}
      onAnimationStart={() => setHidden(false)}
      onAnimationComplete={() => setHidden(!isOpen)}
      animate={{width: isOpen ? 270 : 0}}
      style={{whiteSpace: "nowrap"}}
    >
      {children}
    </motion.div>
  );
};

export default HorizontalCollapse;