 const pool= require("../models/db") 

const createTouristSpot=(req,res)=>{
const {category_id,spot_name,description,image_url,virtual_tour_url}=req.body

const query=`INSERT INTO touristspots (category_id,spot_name,description,image_url,virtual_tour_url) VALUES ($1,$2,$3,$4,$5) `

const data=[
    category_id,spot_name,description,image_url,virtual_tour_url]

pool.query(query,data).then((result) => {
    res.status(200).json({
      success: true,
      message: "Toursit spot created successfully",
    });
  })
  .catch((err) => {
    res.status(409).json({
      success: false,
      message: "Can't create TS",
      err,
    });
  });


}

const gitAlltouristSpostsById=(req,res)=>{
const category_id=req.params.id 
const query=`SELECT * FROM touristspots where category_id=$1 AND is_deleted=0 `

const data=[category_id]
pool.query(query,data).then((result) => {
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `The country: ${category_id} has no spots`,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `All Tourist spots for the country: ${category_id}`,
        result: result.rows,
      });
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err,
    });
  });

}

const deleteTouristSpot=(req,res)=>{
const spot_name=req.params.spot
const query=`UPDATE touristspots SET is_deleted=1 where spot_name=$1 `

const data=[spot_name]

pool.query(query,data) .then((result) => {
    if (result.rowCount !== 0) {
      res.status(200).json({
        success: true,
        message: `Spot with name: ${spot_name} deleted successfully`,
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

const updateToursitspots=(req,res)=>{
    const spot_name=req.params.spot
    let {description,image_url}=req.body

    const query=`UPDATE touristspots SET description=COALESCE($1,description) , image_url=COALESCE($2,image_url)  WHERE spot_name=$3 AND is_deleted = 0  RETURNING *;` 

    const data=[description,image_url,spot_name]

    pool.query(query,data).then((result) => {
        if (result.rows.length !== 0) {
          res.status(200).json({
            success: true,
            message: `Spot with name: ${spot_name} updated successfully `,
            result: result.rows[0],
          });
        } 
          else {
            
            throw new Error("Error happened while updating Spot");
  
          }
        
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
    
    
    
     }
const gittouristSpostsByName=(req,res)=>{
  
  const spot=req.params.spot
 
  const query=` SELECT * from touristspots ,
    
    COALESCE(
      (SELECT json_agg(image_url) FROM images WHERE tourist_spot_id = touristspots.id),
      '[]'::json) AS images, 
    
    COALESCE(
      (SELECT json_agg(json_build_object('rating', r.rating, 'comment', r.comment, 'first_name', u.firstname)) 
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.id 
       WHERE r.spot_id = touristspots.id),
      '[]'::json) AS reviews
 
  WHERE touristspots.spot_name =$1 AND touristspots.is_deleted = 0;`

  const data=[spot]
  pool.query(query,data).then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The country: ${spot} has no spots`,
          result: result.rows
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All Tourist spot Details for the country: ${spot}`,
          result: result.rows,
        });
      } 
    })
    .catch((err) => { 
      console.log(err)
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
  
  }




module.exports={createTouristSpot,gitAlltouristSpostsById,deleteTouristSpot,updateToursitspots,gittouristSpostsByName}