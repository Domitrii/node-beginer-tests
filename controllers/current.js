// import HttpError from '../helpers/HttpError'
import User from '../modules/usersModule.js'



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

// async function updateUser(req, res, next) {
//     try {

//         const user = await User.findById(req.user.id)



//     } catch (error) {
//         next(error)
//     }
// }

export default {
    currentUser
}