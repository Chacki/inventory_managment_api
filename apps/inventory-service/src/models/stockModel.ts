import { DataTypes, Model } from '@sequelize/core';
import {Attribute, BeforeCreate, BeforeUpdate, BelongsTo, Table} from '@sequelize/core/decorators-legacy';
import {ProductModel} from './productModel.js';
import type {PartialBy} from "@sequelize/utils";

export interface StockAttributes {
    id: number;
    product_id: number;
    shop_id: number;
    quantity_on_shelf: number;
    quantity_in_order: number;
}

export type StockCreationAttributes = PartialBy<
    StockAttributes,
    'id'
>;

@Table({ tableName: 'stock', underscored: true, timestamps: true })
export class StockModel extends Model<StockAttributes, StockCreationAttributes> {
    @Attribute({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: number;

    @Attribute({ type: DataTypes.INTEGER, allowNull: false })
    declare product_id: number;

    @Attribute({ type: DataTypes.INTEGER, allowNull: false })
    declare shop_id: number;

    @Attribute({ type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 })
    declare quantity_on_shelf: number;

    @Attribute({ type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 })
    declare quantity_in_order: number;

    @BelongsTo(() => ProductModel, 'product_id')
    declare product: ProductModel | null;
}
