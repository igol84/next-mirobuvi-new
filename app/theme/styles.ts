import semanticTokens from "@/app/theme/foundations/semanticTokens";

const styles = {
  global: {
    html: {
      height: '100%',
    },
    body: {
      height: '100%',
      bg: semanticTokens.colors.bgBodyColor.default,
      _dark: {
        bg: semanticTokens.colors.bgBodyColor._dark,
      }
    },
    // styles for the `a`
    a: {
      _hover: {
        textDecoration: 'none',
      },
    },
  },
}

export default styles