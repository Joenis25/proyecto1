import {  Request, Response } from 'express';
import { where } from 'sequelize/types';

import { Producto, ProductoI } from '../models/Producto';

export class ProductoController {


    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para Producto')
        } catch (error) {

        }
    }

    public async getAllProducto(req: Request, res:Response){
        try {
            const producto: ProductoI[] = await Producto.findAll(
                 {
                    where: {activo: true}
                } 
            ) // select * from productos;
            res.status(200).json({producto})
        } catch (error) {

        }
    }

    public async getOneProducto(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const producto:ProductoI | null = await Producto.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (producto){
                res.status(200).json(producto)
            } else return  res.status(300).json({msg: "El Producto no existe"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createProducto(req: Request, res: Response) {
        const {
            nombreProducto,
            marcaProducto,
            precioProducto,
            stockMin,
            cantidadProducto,
            tipoProductoId,
   
        } = req.body;

        try {
            let body: ProductoI = {
                nombreProducto,
                marcaProducto,
                precioProducto,
                stockMin,
                cantidadProducto,
                tipoProductoId,
                activo: true

            }

            const producto: ProductoI = await Producto.create({ ...body });
            res.status(200).json({ producto });

        } catch (error) {

        }
    }

    public async updateProducto(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
                nombreProducto,
                marcaProducto,
                precioProducto,
                stockMin,
                cantidadProducto,
                tipoProductoId
        }= req.body

        try {
            let body:ProductoI = {
                nombreProducto,
                marcaProducto,
                precioProducto,
                stockMin,
                cantidadProducto,
                tipoProductoId,
                activo: true
               
            } 

            const productoExist: ProductoI | null = await Producto.findOne
            ({
                where: {id:pk}
            });
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!productoExist) return res.status(500).json({msg:"El Producto No existe"})
            await Producto.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk

        } catch (error) {

        }
        const producto: ProductoI | null = await Producto.findByPk(pk);
        if(producto) return res.status(200).json({producto})

    }

    public async deleteProducto(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const productoExist: ProductoI | null = await Producto.findByPk(pk);
            if(!productoExist) return res.status(500).json({msg:"El Producto No existe"})
            await Producto.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Producto Eliminado"})
        } catch (error) {

        }
    } 

    public async softDeleteProducto(req: Request, res: Response) {
        const { id: pk } = req.params;
    
        try {
            // Verificar si el producto existe y no está eliminado
            const productoExist: Producto | null = await Producto.findOne({
                where: { id: pk, activo: true } // Solo busca los productos que no estén eliminados
            });
    
            if (!productoExist) {
                return res.status(404).json({ msg: "El Producto no existe o ya fue eliminado" });
            }
    
            // Marcar el producto como eliminado
            await Producto.update(
                { activo: false}, // Actualiza el campo isDeleted y añade la fecha de eliminación
                { where: { id: pk } }
            );
    
            res.status(200).json({ msg: "Producto eliminado (Soft Delete)" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error al eliminar el producto" });
        }
    }
}
