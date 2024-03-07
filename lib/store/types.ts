export interface User {
  id: string
  name : string | null
  image: string | null
  favoriteProducts: Set<string>
}
