import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, "abcd", (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded; 
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
