
export type TagUrlTypeWithoutText = {
  url: string,
  parent: string,
  orderNumber: number,
  searchEn: string,
  searchUa: string,
  descEn: string,
  descUa: string,
}

export type TagUrlType = TagUrlTypeWithoutText & {
  textEn: string,
  textUa: string,
}