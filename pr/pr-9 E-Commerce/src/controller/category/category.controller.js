const statusCode = require('http-status-codes');
const moment = require('moment');
const { errorResponse, successResponse } = require('../../utils/response');
const { MSG } = require('../../utils/msg');
const CategoryService = require('../../services/category/category.service');

const categoryService = new CategoryService();

module.exports.addCategory = async (req, res) => {
    try {
        if (req.user) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.Unauthorized_Access));
        }

        console.log(req.body);

        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss A');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');

        await categoryService.insertNewCategory(req.body);

        return res.status(statusCode.CREATED).json(successResponse(statusCode.CREATED, false, MSG.Category_Added));

    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponse(statusCode.INTERNAL_SERVER_ERROR, true, MSG.Something_Went_Wrong));
    }
}
