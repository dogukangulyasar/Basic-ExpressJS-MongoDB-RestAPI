const express = require('express');
const router = express.Router();
const Post = require('../Model/Post');
//Routes
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.send(posts);
    }catch(err){
        res.send({message: err});
    }
    
});

router.get('/:id', async (req,res) => {
    let {id} = req.params;
    const post = await Post.findById(id);
    res.send(post);
});

router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    const savedPost = await post.save();
    res.send(savedPost);
})

//Delete
router.delete('/:id', async (req,res) => {
    let {id} = req.params;
    await Post.findByIdAndDelete(id);
    res.send("Deleted");
})

//Patch
router.patch('/:id', async (req,res) => {
    let {id} = req.params;
    let {newTitle, newDescription} = req.body;
    const post = await Post.findByIdAndUpdate(id);
    post.title = newTitle;
    post.description = newDescription;
    res.send("Updated");
})


module.exports = router;
