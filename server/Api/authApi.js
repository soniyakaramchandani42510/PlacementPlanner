const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
router.get("/", (req, res) => {
  res.send("hii backen");
});
router.post("/register", (req, res) => {
  const { name, email, leetcode_id, password, cpassword } = req.body;

  if (!name || !email || !leetcode_id || !password || !cpassword) {
    return res.send("please fill details");
  }
  User.findOne({ email: email })
    .then((userExists) => {
      if (userExists) {
        return res.send({
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
            return res.send({
              // status:'200',
              message: "registration successfull",
            });
          })
          .catch((err) => {
            return res.send({
              error: "registration unsucessfull",
            });
          });
      }
    })
    .catch((err) => {
      return res.send({
        error: err,
      });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email, password: password })
    .then((userExists) => {
      if (userExists) {
        return res.send({
          msg: "login successfull",
        });
      } else {
        return res.send({
          msg: "Wrong credentials",
        });
      }
    })
    .catch((err) => {
      return res.send({
        err: err,
      });
    });
});
module.exports = router;
