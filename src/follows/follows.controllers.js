const uuid = require('uuid')

const Follows = require('../models/follows.models')
const Users = require('../models/users.models')

// const followUser = async (follower, following) => {
//     const data = await Follows.create({
//         id: uuid.v4(),
//         userId: follower,
//         userId2: following
//     })
//     return data
// }

const followUser = async (follower, following) => {
  const follow = await Follows.findOne({
    where: {
    
        userId: follower,
        userId2: following

    }
  })
  if(follow){
   await follow.destroy()
  }else{
    const data = await Follows.create({
        id: uuid.v4(),
        userId: follower,
        userId2: following
    })
    return data
  }

}

   

const findMyFollowers = async (userId) => {
    const data = await Follows.findAll({
        where: {
            userId2 : userId
        },
        include: {
            model: Users,
            attributes: ['id', 'firstName', 'lastName'],
            as: 'followers'
        }
    })
    return data.map(item => item.followers)
}

const findMyFollowings = async (userId) => {
    const data = await Follows.findAll({
        where: {
            userId : userId
        },
        include: {
            model: Users,
            attributes: ['id', 'firstName', 'lastName'],
            as:"following"
        }
    })
    return data.map(item => item.following)
}
const removeFollow = async (userId) => {
    const data = await Follows.destroy({
        where: {
            userId: userId
        }
    })
    return data
}


module.exports = {
    followUser,
    findMyFollowers,
    findMyFollowings
}
