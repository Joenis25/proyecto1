export interface ProductoI {
  nombreProducto: string
  marcaProducto: string
  precioProducto: number
  stockMin: number
  cantidadProducto: number
  tipoProductoId: number  // Relación con TipoProducto
  activo: boolean
}