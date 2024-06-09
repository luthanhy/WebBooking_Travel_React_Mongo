import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ success: false, message: "You're not authorized" });
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify if the user is authenticated and has the correct role
export const verifyUser = async (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      console.log("aaa");
      next();
    } else {
      console.log("bbb");
      return res.status(403).json({ success: false, message: "You're not authenticated" });
      
    }
  });
};

// Middleware to verify if the user has admin role
export const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You're not authorized" });
    }
  });
};
