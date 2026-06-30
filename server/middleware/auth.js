const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization");

  

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    try {
      
        const actualToken = token.replace(/^Bearer\s+/i, "").trim();

        const decoded = jwt.verify(
            actualToken,
            process.env.JWT_SECRET
        );

        console.log("Decoded Token:", decoded);

        req.user = decoded;
        next();

    } catch (error) {
        console.log("JWT ERROR:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};

module.exports = auth;