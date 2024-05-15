import express from 'express'
import { CreateBooking , GetSingleBooking , GetAllBooking} from '../Controller/bookingController.js';
import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';
const route = express.Router()

route.post('/',CreateBooking);
route.get('/:id',GetSingleBooking);
route.get('/getAllBooking',GetAllBooking)

export default route;