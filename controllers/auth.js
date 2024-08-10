import { authSchema } from "../schemas/authSchema.js"
import HttpError from '../helpers/HttpError.js';
import User from '../modules/usersModule.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


async function register(req, res, next){
    try{
        const {error} = authSchema.validate(req.body)
        if(error) throw HttpError(400, error.message)

        const {email , password, repeatPassword } = req.body;        

        const user = await User.findOne({email})
        if(user !== null) throw HttpError(409, "User is already exist")

        if(repeatPassword !== password) throw HttpError(400, "Write your password again")

        const passwordHash = await bcrypt.hash(password, 10) 

        const result = await User.create({...req.body , password: passwordHash})
        res.status(201).send({user: {id: result._id, email: result.email }})
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
        const token = jwt.sign(
            {id: user._id},
            process.env.SECRET_PASS,
            {expiresIn: '23h'}
        )

        const refreshToken = jwt.sign(
            {id: user._id},
            process.env.SECRET_PASS,
            {expiresIn: '23'}
        )

        await User.findByIdAndUpdate(user._id , {token: token}, {new: true})

        res.send({token, refreshToken, user: {
            id: user._id,
            email: user.email,
            gender: user.gender,
            dailyNorm: user.dailyNorm,
            weight: user.weight,
            timeActive: user.timeActive,
        } })
    } catch (error){
        next(error)
    }
}


async function logout(req, res, next){
    try{
        await User.findByIdAndUpdate(req.user.id, {token: null}, {new: true})
        res.status(204).end()
    } catch (error){
        next(error)
    }
}



// async function refresh(req, res, next) {
//     try {
//         const user = await User.findById(req.user.id)
//         const token = jwt.sign(
//             {id: user._id},
//             process.env.SECRET_KEY,
//             {expiresIn: '1h'}
//         )

//         const refreshToken = jwt.sign(
//             {id: user._id},
//             process.env.REFRESH_SECRET_KEY,
//             {expiresIn: '23h'}
//         )

//         await User.findByIdAndUpdate(user.id , {token: refreshToken}, {new: true})
//         res.status(201).send({token, refreshToken})
//     } catch (error) {
//         next(error)
//     }
// }


// async function updatePassword(req, res, next){
//     try{
//         const {token, password} = req.body;
//         if(!token) throw HttpError(401, 'Not the right token')

//         jwt.verify(token, process.env.SECRET_PASS, async function (err, decode) {
//             if(err) throw HttpError(401, "u have an error")
//             try{

//             const user = await User.findById(decode.id)

//             if(!user) throw HttpError(401, "u have an error")
            
//             const hashPass = await bcrypt.hash(password, 10)
            
//             await User.findByIdAndUpdate(decode.id, {
//                 password: hashPass,
//                 token: null
//             })

//             res.status(204).end()
//             } catch (error) {
//                 next(error)
//             }
//         })

//     } catch(error) {
//         next(error)
//     }
// }



export default {
    register,
    login,
    logout,
    // refresh,
    // updatePassword
}