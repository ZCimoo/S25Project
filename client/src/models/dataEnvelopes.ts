export interface DataListEnvelope<T> {
  data: T[]
  total: number
  skip: number
  limit: number
}
