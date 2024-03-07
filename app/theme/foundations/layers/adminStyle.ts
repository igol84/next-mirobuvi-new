export const adminStyles = {
  adminMenu: {
    gap: 2,
    border: '1px',
    p: 2,
    borderRadius: 8,
    borderColor: 'gray.500',
  },
  adminOrderWithItems: {
    gap: 4,
    mb: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    border: '1px',
    borderRadius: 8,
    borderColor: 'gray.500',
  },
  adminOrder: {
    gap: 4,
    p: 2,
    borderRadius: '8px 8px 0 0',
    borderBottom: '1px',
    borderColor: 'gray.500',
    bgColor: 'gray.200',
    _dark: {
      bgColor: 'gray.600',
      color: 'white'
    },
    alignItems: 'center',
    justifyContent: 'space-around',
    transitionDuration: "200ms"
  },
  adminOrderProduct: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    borderRadius: 16,
    bgColor: 'white',
    _dark: {
      bgColor: 'gray.700',
    }
  },
  selectedPagination: {
    bgColor: 'gray.200',
    _dark: {
      bgColor: 'gray.600',
    },
  },

}
