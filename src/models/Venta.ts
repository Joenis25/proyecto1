import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Venta extends Model {
  public fechaVenta!: string;
  public subtotalVenta!: number;
  public impuestosVenta!: number;
  public descuentosVenta!: number;
  public totalVenta!: number;
  public activo!: boolean; // Campo para soft delete
}

export interface VentaI {
    fechaVenta: string;
    subtotalVenta: number;
    impuestosVenta: number;
    descuentosVenta: number;
    totalVenta: number;
    activo: boolean;
}

Venta.init(
  {
    fechaVenta: {
        type: DataTypes.DATE,
        allowNull: false
      },
      subtotalVenta: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      impuestosVenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      descuentosVenta: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalVenta: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:true
      } 
  },
  {
    tableName: "ventas",
    sequelize: database,
    timestamps: false
  }
);
