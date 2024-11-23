import {HistoryModel} from "../models/historyModels.js";
import {Op} from "sequelize";

class HistoryService {

    async saveHistory(data) {
        const { plu, shop_id, action, name, product_id, quantity_on_shelf, quantity_in_order, updatedAt} = data;

        return await HistoryModel.create({
            plu,
            shop_id,
            action,
            name,
            product_id,
            quantity_on_shelf,
            quantity_in_order,
            date: updatedAt
        });
    }


    async getHistory(filters) {

        const where = {};

        if (filters.startDate || filters.endDate) {
            const startDate = filters.startDate ? new Date(`${filters.startDate}T00:00:00`) : null;
            const endDate = filters.endDate ? new Date(`${filters.endDate}T23:59:59`) : null;

            if (startDate && endDate) {
                where.date = { [Op.between]: [startDate, endDate] };
            } else if (startDate) {
                where.date = { [Op.gte]: startDate };
            } else if (endDate) {
                where.date = { [Op.lte]: endDate };
            }
        }

        if (filters.shop_id) {
            where.shop_id = filters.shop_id;
        }

        if (filters.plu) {
            where.plu = filters.plu;
        }

        if (filters.action) {
            where.action = filters.action;
        }

        return await HistoryModel.findAll({
            where,
        });

    }
}

export { HistoryService };
