const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decotedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decotedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    }catch(error) {
        res.status(401).json({ error });
    }
    
}