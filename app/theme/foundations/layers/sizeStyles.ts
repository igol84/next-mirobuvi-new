export const sizeStyles = {
  shoesSize: {
    cursor: 'pointer',
    border: '1px',
    px: 2,
    py: 1.5,
    borderRadius: 8,
    borderColor: 'gray.500',
    _hover: {
      borderColor: 'primary',
      backgroundColor: 'primary.200',
      _dark: {
        backgroundColor: 'primary.800',
      }
    },
  },
  shoesSizeEmpty: {
    userSelect: 'none',
    border: '1px dashed',
    opacity: 0.7,
    px: 2,
    py: 1.5,
    borderRadius: 8,
    borderColor: 'gray.500',
  },
  shoesSizeSelected: {
    userSelect: 'none',
    cursor: 'pointer',
    border: '1px',
    px: 2,
    py: 1.5,
    borderRadius: 8,
    bg: 'primary.500',
    color: 'primary.50',
    _dark: {
      bg: 'primary.500',
    }
  }
}