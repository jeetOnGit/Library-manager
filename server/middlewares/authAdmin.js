
const authAdmin = (req, res, next) => {
    // This middleware assumes the `authUser` middleware has already run and
    // attached the user object to the request.
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Authentication error, user not found." });
    }

    // Check if the authenticated user's role is 'admin'
    if (req.user.role === 'admin') {
        // If the user is an admin, allow the request to proceed to the controller
        next();
    } else {
        // If the user is not an admin, send a 403 Forbidden error
        return res.status(403).json({ success: false, message: "Access denied. Admin privileges required." });
    }
};

export default authAdmin;