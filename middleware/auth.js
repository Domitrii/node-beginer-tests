import jwt from 'jsonwebtoken'

function auth(req, res, next){
    const authorizationHeader = req.headers.authorization

    if(typeof authorizationHeader === 'undefined'){
        return res.status(401).send({message: "Invalid token"})
    }

    const [bearer, token] = authorizationHeader.split(' ', 2)
    if(bearer !== "Bearer"){
       return res.status(401).send({message: "Bearer is not defined"})
    }

    jwt.verify(token, process.env.SECRET_PASS , (err, decode) => {
        if(err){
            return res.status(401).send({message: "U have a verify problem"})
        }

        req.user = {id: decode.id}
        
        next()
    })

}

export default auth
