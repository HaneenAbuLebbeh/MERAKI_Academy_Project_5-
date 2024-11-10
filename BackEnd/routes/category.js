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



categoryRouter.post('/add',authentication, authorization("Admin") ,createCategory);
categoryRouter.get('/' ,getAllCategories);
categoryRouter.put('/:name',authentication, authorization("Admin","User") ,updateCategoryByName);
categoryRouter.delete('/:name',deleteCategoryByName);

module.exports = categoryRouter;