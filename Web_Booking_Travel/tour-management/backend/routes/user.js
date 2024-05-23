import express from 'express'
import { GetSingleUser , CreateNewUser , GetAllUser , GetUserBySearch , GetUserCount , UpdateUser , DeleteUser } from '../Controller/userController.js';
const route = express.Router();
route.post('/',CreateNewUser)
route.post('/:id',UpdateUser)

route.get('/:id',GetSingleUser);
route.get('/',GetAllUser)
route.get('/search/getUserCount',GetUserCount)
route.get('/search',GetUserBySearch)

route.delete('/:id',DeleteUser)
export default route