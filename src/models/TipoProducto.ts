import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Producto } from "./Producto"; 

export class TipoProducto extends Model {
    public id!: number;
    public nombreTipo!: string;
    public activo!: boolean;
}

export interface TipoProductoI {
    id: number;
    nombreTipo: string;
    activo: boolean;
}

TipoProducto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombreTipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: "tipoproductos",
    sequelize: database,
    timestamps: true
  }
);
