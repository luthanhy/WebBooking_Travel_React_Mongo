import express from 'express'
import { CreateBooking , GetSingleBooking , GetAllBooking} from '../Controller/bookingController.js';
import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';
const route = express.Router()

route.post('/',CreateBooking);


// todo tao lay tui may dung doi thu tu hai man nay
route.get('/getAllBooking',GetAllBooking)
route.get('/:id',GetSingleBooking);

export default route;