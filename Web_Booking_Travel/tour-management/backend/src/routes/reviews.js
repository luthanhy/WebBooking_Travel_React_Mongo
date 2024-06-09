import express from 'express'
import { CreateReviewTour, GetReviewTour,DeleteReviewTour } from '../Controller/reviewsController.js'
import { verifyUser } from '../utils/verifyToken.js'

const route = express.Router()

route.post('/:id',CreateReviewTour)
route.get('/:id', GetReviewTour);
route.delete('/:id',DeleteReviewTour)
export default route