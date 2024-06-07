export interface Produtos {
  count: number;
  products: Produto[];
  categorias: Categoria[];
}



export interface Produto{
  id?:number
  usersid?:string
  description?: string
  short_desc?: string
  cat_id?: string
  title?: string
  image?: string
  price?: number
  quantidade?: string
  created_at?:string
}

export interface Categoria{
  id?:number
  title?: string
  modelo?: string
}

//description,image, title, price, short_desc
