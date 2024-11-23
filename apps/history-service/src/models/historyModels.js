import {DataTypes} from "sequelize";
import {InitPostgres} from "../infrastructure/db/db.js";

export const HistoryModel = InitPostgres.define('history', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    plu: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING},
    shop_id: {type: DataTypes.INTEGER},
    product_id: {type: DataTypes.INTEGER},
    quantity_on_shelf: {type: DataTypes.INTEGER, defaultValue: 0},
    quantity_in_order: {type: DataTypes.INTEGER, defaultValue: 0},
    action: {type: DataTypes.STRING},
    date: { type: DataTypes.DATE},
});
