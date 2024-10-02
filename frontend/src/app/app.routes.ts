import { Routes } from '@angular/router';
import { MostrarClienteComponent } from './components/cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';
import { EliminarClienteComponent } from './components/cliente/eliminar-cliente/eliminar-cliente.component';
import { MostrarTipoProductoComponent } from './components/tipoProducto/mostrar-tipo-producto/mostrar-tipo-producto.component';
import { CrearTipoProductoComponent } from './components/tipoProducto/crear-tipo-producto/crear-tipo-producto.component';
import { ActualizarTipoProductoComponent } from './components/tipoProducto/actualizar-tipo-producto/actualizar-tipo-producto.component';
import { EliminarTipoProductoComponent } from './components/tipoProducto/eliminar-tipo-producto/eliminar-tipo-producto.component';
import { MostrarProductoComponent } from './components/producto/mostrar-producto/mostrar-producto.component';
import { CrearProductoComponent } from './components/producto/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './components/producto/actualizar-producto/actualizar-producto.component';
import { EliminarProductoComponent } from './components/producto/eliminar-producto/eliminar-producto.component';
import { MostrarVentaComponent } from './components/venta/mostrar-venta/mostrar-venta.component';
import { CrearVentaComponent } from './components/venta/crear-venta/crear-venta.component';
import { ActualizarVentaComponent } from './components/venta/actualizar-venta/actualizar-venta.component';
import { EliminarVentaComponent } from './components/venta/eliminar-venta/eliminar-venta.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/clientes', 
        pathMatch: 'full' 
    },
    {
        path: "clientes",
        component: MostrarClienteComponent
    },
    {
        path: "clientes/nuevo",
        component: CrearClienteComponent
    },
    {
        path: "clientes/edit/:id",
        component: ActualizarClienteComponent
    },
    {
        path: "clientes/del/:id",
        component: EliminarClienteComponent
    },


    { 
        path: '', 
        redirectTo: '/tipoproductos', 
        pathMatch: 'full' 
    },
    {
        path: "tipoproductos",
        component: MostrarTipoProductoComponent
    },
    {
        path: "tipoproductos/nuevo",
        component: CrearTipoProductoComponent
    },
    {
        path: "tipoproductos/edit/:id",
        component: ActualizarTipoProductoComponent
    },
    {
        path: "tipoproductos/del/:id",
        component: EliminarTipoProductoComponent
    },


    { 
        path: '', 
        redirectTo: '/productos', 
        pathMatch: 'full' 
    },
    {
        path: "productos",
        component: MostrarProductoComponent
    },
    {
        path: "productos/nuevo",
        component: CrearProductoComponent
    },
    {
        path: "productos/edit/:id",
        component: ActualizarProductoComponent
    },
    {
        path: "productos/del/:id",
        component: EliminarProductoComponent
    },

    { 
        path: '', 
        redirectTo: '/ventas', 
        pathMatch: 'full' 
    },
    {
        path: "ventas",
        component: MostrarVentaComponent
    },
    {
        path: "ventas/nuevo",
        component: CrearVentaComponent
    },
    {
        path: "ventas/edit/:id",
        component: ActualizarVentaComponent
    },
    {
        path: "ventas/del/:id",
        component: EliminarVentaComponent
    },
];
