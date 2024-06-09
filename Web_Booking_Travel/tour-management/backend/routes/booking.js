import express from 'express'
import { CreateBooking , GetSingleBooking , GetAllBooking,DeleteSingleBooking} from '../Controller/bookingController.js';
import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';
const route = express.Router()

route.post('/',CreateBooking);


// todo tao lay tui may dung doi thu tu hai man nay

route.delete('/:id',DeleteSingleBooking);
route.post('/',CreateBooking);
route.get('/',GetAllBooking);
route.get('/:id',GetSingleBooking);

export default route;