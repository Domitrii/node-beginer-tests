import { authSchema } from "../schemas/authSchema.js"
import HttpError from '../helpers/HttpError.js';
import User from '../modules/usersModule.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


async function register(req, res, next){
    try{
        const {error} = authSchema.validate(req.body)
        if(error) throw HttpError(400, error.message)

        const {name, email , password } = req.body;
        const user = await User.findOne({email})
        if(user !== null) throw HttpError(409, "User is already exist")

        const passwordHash = await bcrypt.hash(password, 10) 

        const result = await User.create({name, email, password: passwordHash})
        res.status(201).send(result)
    } catch(error){
        next(error)
        console.error(error)
    }
}

async function login(req, res, next){
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user) throw HttpError(401, "User is not found")

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch === false){
            return res.status(401).send({message: "Email or password are used"})
        } 
        const token = jwt.sign({id: user._id, name: user.name}, process.env.SECRET_PASS, {expiresIn: '23h'})

        res.send({token: token})
    } catch (error){
        next(error)
    }
}

export default {
    register,
    login
}