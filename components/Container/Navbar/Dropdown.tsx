import MenuItems from "@/components/Container/Navbar/MenuItems";
import {Box} from "@chakra-ui/react";
import {Item} from "@/components/Container/Navbar/types";

type Props = {
  submenus: Item[],
  dropdown: boolean,
  depthLevel: number,
  isMobile?: boolean
  onClose: () => void
}
const Dropdown = ({ submenus, dropdown, depthLevel, isMobile, onClose}: Props) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = !isMobile && depthLevel > 1 ? "dropdown-submenu" : "";
  const boxShadow = isMobile ? 'none': 'base'
  const darkBoxShadow = isMobile ? 'none': 'dark-lg'
  const position = isMobile ? 'inherit': 'absolute'
  return (
    <Box as={'ul'}  position={position} boxShadow={boxShadow}
         _dark={{bg:'bodyColor', boxShadow: darkBoxShadow}}
         className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>
      ))}
    </Box>
  );
};

export default Dropdown;