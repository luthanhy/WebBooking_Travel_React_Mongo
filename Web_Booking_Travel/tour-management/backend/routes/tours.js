import express from 'express'
import { CreateNewTour , UpdateTour , GetSingleTour, DeleteTour , GetAllTour , GetTourBySearch , GetTourCount , GetFeaturedTour} from '../Controller/tourController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
const route = express.Router()


route.post('/',CreateNewTour)
route.post('/:id',verifyAdmin,UpdateTour)

route.get('/:id',GetSingleTour)

route.get('/',GetAllTour)

route.delete('/:id',verifyAdmin,DeleteTour)

route.get('/search/getTourBySearch',GetTourBySearch)

route.get('/search/getCountTour',GetTourCount)

route.get('/search/getFeatureTour',GetFeaturedTour)
export default route;