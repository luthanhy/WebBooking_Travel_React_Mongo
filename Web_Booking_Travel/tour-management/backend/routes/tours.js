import express from 'express'
import { CreateNewTour } from '../Controller/tourController'
const route = express.Router()

route.post('/',CreateNewTour)

export default router;