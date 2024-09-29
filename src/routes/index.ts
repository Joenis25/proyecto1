import { ClienteRoutes } from './cliente';
import { ProductoRoutes } from './producto';
import { VentaRoutes } from './venta';
import { TipoProductoRoutes } from './tipoProducto';

export class Routes {
    public clienteRoutes: ClienteRoutes = new ClienteRoutes();
    public ventaRoutes: VentaRoutes = new VentaRoutes();
    public productoRoutes: ProductoRoutes = new ProductoRoutes();
    public tipoProductoRoutes: TipoProductoRoutes = new TipoProductoRoutes();
}
