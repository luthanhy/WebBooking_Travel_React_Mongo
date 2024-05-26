import ReviewProduct from '../models/reviewproduct.js';
import Tour from '../models/Tour.js';

// Tạo một tour mới để xét duyệt
export const createReviewProduct = async (req, res) => {
  try {
    const newReviewProduct = new ReviewProduct(req.body); 
    const savedReviewProduct = await newReviewProduct.save();
    res.status(201).json(newReviewProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả các review product
export const getAllReviewProducts = async (req, res) => {
  try {
    const reviewProducts = await ReviewProduct.find();
    res.status(200).json({ tours: reviewProducts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa một review product
export const deleteReviewProduct = async (req, res) => {
  try {
    await ReviewProduct.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Chấp nhận một review product và thêm vào tours
export const approveReviewProduct = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    await newTour.save();
    await ReviewProduct.findByIdAndDelete(req.params.id);
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
