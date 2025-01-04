// controllers/userController.js

 import {User} from  '../models/User.js'
// Controller to fetch all registered users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json({ data: users }); // Return users in the response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
