import Dropdown from "@/components/Container/Navbar/Dropdown";
import {useContext, useEffect, useRef, useState} from "react";
import NextLink from "next/link";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {LangContext} from "@/locale/LangProvider";
import {Item} from "@/components/Container/Navbar/types";
import {usePathname} from "next/navigation";
import {getIcon} from "@/app/theme/icons/customIcons";

type Props = {
  items: Item
  depthLevel: number
  isMobile?: boolean
  onClose: () => void
}

const MenuItems = ({items, depthLevel, isMobile, onClose}: Props) => {
  const lang = useContext(LangContext)
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (dropdown && ref.current && !ref.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);
  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };
  const closeDropdown = () => {
    !isMobile && dropdown && setDropdown(false);
  };
  const currentUrl = usePathname()
  const Icon = items.url ? getIcon(items.url) : null
  return (
    <Box as={'li'} position='relative' className="menu-items" ref={ref} onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave} onClick={closeDropdown}
    >
      {items.submenu && items.url ? (
        <>
          <Button h={!isMobile && depthLevel > 0 ? 1 : 'none'} variant='navButton' aria-haspopup="menu" pl={2}
                  aria-expanded={dropdown ? "true" : "false"} w='100%'
                  onClick={() => setDropdown(prev => !prev)}
          >
            <Flex gap={1}>
              {!!Icon && <Icon/>}
              <Text as={NextLink} href={`/${lang}/${items.url}`} onClick={onClose}
                    w={!isMobile ? 'full' : undefined} textAlign={!isMobile ? 'left' : undefined}
              >
                {items.title}
              </Text>
            </Flex>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"/>}
          </Button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} isMobile={isMobile}
                    onClose={onClose}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <Button variant='navButton' aria-haspopup="menu" textAlign='left' aria-expanded={dropdown ? "true" : "false"}
                  onClick={() => setDropdown(prev => !prev)} pl={isMobile ? 2 * (depthLevel + 2) : 2}
          >
            {items.title}{' '}{!isMobile && depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"/>}
          </Button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} isMobile={isMobile}
                    onClose={onClose}
          />
        </>
      ) : items.url !== undefined ? (
        <Button h={!isMobile && depthLevel > 0 ? 1 : 'none'} onClick={onClose}
                variant={`/${lang}/${items.url}` === currentUrl ? 'navButtonSelected' : 'navButton'}
                pl={isMobile && depthLevel > 0 ? 2 * (depthLevel + 2) : 2} as={NextLink}
                href={`/${lang}/${items.url}`} gap={1}>
          {!!Icon && <Icon/>}
          {items.title}
        </Button
        >
      ) : ''}
    </Box>
  );
};

export default MenuItems;