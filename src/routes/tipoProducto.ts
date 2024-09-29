import { Request, Response, Application, Router } from "express";

import { TipoProductoController } from '../controllers/tipoProducto.controller';

export class TipoProductoRoutes {
    public tipoProductoController: TipoProductoController =  new TipoProductoController();

    public routes(app: Application): void {
        app.route("/tipoproductos/test").get(this.tipoProductoController.test)
        app.route("/tipoproductos").get(this.tipoProductoController.getAllTipoProducto)
        app.route("/tipoproductos/:id").get(this.tipoProductoController.getOneTipoProducto)
        app.route("/tipoproductos").post(this.tipoProductoController.createTipoProducto)
        app.route("/tipoproductos/:id").patch(this.tipoProductoController.updateTipoProducto)
        app.route("/tipoproductos/:id").delete(this.tipoProductoController.deleteTipoProducto)
        app.route("/tipoproductos/del/:id").patch(this.tipoProductoController.softDeleteTipoProducto)
    }
}