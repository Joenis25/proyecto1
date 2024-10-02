import { Routes } from '@angular/router';
import { MostrarClienteComponent } from './components/cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';
import { EliminarClienteComponent } from './components/cliente/eliminar-cliente/eliminar-cliente.component';
import { MostrarTipoProductoComponent } from './components/tipoProducto/mostrar-tipo-producto/mostrar-tipo-producto.component';
import { CrearTipoProductoComponent } from './components/tipoProducto/crear-tipo-producto/crear-tipo-producto.component';
import { ActualizarTipoProductoComponent } from './components/tipoProducto/actualizar-tipo-producto/actualizar-tipo-producto.component';
import { EliminarTipoProductoComponent } from './components/tipoProducto/eliminar-tipo-producto/eliminar-tipo-producto.component';

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
];
