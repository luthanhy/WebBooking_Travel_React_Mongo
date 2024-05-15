import express from 'express'
import { CreateReviewTour } from '../Controller/reviewsController.js'
import { verifyUser } from '../utils/verifyToken.js'
const route = express.Router()

route.post('/:id',verifyUser,CreateReviewTour)

export default route