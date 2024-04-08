export type ActivateParamsType = {
  count?: number,
  page?: number,
  categories: string[],
  items?: [
    id: string,
    title: string,
    description: string,
    image: string,
    date: string,
    category: string,
    url: string
  ]
}
