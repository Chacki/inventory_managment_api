import {HistoryService} from "../service/historyService.js";

export class HistoryController  {


    historyService;

    constructor(){
        this.historyService = new HistoryService();
    }


    async getHistory (req, res) {
        try {
            const filter = req.query

            const { shop_id, plu, action, startDate, endDate} = req.query;

            if (startDate || endDate) {
                    if (isNaN(new Date(startDate + 'T00:00:00').getTime()) || isNaN(new Date(endDate + 'T00:00:00').getTime())) {
                    res.status(400).json({message: "Не верный формат даты!"})
                    return;
                }
            }

            const history = await this.historyService.getHistory(filter)

            res.status(200).json(history);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

}