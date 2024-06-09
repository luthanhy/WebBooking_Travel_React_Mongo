import express from 'express'
import { CreateBooking , GetSingleBooking , GetAllBooking,DeleteSingleBooking, GetNotificationsByUserId,GetByUserIdPayment,UpdateSingleBooking} from '../Controller/bookingController.js';
import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';
const route = express.Router()

route.post('/',CreateBooking);


// todo tao lay tui may dung doi thu tu hai man nay

route.delete('/:id',DeleteSingleBooking);
route.post('/:id',UpdateSingleBooking);
route.post('/',CreateBooking)
route.get('/',GetAllBooking)
route.get('/:id',GetSingleBooking);
route.get('/notifications/:userId', GetNotificationsByUserId);
route.get('/getInfoPayment/:userId', GetByUserIdPayment);
export default route;