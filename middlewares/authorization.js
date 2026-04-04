const jwt = require('jsonwebtoken');

exports.identifier = (req, res, next) => {
    let token;

    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization;
    } else {
        token = req.cookies['Authorization'];
    }

    if (!token) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    try {
        if (!token.startsWith('Bearer ')) {
            return res.status(403).json({ success: false, message: 'Invalid token format' });
        }

        const userToken = token.split(' ')[1];

        const jwtVerified = jwt.verify(
            userToken,
            process.env.TOKEN_SECRET
        );

        req.user = {
            userId: jwtVerified.userId,
            email: jwtVerified.email,
            verified: jwtVerified.verified
        };

        next();

    } catch (error) {
        console.log(error);

        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};