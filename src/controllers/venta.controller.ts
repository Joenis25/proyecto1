import { Request, Response } from 'express';
import { where } from 'sequelize/types';

import { Venta, VentaI } from '../models/Venta';

export class VentaController {


    public async test(req: Request, res: Response) {
        try {
            res.send('hola, metodo test para Venta')
        } catch (error) {

        }
    }

    public async getAllVenta(req: Request, res: Response) {
        try {
            const venta: VentaI[] = await Venta.findAll(
                {
                    where: {activo: true}
                } 
            ) // select * from ventas;
            res.status(200).json({ venta })
        } catch (error) {

        }
    }

    public async getOneVenta(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const venta:VentaI | null = await Venta.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (venta){
                res.status(200).json(venta)
            } else return  res.status(300).json({msg: "El Venta no existe"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }


    public async createVenta(req: Request, res: Response) {
        const {
            fechaVenta,
            subtotalVenta,
            impuestosVenta,
            descuentosVenta,
            totalVenta,
        } = req.body;

        try {
            let body: VentaI = {
                fechaVenta,
                subtotalVenta,
                impuestosVenta,
                descuentosVenta,
                totalVenta,
                activo:true
            }

            const venta: VentaI = await Venta.create({ ...body });
            res.status(200).json({ venta });

        } catch (error) {

        }
    }

    public async updateVenta(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            fechaVenta,
            subtotalVenta,
            impuestosVenta,
            descuentosVenta,
            totalVenta
        }= req.body

        try {
            let body:VentaI = {
                fechaVenta,
                subtotalVenta,
                impuestosVenta,
                descuentosVenta,
                totalVenta,
                activo: true
            } 

            const ventaExist: VentaI | null = await Venta.findOne
            ({
                where: {id:pk}
            });
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!ventaExist) return res.status(500).json({msg:"El Venta No existe"})
            await Venta.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {

        }
        const venta: VentaI | null = await Venta.findByPk(pk);
        if(venta) return res.status(200).json({venta})

    }

    public async deleteVenta(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const ventaExist: VentaI | null = await Venta.findByPk(pk);
            if(!ventaExist) return res.status(500).json({msg:"El Venta No existe"})
            await Venta.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Venta Eliminado"})
        } catch (error) {

        }

    } 

    public async softDeleteVenta(req: Request, res: Response) {
        const { id: pk } = req.params;
    
        try {
            // Verificar si el venta existe y no está eliminado
            const ventaExist: Venta | null = await Venta.findOne({
                where: { id: pk, activo: true } // Solo busca los ventas que no estén eliminados
            });
    
            if (!ventaExist) {
                return res.status(404).json({ msg: "El Venta no existe o ya fue eliminado" });
            }
    
            // Marcar el venta como eliminado
            await Venta.update(
                { activo: true}, // Actualiza el campo isDeleted y añade la fecha de eliminación
                { where: { id: pk } }
            );
    
            res.status(200).json({ msg: "Venta eliminado (Soft Delete)" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error al eliminar el venta" });
        }
    }
}
