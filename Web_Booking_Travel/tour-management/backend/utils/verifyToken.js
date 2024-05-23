import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
  console.log('Token:', token); // Thêm dòng này để kiểm tra token
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
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You're not authenticated" });
    }
  });
};

// Middleware to verify if the user has admin role
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You're not authorized" });
    }
  });
}