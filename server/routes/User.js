import express from 'express'
import bcryt from 'bcrypt';
import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const router = express.Router();

// ============== Singup Route
router.post('/signup', async (req, res) =>{
    const {username, email, password} = req.body;
    const user = await User.findOne({email})
    if(user){
        return res.json({message: "User already exists"})
    }
    
    const hashpassword = await bcryt.hash(password, 10);
    const newUser = new User({
        username,
        email, 
        password: hashpassword,
    })

    await newUser.save()
    return res.json({status: true, message: "record registered"})
})


// ================= Login Route
router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.json({message: "user is not registered"})
    }

    const validPassword = await bcryt.compare(password, user.password)
    if(!validPassword){
        return res.json({message: "password is incorrect"})
    }

    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1h'})
    res.cookie('token', token, {httpOnly: true, maxAge: 360000})
    return res.json({status: true, message: "login successfully"})
})

// ===================== Forgot Password
router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.json({message: "User not registered"})
        }

        const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn: '5m'})

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            }
          });
          
          const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E")
          var mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            //   console.log(error);
              return res.json({message: "error sending email"})
            } else {
            //   console.log('Email sent: ' + info.response);
            return res.json({status: true, message: "email sent"})
            }
          });

    }catch(err){
        console.log(err)
    }
})


// router.post('/resetpassword/:token', async (req, res) => {
//     const token = req.params;
//     const {password} = req.body
//     try{
//         const decoded = await jwt.verify(token, process.env.KEY)
//         const id = decoded.id
//         const hashpassword = bcryt.hash(password, 10)
//         await User.findByIdAndUpdate({_id: id}, {password: hashpassword})
//         return res.json({status: true, message: "updated password"})
//     }catch(err){
//         // console.log(err);
//         return res.json("invalid token")
        
//     }
// })



// ======================= Reset Password
router.post('/resetpassword/:token', async (req, res) => {
    const { token } = req.params;  // Correctly destructure token
    const { password } = req.body; // Get password from request body
    
    try {
      const decoded = jwt.verify(token, process.env.KEY); // Decode the token
      const id = decoded.id;  // Get the user id from the decoded token
      const hashpassword = await bcryt.hash(password, 10);  // Hash the password
      await User.findByIdAndUpdate({ _id: id }, { password: hashpassword }); // Update the user password
      return res.json({ status: true, message: "Password updated successfully" });
    } catch (err) {
      console.log(err);
      return res.json({ status: false, message: "Invalid token" });
    }
  });


// ==================== verify User 
  const verifyUser = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ status: false, message: "no" });
      }
      const decoded = await jwt.verify(token, process.env.KEY);
      req.user = decoded; // Fixed the typo here, it was "req.usesr" (incorrect)
      next();
    } catch (err) {
      return res.json(err);
    }
  };
  
  router.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, message: "authorized" });
  });
  

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
  })
  


export {router as UserRouter}
