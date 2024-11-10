const pool = require("../models/db");

const createCategory = (req, res) => {
  const { category_name, description, image_url } = req.body;
  const query = `INSERT INTO country_categories (category_name,description,image_url)
VALUES ($1,$2,$3) RETURNING *`;
  const data = [category_name, description, image_url];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Category created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
        console.log(err);
        
      res.status(409).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getAllCategories = (req, res) => {
  const query = `SELECT * FROM country_categories c WHERE c.is_deleted=0;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All Country Categories",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateCategoryByName = (req,res) => {
  const categoryName = req.params.name;
  let { description, image_url } = req.body;
  const query = `UPDATE country_categories SET  description = COALESCE($1, description), image_url= COALESCE($2,image_url) WHERE category_name=$3 AND is_deleted = 0  RETURNING *;`;
  const data = [
    description || null,
    image_url || null,
    categoryName,
  ];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Categories with name: ${categoryName} updated successfully `,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while updating article");
      }
    })
    .catch((err) => {
        console.log(err);
        
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const deleteCategoryByName = (req,res) => {
    const categoryName=req.params.name
    const query=`UPDATE country_categories SET is_deleted=1 where country_categories.category_name=$1 `
    const data=[categoryName]
    pool.query(query,data) .then((result) => {
        if (result.rowCount !== 0) {
          res.status(200).json({
            success: true,
            message: `Country with name: ${categoryName} deleted successfully`,
          });
        } else{
            throw new Error("Error happened while deleting article");
        }
      }).catch((err) => {
        console.log(err)
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryByName,
  deleteCategoryByName,
};
