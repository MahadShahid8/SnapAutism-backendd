import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Admin } from '../models/Admin.js';


// Controller to verify admin login
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for the admin
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      'secretKey', // Use an environment variable for production
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { username: admin.username, role: admin.role },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to ensure two admins are in the database
export const setupAdmins = async () => {
    console.log("in create admin controller");
    try {
      const admins = [
        { email: 'rijjafarhan2@gmail.com', password: 'abcd1234' },
        { email: 'mahadshahid@gmail.com', password: 'admin456' },
      ];
  
      for (let adminData of admins) {
        const { email, password } = adminData;
  
       
        let admin = await Admin.findOne({ email });
        if (!admin) {
         
          const hashedPassword = await bcrypt.hash(password, 10);
  
         
          const newAdmin = new Admin({
            email,
            password: hashedPassword,
            role: 'admin',
          });
          await newAdmin.save();
          console.log(`Admin ${email} created.`);
        } else {
          console.log(`Admin ${email} already exists.`);
        }
      }
  
      console.log('Admins setup successfully.');
    } catch (error) {
      console.error('Setup Admins Error:', error);
    }
  };
