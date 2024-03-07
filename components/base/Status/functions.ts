import {OrderStatusType as StatusType} from "@/lib/db/order";

export const getColorScheme = (status: StatusType) => {
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

