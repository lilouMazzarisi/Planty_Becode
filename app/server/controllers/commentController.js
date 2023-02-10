const { default: mongoose } = require('mongoose');
// const jwt = require('jsonwebtoken');
// const jwt_decode = require("jwt-decode");
const Player = require('../models/playerModel');
const Comment = require('../models/commentModel');
const Tree = require('../models/treeModel');

// Create a comment
const createComment = async (req, res) => {
    const comment = new Comment();
    const { username, text } = req.body;
    const { tree_id } = req.params;
    const foundTree = await Tree.findById(tree_id).exec()

    if (!username || !text) {
        return res.json({
        success: false,
        error: 'You must provide an author and comment'
        });
    }

    // Add the different fields to the comment collection :
    comment.author.username = username;
    comment.text = text;
    comment.treeInfo.tree_id = foundTree._id;
    comment.treeInfo.treeName = foundTree.name;
    // comment.author.id = await Player.findOne({username: username}).select('_id').exec();

    // Add the comment to the tree :
//    async function postTreeAndComment() {


    //     try{
    //         const treeAndComment = await Tree.aggregate(
    //             [
    //                 {
    //                     "$lookup" : {
    //                         "from" : "comments",
    //                         "localField" : "treeName",
    //                         "foreignField" : "name",
    //                         "as" : "comments"
    //                     }
    //                 }
    //             ]
    //         );

    //     return treeAndComment;
    //     }catch(err){
    //         console.log(err);
    //     }        
//    }

    // res.status(200).json(treeAndComment);
    // res.send(treeAndComment);
    // postTreeAndComment();

    // Save the comment
    comment.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json(postTreeAndComment);
    });
}

// Export all the function
module.exports = { 
    createComment
};