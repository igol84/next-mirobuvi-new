export const getColorScheme = (status: string) => {
  switch (status) {
    case 'New':
      return 'green'
    case 'InProgress':
      return 'blue'
    case 'Done':
      return 'purple'
    case 'NotDone':
      return 'red'
    default:
      return 'gray'
  }
}

