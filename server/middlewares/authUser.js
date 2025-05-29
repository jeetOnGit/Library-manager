import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.body.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Not authorized, token missing or malformed' });
        }

        const token = authHeader.split('')[1];

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = tokenDecode.id

        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: error.message });
    }
}

export default authUser