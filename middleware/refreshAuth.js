import jwt from 'jsonwebtoken'
import User from '../modules/usersModule.js'
import HttpError from '../helpers/HttpError.js'

function authRefresh(req, res, next) {
    const refreshToken = req.body
    if (!refreshToken) throw HttpError(401, "We can't find refreshToken")

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, async(err, decode) => {
        if(err) throw HttpError(400, "have an error")

        try{
            const user = await User.findById(decode.id)
            if(!user) throw HttpError(401, "user not found")
            if(user.refreshToken !== refreshToken) throw HttpError(401, "Not authorized")
            
            req.user = {id: decode.id}

        } 
        catch (error) {
        next(error)
    }
    })
}

export default authRefresh