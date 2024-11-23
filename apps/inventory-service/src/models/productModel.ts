import {DataTypes, Model} from '@sequelize/core';
import {Attribute, BeforeCreate, BeforeUpdate, HasMany, Table} from '@sequelize/core/decorators-legacy';
import type { PartialBy } from '@sequelize/utils';
import {StockModel} from "./stockModel.js";

export interface ProductAttributes {
    id: number;
    plu: number;
    name: string;
}

export type ProductCreationAttributes = PartialBy<
    ProductAttributes,
    'id'
>;

@Table({ tableName: 'product', underscored: true, timestamps: true })
export class ProductModel extends Model<ProductAttributes, ProductCreationAttributes> {
    @Attribute({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Attribute({ type: DataTypes.INTEGER, allowNull: false })
    declare plu: number;

    @Attribute({ type: DataTypes.STRING, allowNull: false })
    declare name: string;

    @HasMany(() => StockModel, 'product_id')
    declare stocks: StockModel[];

}