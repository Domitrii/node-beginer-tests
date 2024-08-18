// import HttpError from '../helpers/HttpError'
import HttpError from '../helpers/HttpError.js';
import User from '../modules/usersModule.js'
import { updateSchema } from '../schemas/authSchema.js';



async function currentUser(req, res, next){
    try {
        const user = await User.findById(req.user.id);
        // if(!user) throw HttpError(401, 'User is not defined')

        const feedBackData = {
            name: user.name,
            id: user._id,
            email: user.email,
            gender: user.gender,
            dailyNorm: user.dailyNorm,
            weight: user.weight,
            timeActive: user.timeActive,
        }
    
        res.status(200).json(feedBackData).end()
    } catch (error) {
        next(error)
    }
}

async function updateUser(req, res, next) {
    try {
        const {gender, name, dailyNorm, timeActive, weight, email} = req.body

        const updateData = {
            ...(gender && {gender}),
            ...(name && {name}),
            ...(email && {email}),
            ...(dailyNorm && {dailyNorm}),
            ...(timeActive && {timeActive}),
            ...(weight && {weight})
        }

        const {error} = updateSchema.validate(updateData, {
            abortEarly: false,
        })

        if(typeof error !== "undefined"){
            throw HttpError(401, "bad request, (current 46)")
        }

        const user = await User.findByIdAndUpdate(req.user.id, updateData, {new: true})

        const feedBackData = {
            id: user._id,
            email: user.email,
            name: user.name,
            gender: user.gender,
            dailyNorm: user.dailyNorm,
            timeActive: user.timeActive,
            weight: user.weight
        }
        res.status(201).send({user: feedBackData})
    } catch (error) {
        next(error)
    }
}

export default {
    currentUser,
    updateUser
}