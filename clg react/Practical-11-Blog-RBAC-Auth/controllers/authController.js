import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { inMemoryUsers, getDBStatus } from '../config/db.js';
import { JWT_SECRET } from '../middleware/auth.js';

/**
 * 1. POST /api/auth/login
 * Authenticates user credentials & returns signed JWT
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const dbStatus = getDBStatus();
    let user;

    if (dbStatus.isAtlas) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
    }

    // Sign JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '3h' }
    );

    res.status(200).json({
      success: true,
      message: `Authenticated as ${user.role}.`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 2. GET /api/auth/me
 * Retrieves current active session from verified JWT
 */
export const getCurrentUser = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

/**
 * 3. GET /api/auth/seed-users
 * Returns available test accounts for instant evaluation
 */
export const getSeedUsers = (req, res) => {
  res.status(200).json({
    success: true,
    accounts: inMemoryUsers.map((u) => ({
      name: u.name,
      email: u.email,
      role: u.role,
      password: u.password
    }))
  });
};
