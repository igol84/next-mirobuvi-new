import {defineStyle, defineStyleConfig} from '@chakra-ui/react'
import semanticTokens from "@/app/theme/foundations/semanticTokens";

const colorfulVariant = defineStyle((props) => {
  const {colorScheme: c} = props // add color scheme as a prop
  return {
    _light: {
      bg: `${c}.200`,
      color: `${c}.800`,
    },
    _dark: {
      bg: `${c}.700`,
      color: `${c}.200`,
    },
  }
})
const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {},
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      fontWeight: 'bold',
      textTransform: 'lowercase',
      borderRadius: 'base', // <-- border radius is same for all variants and sizes
      border: 'none',
      color: 'primary.700',
      _hover: {
        bg: 'primary.50',
        color: 'primary.900',
      },
      _dark: {
        textTransform: 'uppercase',
        color: 'primary.200',
        _hover: {
          bg: 'primary.900',
          color: 'primary.100',
        },

      }
    },
    solid: {
      bg: 'purple.500',
      color: 'white',
    },
    navButton: {
      w: '100%',
      justifyContent: 'left',
      fontWeight: 'inherit',
      h: '100%',
      borderRadius: "none",
      px: 3,
      py: 4,
      bg: semanticTokens.colors.bodyColor.default,
      color: 'primary.900',
      _hover: {
        bg: 'primary.300',
        color: 'primary.900',
        textDecoration: 'none',
      },
      _dark: {
        bg: semanticTokens.colors.bodyColor._dark,
        color: 'primary.200',
        _hover: {
          bg: 'primary.200',
          color: 'primary.900',
        },
      }
    },
    navButtonSelected: {
      w: '100%',
      justifyContent: 'left',
      fontWeight: 'inherit',
      h: '100%',
      borderRadius: "none",
      pointerEvents: 'none',
      px: 3,
      py: 4,
      bg: 'primary.300',
      color: 'primary.900',
      textDecoration: 'none',
      _dark: {
        bg: 'primary.200',
        color: 'primary.900',
      }
    },
    cart: {
      bg: 'teal.200',
      color: 'teal.900',
      _hover: {
        bg: 'teal.300',
        color: 'teal.900',
        textDecoration: 'none',
      },
      _dark: {
        bg: 'teal.300',
        color: 'white',
        _hover: {
          bg: 'teal.400',
          color: 'white',
        },
      }
    },
    cartCheckout: {
      bg: 'green.200',
      color: 'green.900',
      _hover: {
        bg: 'green.300',
        color: 'green.900',
        textDecoration: 'none',
      },
      _dark: {
        bg: 'green.600',
        color: 'white',
        _hover: {
          bg: 'green.500',
          color: 'white',
        },
      }
    },
    pagination: {
      bg: 'gray.200',
      color: 'gray.900',
      _hover: {
        bg: 'gray.300',
        color: 'gray.900',
        textDecoration: 'none',
      },
      _dark: {
        bg: 'gray.600',
        color: 'white',
        _hover: {
          bg: 'gray.500',
          color: 'white',
        },
      }
    },
    paginationSelected: {
      cursor: 'default',
      bg: 'gray.300',
      color: 'gray.900',
      _dark: {
        bg: 'gray.500',
        color: 'white',
      }
    },
    colorful: colorfulVariant,
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  }
})

export default Button