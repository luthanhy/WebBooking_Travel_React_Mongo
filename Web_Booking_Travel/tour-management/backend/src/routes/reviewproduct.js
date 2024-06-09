import express from 'express';
import { createReviewProduct, getAllReviewProducts, deleteReviewProduct, approveReviewProduct } from '../Controller/reviewproductController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const route = express.Router();

route.post('/', createReviewProduct);
route.get('/', getAllReviewProducts);
route.delete('/:id', deleteReviewProduct);
route.post('/approve/:id',  approveReviewProduct);

export default route;
