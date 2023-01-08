interface Product {
  id: string
  code?: string
  name: string
  slug?: string
  price?: number
  description?: string
  image?: string
  images?: string[]
  available?: boolean
  stock?: number
  sizes: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  categories?: string[]
  gender?: 'men' | 'women'  | 'kid' | 'unisex'
}

interface ProductCreate extends Omit<Product, 'id'> {};
