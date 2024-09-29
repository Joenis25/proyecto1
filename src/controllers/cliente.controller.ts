import {  Request, Response } from 'express';
import { where } from 'sequelize/types';

import { Cliente, ClienteI } from '../models/Cliente';

export class ClienteController {


    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para Cliente')
        } catch (error) {

        }
    }

    public async getAllCliente(req: Request, res:Response){
        try {
            const cliente: ClienteI[] = await Cliente.findAll(
                {
                    where: {activo: true}
                }
            ) // select * from clientes;
            res.status(200).json({cliente})
        } catch (error) {

        }
    }

    public async getOneCliente(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const cliente:ClienteI | null = await Cliente.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (cliente){
                res.status(200).json(cliente)
            } else return  res.status(300).json({msg: "El Cliente no existe"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createCliente(req: Request, res:Response){
        const {
            nombreCliente,
            direccionCliente,
            telefonoCliente,
            correoCliente,
            passwordCliente
        } = req.body;

        try {
            let body:ClienteI = {
                nombreCliente,
                direccionCliente,
                telefonoCliente,
                correoCliente,
                passwordCliente,
                activo: true
            } 

            const cliente:ClienteI = await Cliente.create({...body});
            res.status(200).json({cliente});

        } catch (error) {

        }

    }

    public async updateCliente(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            nombreCliente,
            direccionCliente,
            telefonoCliente,
            correoCliente,
            passwordCliente
        }= req.body

        try {
            let body:ClienteI = {
                nombreCliente,
                direccionCliente,
                telefonoCliente,
                correoCliente,
                passwordCliente,
                activo: true
            } 

            const clienteExist: ClienteI | null = await Cliente.findOne
            ({
                where: {id:pk}
            });
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!clienteExist) return res.status(500).json({msg:"El Cliente No existe"})
            await Cliente.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {

        }
        const cliente: ClienteI | null = await Cliente.findByPk(pk);
        if(cliente) return res.status(200).json({cliente})

    }

    public async deleteCliente(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const clienteExist: ClienteI | null = await Cliente.findByPk(pk);
            if(!clienteExist) return res.status(500).json({msg:"El Cliente No existe"})
            await Cliente.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Cliente Eliminado"})
        } catch (error) {

        }

    } 

    public async softDeleteCliente(req: Request, res: Response) {
        const { id: pk } = req.params;
    
        try {
            // Verificar si el cliente existe y no está eliminado
            const clienteExist: Cliente | null = await Cliente.findOne({
                where: { id: pk, activo: true } // Solo busca los clientes que no estén eliminados
            });
    
            if (!clienteExist) {
                return res.status(404).json({ msg: "El Cliente no existe o ya fue eliminado" });
            }
    
            // Marcar el cliente como eliminado
            await Cliente.update(
                { activo: false}, // Actualiza el campo isDeleted y añade la fecha de eliminación
                { where: { id: pk } }
            );
    
            res.status(200).json({ msg: "Cliente eliminado (Soft Delete)" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Error al eliminar el cliente" });
        }
    }
    

}
