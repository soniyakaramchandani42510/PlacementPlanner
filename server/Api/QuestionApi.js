const express = require("express");
const router = express.Router();
const Questionlist = require("../models/QuestionList");
const User = require("../models/userSchema");

router.post("/getAllQuestion", async (req, res) => {
  console.log("reqq", req.body.tags);
  try {
    const ques = await Questionlist.find({ tags: { $in: req.body.tags } });
    res.status(200).json({
      data: ques,
      status: "200",
      message: "List generated Successfully",
    });
  } catch {
    res.status(404).json({
      status: "404",
      message: "error in list generation",
    });
  }
});

router.post("/addQuestion", async (req, res) => {
  try {
    const data = req.body;
    const exists = Questionlist.find({ link: data.link });
    if (exists) {
      return res.status(200).json({
        status: "200",
        message: "question already exists",
      });
    }
    const newQuestion = new Questionlist(data);
    await newQuestion.save();
    res.status(200).json({
      data: newQuestion,
      status: "200",
      message: "question added successfully",
    });
  } catch {
    res.status(401).json({
      status: "401",
      message: "error in adding new question",
    });
  }
});

router.post("/:_id/addQuestion", async (req, res) => {
  const { _id } = req.params;
  console.log("uid", req.params);

  const newQuestionData = req.body;
  const newQuestion = new Questionlist(newQuestionData);

  try {
    const userToUpdate = await User.findOneAndUpdate(
      { _id },
      { $addToSet: { questionsolved: newQuestion } }
    );
    const updated=userToUpdate;
    if (!updated) {
      console.log("User not found.");
    } else {
      return res.status(200).json({
        message: "question added successfully",
        status: "200",
        user_data: updated,
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
router.post("/:_id/removeQuestion", async (req, res) => {
  const { _id } = req.params;
  const data=req.body;

  try {
    const userToUpdate = await User.findOneAndUpdate(
      { _id },
      // { $pull: { questionsolved:data} },
      { $pull: { questionsolved:{tags:"Dynamic Programming"}} }
    )
    if (!userToUpdate) {
      console.log("User not found.");
    } else {
      return res.status(200).json({
        message: "question removed successfully",
        status: "200",
        user_data: userToUpdate,
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = router;
