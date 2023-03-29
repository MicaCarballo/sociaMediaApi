const uuid = require('uuid')
const Likes = require('../models/likes.models')
const Users = require('../models/users.models')

const findAllLikesFromPost = async (postId) => {
    const data = await Likes.findAll({
        where :{
            postId: postId
        },
        include: {
            model: Users,
            attributes: ['id', 'firstName', 'lastName']
            

        }
    })
    return data.map((like)=> {
    //     let user = like.user
     
    // user.like = like.id
    // return user
    return like.user
    })
}

const createLike = async (obj) => {

    const validate = await Likes.findOne({
        where: {
            userId: obj.userId,
            postId: obj.postId
        }
    })

    if(validate){
        return null
    }
    
    const data = await Likes.create({
        id: uuid.v4(),
        userId: obj.userId,
        postId: obj.postId
    })
    return data
}

const findLikeById = async (id) => {
    const data = await Likes.findOne({
        where: {
            id: id
        }
    })
    return data
}

const removeLike = async (id) => {
   const like = await Likes.findByPk(id)
   if(!like){
    return null
   } 
   await like.destroy()

    // const data = await Likes.destroy({
    //     where: {
    //         id: id
    //     }
    // })
    return like
}

module.exports = {
    findAllLikesFromPost,
    createLike,
    removeLike,
    findLikeById
}