import jwt from 'jsonwebtoken'

import User from '../modules/usersModule.js'

function auth(req, res, next){
    const authorizationHeader = req.headers.authorization

    if(typeof authorizationHeader === 'undefined'){
        return res.status(401).send({message: "server is load"})
        return res.status(401).send({message: "Invalid token1"})
    }

    const [bearer, token] = authorizationHeader.split(' ', 2)
    if(bearer !== "Bearer"){
       return res.status(401).send({message: "Bearer is not defined"})
    }

    jwt.verify(token, process.env.SECRET_PASS , async (err, decode) => {
        if(err){
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
