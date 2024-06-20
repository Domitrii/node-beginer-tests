// import { authSchema } from "../schemas/authSchema.js"
// import User from '../modules/usersModule.js'
// import bcrypt from 'bcrypt'

// import crypto from 'node:crypto'


async function register(req, res, next){
    try{
        // const {error} = authSchema.validate(req.body)
        // if(error){
        //     res.status(400).send("error: ", error)
        // }

        // const {email, password} = req.body;
        // const user = await User.findOne({email})
        // if(user){
        //     res.status(409).send("Email is already used")
        // }

        // const passwordHash = await bcrypt.hash(password, 10)
        // const verifyToken = crypto.randomUUID()

        // const newUser = await User.create({ ...req.body, password: passwordHash, verifyToken })
        // res.status(201).send({user: {
        //     email: newUser.email, subscription: newUser.subscription
        // }})

        const user = req.body
        res.status(201).send(user)
    } catch(error){
        next(error)
    }
}

export default {
    register
}