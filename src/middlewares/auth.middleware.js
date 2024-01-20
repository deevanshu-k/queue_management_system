const jwt = require("jsonwebtoken");

module.exports.authCheck = async (req, res, next) => {
    try {
        // Get Token
        const { authorization } = req.headers;
        if (!authorization) {
            // If Token Not Found
            return res.status(401).json({
                message: "You are not authorized for this request !",
            });
        }
        // Authorize Token
        const decoded = jwt.verify(authorization, process.env.SECRET);
        if (process.env.NODE_ENV == "development") console.log(decoded);
        // Set Decoded For Next Middleware
        req.auth = decoded;
        // Go To Next Middleware
        next();
    } catch (error) {
        // If Token Is Unauthorized
        return res.status(401).json({
            message: "Session expired, login again !",
        });
    }
};
