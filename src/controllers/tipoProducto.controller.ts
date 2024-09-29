import {  Request, Response } from 'express';
import { where } from 'sequelize/types';

import { TipoProducto, TipoProductoI } from '../models/TipoProducto';

export class TipoProductoController{

    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para Producto')
        } catch (error) {

        }
    }

    public async getAllTipoProducto(req: Request, res:Response){
        try {
            const tipoProducto: TipoProductoI[] = await TipoProducto.findAll(
                 {
                    where: {activo: true}
                } 
            ) // select * from productos;
            res.status(200).json({tipoProducto})
        } catch (error) {

        }
    }

    public async getOneTipoProducto(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const tipoProducto:TipoProductoI | null = await TipoProducto.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (tipoProducto){
                res.status(200).json(tipoProducto)
            } else return  res.status(300).json({msg: "El Producto no existe"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createTipoProducto(req: Request, res: Response) {
        const {
            id,
            nombreTipo,
            activo
   
        } = req.body;

        try {
            let body: TipoProductoI = {
                id,
                nombreTipo,
                activo: true

            }

            const tipoProducto: TipoProductoI = await TipoProducto.create({ ...body });
            res.status(200).json({ tipoProducto });

        } catch (error) {

        }
    }

    public async updateTipoProducto(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            nombreTipo,
            activo
        }= req.body

        try {
            let body:TipoProductoI = {
                id,
                nombreTipo,
                activo: true
               
            } 

            const tipoProductoExist: TipoProductoI | null = await TipoProducto.findOne
            ({
                where: {id:pk}
            });
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!tipoProductoExist) return res.status(500).json({msg:"El Producto No existe"})
            await TipoProducto.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk

        } catch (error) {

        }
        const tipoProducto: TipoProductoI | null = await TipoProducto.findByPk(pk);
        if(tipoProducto) return res.status(200).json({tipoProducto})

    }

    public async deleteTipoProducto(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const tipoProductoExist: TipoProductoI | null = await TipoProducto.findByPk(pk);
            if(!tipoProductoExist) return res.status(500).json({msg:"El Producto No existe"})
            await TipoProducto.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"tipoProducto Eliminado"})
        } catch (error) {

        }
    } 

    public async softDeleteTipoProducto(req: Request, res: Response) {
        const { id: pk } = req.params;
    
        try {
            // Verificar si el producto existe y no está eliminado
            const tipoProductoExist: TipoProducto | null = await TipoProducto.findOne({
                where: { id: pk, activo: true } // Solo busca los productos que no estén eliminados
            });
    
            if (!tipoProductoExist) {
                return res.status(404).json({ msg: "El Producto no existe o ya fue eliminado" });
            }
    
            // Marcar el producto como eliminado
            await TipoProducto.update(
                { activo: false}, // Actualiza el campo isDeleted y añade la fecha de eliminación
                { where: { id: pk } }
            );
    
            res.status(200).json({ msg: "TipoProducto eliminado (Soft Delete)" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error al eliminar el tipoproducto" });
        }
    }
}