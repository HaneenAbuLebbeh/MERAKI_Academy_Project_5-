const pool= require("../models/db")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs") 
const saltRounds = parseInt(process.env.SALT)
const register=async (req,res)=>{
const {firstName,lastName,age,country,email,password}=req.body 

const role_id=1   //1 for user , 2 for Tourist guide , 3 for admin 

const hashedPassword= await bcrypt.hash(password,saltRounds)
const query = `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
const data = [
  firstName,
  lastName,
  age,
  country,
  email.toLowerCase(),
  hashedPassword,
  role_id
];
pool
  .query(query, data)
  .then((result) => {
    res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  })
  .catch((err) => {
    console.log(err)
    res.status(409).json({
      success: false,
      message: "The email already exists",
      err,
    });
  });


} 

const login = (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const query = `SELECT * FROM users WHERE email = $1`;
    const data = [email.toLowerCase()];

    pool
      .query(query, data)
      .then((result) => {
        console.log(result.rows[0])
        if (result.rows.length) {
          bcrypt.compare(password, result.rows[0].password, (err, response) => {
            if (err) res.json(err);
            if (response) {
              const payload = {
                userId: result.rows[0].id,
                country: result.rows[0].country,
                role: result.rows[0].role_id,
              };
              const options = { expiresIn: "1d" };
              const secret = process.env.SECRET;
              const token = jwt.sign(payload, secret, options);
              if (token) {
                const isAdmin = result.rows[0].role_id === 3;/***/
                return res.status(200).json({
                  token,
                  success: true,
                  message: `Valid login credentials`,
                  userId:result.rows[0].id,
                  isAdmin: isAdmin // Check if the user is admin
                });
              } else {
                throw Error;
              }
            } else {
              res.status(403).json({
                success: false,
                message: `The email doesn’t exist or the password you’ve entered is incorrect`,
              });
            }
          });
        } else throw Error;
      })
      .catch((err) => {
        res.status(403).json({
          success: false,
          message:
            "The email doesn’t exist or the password you’ve entered is incorrect",
          err,
        });
      });
  };



//***********googleLogin**********//
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    const role_id=1   //1 for user 
    const { idToken } = req.body; // Get idToken from login-request
    try {
        // Verify the idToken 
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        // Check if the user exists in the database
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        let user = result.rows[0];

        if (!user) {
            // If the user does not exist, create it
            const insertResult = await pool.query(
                'INSERT INTO users (email, firstName, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [email, name, 'google-auth', role_id] 
            );
            user = insertResult.rows[0];
        }

        // Create a Token
        const payloadJwt = {
            userId: user.id,
            email: user.email,
            role: user.role_id, 
        };

        const token = jwt.sign(payloadJwt, process.env.SECRET, { expiresIn: '60m' });

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token,
            isAdmin: user.role_id === 1, // Check if the user is admin
        });
    } 
    catch (error) {
        console.error('Error during Google login:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};



  module.exports={
    register,
    login,
    googleLogin
  }