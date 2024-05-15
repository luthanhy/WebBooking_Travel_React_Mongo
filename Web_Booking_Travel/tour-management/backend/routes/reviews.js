import express from 'express'
import { CreateReviewTour } from '../Controller/reviewsController.js'

const route = express.Router()

route.post('/:tourId',CreateReviewTour)

export default route