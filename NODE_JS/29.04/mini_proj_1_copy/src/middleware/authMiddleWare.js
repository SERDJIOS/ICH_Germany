import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) =>{
  const authHeader = req.headers.authorization
  if(!authHeader?.startsWith("Bearer ")){
    return res.status(401)
  }
  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch {
    res.status(403)
  }
}
