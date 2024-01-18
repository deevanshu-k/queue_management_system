module.exports.authCheck = async (req, res, next) => {
    try {
        console.log("Auth Check");
        // Get token from header:Authorization
        // If token not found response token not found
        // Verify Token
        // expose token data to req.auth
        // Go To Next Middleware
        next();
    } catch (error) {
        // Token Is Unauthorized
        res.send(error);
    }
};
