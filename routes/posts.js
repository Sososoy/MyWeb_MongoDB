const { Router } = require("express")
const { Post } = require('./../models');
const { User } = require('./../models');
const asyncHandler = require("../models/utils/async-handler");

const router = Router();

router.get('/', async (req, res, next) => {
   const posts = await Post.find({}).populate("author");
   res.json(posts);
});

router.post("/", async(req, res, next) => {
   const { title, content, email } = req.body;
   console.log(title, content, email);
   //console.log(req.body);
   try{

      const authData = await User.findOne({ email });
      
      await Post.create({
         title,
         content,
         author: authData
      });

      res.json({
         result: '저장이 완료되었습니다.'
      })

   }catch(e) {
      next(e);
   }
})

router.get("/:shortId/delete", async (req, res, next) => {
   const { shortId } = req.params;
   console.log(shortId);
   try {
      await Post.deleteOne({shortId});
      res.json({
         result: '삭제가 완료되었습니다.'

      })
   } catch (e) {
      next(e);
   }
});

router.get("/:shortId/find", async (req, res, next) => {
   let{ shortId } = req.params;

   try {
      let data = await Post.findOne({ shortId });

      res.json(data);
   } catch (e) {
      next(e);
   }
});

router.post("/:shortId/update", async(req, res, next) => {
   let { shortId } = req.params;
   let { title, content } = req.body;

   console.log(shortId, title, content);

   try {
      await Post.updateOne({ shortId }, {
         title,
         content
      });   
      
      res.json({
         result: "수정이 완료되었습니다."
      })

   } catch (e) {
      next(e);
   }



});

module.exports = router;