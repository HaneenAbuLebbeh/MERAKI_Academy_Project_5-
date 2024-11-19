const pool= require("../models/db")

const addToFavourite=(req,res)=>{
const {spot_id,user_id}=req.body

const query= `INSERT into favourite (spot_id,user_id) VALUES ($1,$2)`

const data=[spot_id,user_id]
pool.query(query,data).then((result) => {
    res.status(200).json({
      success: true,
      message: "Toursit spot added to favourite successfully",
    });
  })
  .catch((err) => {
    res.status(409).json({
      success: false,
      message: "Can't add TS to favourtie",
      err,
    });
  });

  
}

const getFavourtieById=(req,res)=>{
const id=req.params.id 
const query=`SELECT * FROM favourite LEFT JOIN touristspots  ON touristspots.id = favourite.spot_id where user_id=$1`

const data=[id]
pool.query(query,data).then((result) => {
    res.status(200).json({
      success: true,
      message: "Toursit spot added to favourite successfully",
      result: result.rows
    });
  })
  .catch((err) => {
    res.status(409).json({
      success: false,
      message: "Can't load TS",
      err: console.log(err)
    });
  });
}





module.exports={addToFavourite,getFavourtieById}