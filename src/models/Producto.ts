import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { TipoProducto } from "./TipoProducto";

export class Producto extends Model {
  public nombreProducto!: string;
  public marcaProducto!: string;
  public precioProducto!: number;
  public stockMin!: number;
  public cantidadProducto!: number;
  public tipoProductoId!: number; // Relación con TipoProducto
  public activo!: boolean; // Campo para soft delete
}

export interface ProductoI {
  nombreProducto: string;
  marcaProducto: string;
  precioProducto: number;
  stockMin: number;
  cantidadProducto: number;
  tipoProductoId: number;  // Relación con TipoProducto
  activo: boolean;
}

Producto.init(
  {
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marcaProducto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precioProducto: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stockMin: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cantidadProducto: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tipoProductoId: { // Llave foránea
      type: DataTypes.INTEGER,
      references: {
        model: 'tipoproductos', // Nombre de la tabla en la base de datos
        key: 'id'
      },
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: "productos",
    sequelize: database,
    timestamps: true
  }
);

// Establecemos la relación
Producto.belongsTo(TipoProducto, { foreignKey: 'tipoProductoId', as: 'tipoProducto' });
TipoProducto.hasMany(Producto, { foreignKey: 'tipoProductoId', as: 'productos' });

