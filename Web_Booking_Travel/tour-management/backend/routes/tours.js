import express from 'express'
import { CreateNewTour , UpdateTour , GetSingleTour, DeleteTour , GetAllTour , GetTourBySearch , GetTourCount} from '../Controller/tourController.js'
const route = express.Router()

route.post('/',CreateNewTour)

route.post('/:id',UpdateTour)

route.get('/:id',GetSingleTour)

route.get('/',GetAllTour)

route.delete('/:id',DeleteTour)

route.get('/search/getTourBySearch',GetTourBySearch)

route.get('/search/getCountTour',GetTourCount)
export default route;