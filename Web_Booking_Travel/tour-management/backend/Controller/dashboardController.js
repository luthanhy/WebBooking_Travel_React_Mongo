import User from '../models/User.js';
import Tour from '../models/Tour.js';

export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user count' });
  }
};

export const getTourCount = async (req, res) => {
  try {
    const count = await Tour.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get tour count' });
  }
};
