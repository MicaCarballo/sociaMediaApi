const userControllers = require('./users.controllers')
const mailer = require('../utils/mailer')
//? Get, Post

const getAllUsers = (req, res) => {
    userControllers.findAllUsers()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getUserById = (req, res) => {
    const id = req.params.id
    userControllers.findUserById(id)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}
const getUserByEmail = (req, res) => {
    const email = req.params.email
    userControllers.findUserByEmail(email)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid email'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getMyUser = (req, res) => {
    const id = req.user.id 
    userControllers.findUserById(id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}


const postUser = (req, res) => {
    const {firstName, lastName, nickName, email, password, gender, birthday, profileImg} = req.body
    userControllers.createUser({firstName, lastName, nickName, email, password,gender, birthday, profileImg})
        .then(async(data) => {
            await mailer.sendMail({
                from: '<micacarballo2@gmail.com>',
                to: data.email,
                subject: "You registered to SocialMica!",
                html: `<h1>Welcome to SocialMica ${data.firstName}</h1> `,
                text: 'Que gusto verte por aqui',
                
            })
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
                firstName: 'String',
                lastName: 'String',
                email: 'example@example.com',
                nickName: 'String',
                password: 'String',
                gender: 'String',
                birthday: 'YYYY/MM/DD'
            }})
        })
}

//? Solo admins pueden ejecutarlo
const patchUser = (req, res) => {
    const id = req.params.id 
    const {firstName, lastName, email, gender, birthday, role, status, profileImg} = req.body

    userControllers.updateUser(id, {firstName, lastName, email, gender, birthday, role, status,profileImg})
        .then((data) =>{
            if(data){
                res.status(200).json({message: `User edited succesfully with id: ${id}`})
            } else {
                res.status(404).json({message: `User with id: ${id}, not found`})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const patchMyUser = (req, res) => {
    const id = req.user.id
    const { firstName, lastName, gender, birthday,profileImg,nickName
     } = req.body
    userControllers.updateUser(id, {firstName, lastName, gender, birthday,profileImg,nickName})
        .then(() => {
            res.status(200).json({message: 'Your user was edited succesfully!'})
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

//? Solo admins pueden ejecutarlo
const deleteUser = (req, res) => {
    const id = req.params.id 
    userControllers.deleteUser(id)
        .then((data) => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: `User with id:${id}, Not Found`})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id 
    userControllers.deleteUser(id)
        .then(() => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

module.exports= {
    getAllUsers,
    getMyUser,
    getUserById,
    postUser,
    patchMyUser,
    patchUser,
    deleteMyUser,
    deleteUser,
    getUserByEmail
}
