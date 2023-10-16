const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

   if(token != null || token.trim() != ''){
    jwt.verify(
        token,
        'y7y9u92348y5789yye789yq234785y78q34y78oghio',
        (err, decoded) => {
            if (err){
                console.log(err)
                return res.status(403).json({ message: 'Forbidden, Auth Expired' })
            }
            req.user = decoded.id
            next()
        }
    )
   }else{
    return res.status(401).json({ message: 'Unauthorized, Invalid Data' })
   }
}

module.exports = verifyToken 