const errorHandler=(socket,next)=>{

    if (socket[0] !=="message"){
        next(new Error ("socket middleware"))
    } else{
        next()
    }
};
module.exports=errorHandler 