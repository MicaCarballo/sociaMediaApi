const likeControllers = require('./likes.controllers')

const getAllLikesByPost = (req, res) => {
    const id = req.params.id 
    likeControllers.findAllLikesFromPost(id) 
        .then(data => {
            if(data){
                res.status(200).json({
                    count: data.length,
                    users: data
                    
                })
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const postLike = (req, res) => {
    const userId = req.user.id 
    const postId = req.params.id 
    likeControllers.createLike({userId, postId})
        .then(data => {
            if(data){
                res.status(201).json(data)
            } else {
                res.status(400).json({message: 'You already liked this post'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const getLikeById = ( req, res ) => {
    const id = req.params.id
    likeControllers.findLikeById(id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID: ' +id})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const deleteLike = (req, res) => {
    const id = req.params.id 
    likeControllers.removeLike(id)
        .then(data => {
            if(data){
                res.status(204).send()
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}



module.exports = {
    getAllLikesByPost, 
    postLike,
    deleteLike,
    getLikeById
}
