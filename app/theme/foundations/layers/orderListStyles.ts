export const orderListStyles = {
  ordersInProfile: {
    gap: 8,
    alignItems: 'start',
    width: 'full',
    cursor: 'pointer',
    border: '1px',
    px: 2,
    py: 1.5,
    borderRadius: 8,
    borderColor: 'gray.500',
    transitionDuration: '200ms',
    _hover: {
      backgroundColor: 'primary.200',
      _dark: {
        backgroundColor: 'primary.800',
      }
    },
  },
  orderInProfile: {
    gap: 8,
    alignItems: 'start',
    border: '1px',
    mt: 4,
    borderRadius: 8,
    borderColor: 'gray.500',
  },
  orderDetail: {
    w: 'fool',
    gap: 4,
    alignItems: 'start',
    border: '1px',
    mt: 4,
    borderRadius: 8,
    borderColor: 'gray.500',
  },
  orderDetails: {
    gap: 2,
    alignItems: 'start',
    width: 'full',
    border: '1px',
    borderRadius: 8,
    borderColor: 'gray.500',
  },
}
