const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
});

router.patch("/:id",async (req, res) =>{
  try{
    const {profilePicture}=req.body;
   const newUp= await User.findByIdAndUpdate(req.params.id,{
    profilePicture
    },{new:true})
    console.log(profilePicture)
    res.status(200).json({newUp});
  }catch(err){
    console.log(err)
  }
})

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    // const Currentuser = await User.findById(req.params.userId);
    const friends=await User.find({_id:{$nin:req.params.userId}})
    // let friendList = [];
    // friends.map((friend) => {
    //   const { _id, username, profilePicture } = friend;
    //   friendList.push({ _id, username, profilePicture });
    // });
    res.status(200).json({friends})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;