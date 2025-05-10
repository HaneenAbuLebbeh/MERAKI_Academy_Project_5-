const express = require("express");
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization");

const {
    createCategory,
    getAllCategories,
    updateCategoryByName,
    deleteCategoryByName
    } = require("../controllers/category");

const categoryRouter = express.Router();



categoryRouter.post('/add',createCategory);
categoryRouter.get('/' ,getAllCategories);
categoryRouter.put('/:name',updateCategoryByName);
categoryRouter.delete('/:name',deleteCategoryByName);

module.exports = categoryRouter; 