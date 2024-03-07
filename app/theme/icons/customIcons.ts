import {IconProps} from '@chakra-ui/icons'
import {ComponentWithAs} from "@chakra-ui/react";

import {
  Adidas,
  Asics,
  Boots,
  Converse,
  FlipFlops,
  NewBalance,
  Nike,
  Puma,
  Reebok,
  RenBen,
  Sneakers,
  Ugg
} from "@/app/theme/icons/library";

type Icon = {
  name: string
  icon: ComponentWithAs<"svg", IconProps>
}

export const icons: Icon[] = [
  {name: 'flip-flops', icon: FlipFlops},
  {name: 'zhenskie-vetnamki', icon: FlipFlops},
  {name: 'muzhskie-vetnamki', icon: FlipFlops},
  {name: 'Sneakers', icon: Sneakers},
  {name: 'zhenskie-krossovki', icon: Sneakers},
  {name: 'muzhskie-krossovki', icon: Sneakers},
  {name: 'Boots', icon: Boots},
  {name: 'botinki-zhenskie', icon: Boots},
  {name: 'botinki-muzhskie', icon: Boots},
  {name: 'Ugg', icon: Ugg},
  {name: 'brands/Nike', icon: Nike},
  {name: 'brands/Adidas', icon: Adidas},
  {name: 'brands/Converse', icon: Converse},
  {name: 'brands/RenBen', icon: RenBen},
  {name: 'brands/Asics', icon: Asics},
  {name: 'brands/Puma', icon: Puma},
  {name: 'brands/Reebok', icon: Reebok},
  {name: 'brands/new-balance', icon: NewBalance},
]

export const getIcon = (name: string) => icons.find(icon => name === icon.name.toLowerCase())?.icon