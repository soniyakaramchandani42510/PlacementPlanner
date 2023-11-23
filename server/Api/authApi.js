const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
router.get("/", (req, res) => {
  res.send("hii backen");
});
router.post("/register", (req, res) => {
  const { name, email, leetcode_id, password, cpassword } = req.body;
  
  if (!name || !email || !leetcode_id || !password || !cpassword) {
    return res.status(500).json({
      status:'500',
     message: "please fill details"
    });
  }
  User.findOne({ email: email })
    .then((userExists) => {
      if (userExists) {
        return res.status(300).json({
          status:'300',
          message: "email already exist",
        });
      } else {
        const user = new User({
          name,
          email,
          leetcode_id,
          password,
          cpassword,
        });
        user
          .save()
          .then(() => {
            return res.status(200).json({
              status:'200',
              message: "registration successfull",
              data:req.body,
            });
          })
          .catch((err) => {
            return res.status(400).json({
              status:'400',
              message: "registration unsucessfull",
            });
          });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email, password: password })
    .then((userExists) => {
      if (userExists) {
        return res. status(200).json({
          status:'200',
          message: "login successfull",
          data:req.body,
        });
      } else {
        return res.status(404).json({
          status:'404',
          message: "Wrong credentials",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status:'400',
        error: err,
      });
    });
});

router.post("/home",async (req, res) => {
  const { email } = req.body;
  const user= await User.aggregate([
    {$match: {"email" : email} },
  ]);

  if (user.length === 0) {
    return res.status(404).json({
      status: '404',
      message: 'User not found',
    });
  }

  return res.status(200).json({
    status:'200',
    data:user[0],
    message:'data retrieved'
  })
});


module.exports = router;
