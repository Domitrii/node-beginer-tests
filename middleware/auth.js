import jwt from 'jsonwebtoken'
import User from '../modules/usersModule.js'
import dotenv from 'dotenv'
dotenv.config()

function auth(req, res, next){
    const {authorization = ""} = req.headers

    let [bearer, token] = authorization.split(' ', 2)
    if(bearer !== "Bearer" || !token ){
        token = bearer
        bearer = "Bearer"
        // return res.status(401).send({message: "Bearer is not defined; ", authorization})
    }

    jwt.verify(token, process.env.SECRET_PASS , async (err, decode) => {
        if(err){
            return `${decode}, ${decode.id}, ${err}`
            return res.status(401).send({message: "U have a verify problem"})
        }
        try{
            const user = await User.findById(decode.id)

            if(!user || user.token !== token){
                return res.status(401).send({message: "Invalid token2", user})
            }

            req.user = {id: decode.id}
            next() 
        } catch (error){ 
            next(error)
        }
    })

}

export default auth
