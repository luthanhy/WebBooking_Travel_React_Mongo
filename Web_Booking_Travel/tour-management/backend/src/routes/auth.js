import express from 'express';
import { Login, Register } from '../Controller/authController.js';
import passport from 'passport';
const route = express.Router();

route.post("/register", Register);
route.post("/login", Login);
route.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

route.get("/google/callback", 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
   
    res.redirect('http://localhost:3000');
  }
);
export default route;
