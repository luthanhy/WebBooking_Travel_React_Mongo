import express from 'express'
import { GetSingleUser , CreateNewUser , GetAllUser , GetUserBySearch , GetUserCount , UpdateUser , DeleteUser } from '../Controller/userController.js';
import { verifyUser,verifyAdmin} from '../utils/verifyToken.js';
const route = express.Router();
route.post('/',verifyUser,CreateNewUser)
route.post('/:id',verifyUser,UpdateUser)

route.get('/:id',verifyUser,GetSingleUser);
route.get('/',verifyAdmin,GetAllUser)
route.get('/search/getUserCount',verifyUser,GetUserCount)
route.get('/search',verifyUser,GetUserBySearch)

route.delete('/:id',DeleteUser)
export default route