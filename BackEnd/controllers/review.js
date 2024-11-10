const pool= require("../models/db")  

const createReview=(req,res)=>{
const {user_id,spot_id,comment,rating}=req.body 
const query=`INSERT INTO reviews (user_id,spot_id,comment,rating) VALUES ($1,$2,$3,$4) RETURNING * `

const data=[user_id,spot_id,comment,rating]

pool.query(query,data).then((result) => {
    res.status(200).json({
      success: true,
      message: "Review created successfully",
      result: result.rows
    });
  })
  .catch((err) => {
    console.log(err)
    res.status(409).json({
      success: false,
      message: "Can't create review",
      err,
    });
  });

}

const deleteReview=(req,res)=>{
    const user_id=req.params.id
    const query=`UPDATE reviews SET is_deleted=1 where user_id=$1 `
    
    const data=[user_id]
    
    pool.query(query,data) .then((result) => {
        if (result.rowCount !== 0) {
          res.status(200).json({
            success: true,
            message: `review with id: ${user_id} deleted successfully`,
          });
        } 
    
        
      }).catch((err) => {
        console.log(err)
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
    }



//get and update reviews 

module.exports={createReview,deleteReview}