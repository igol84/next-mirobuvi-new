export interface User {
  id: number
  name : string | null
  image: string | null
  favoriteProducts: Set<string>
}
