import jwt from 'jsonwebtoken'

function authenticateJWT(req,res,next){
    const authHeader = req.header.authorization
    if(authHeader && authHeader.startsWith('Bearer ')){
        const token = authHeader.split(' ')(1)
        jwt.verify(token, process.env.JWT_secret, (err,user) => {
            if(err){
                res.status(403).json({message: 'Incorrect or expired tocen'})
            } 
            req.user = user 
            next()
        })
    }else {
        return res.status(401).json({message: 'Token not provided'})
    }
}
export default authenticateJWT