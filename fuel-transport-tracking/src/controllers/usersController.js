
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid('driver', 'supervisor', 'fuelman', 'glpama', 'admin').required()
});

const loginValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

class UsersController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error.message
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user',
        error: error.message
      });
    }
  }

  static async createUser(req, res) {
    try {
      const { error, value } = userValidationSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      const existingUser = await User.findByUsername(value.username);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Username already exists'
        });
      }

      const user = await User.create(value);
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: error.message
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, fullname, role } = req.body;

      const updateSchema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        fullname: Joi.string().min(2).max(100).required(),
        role: Joi.string().valid('driver', 'supervisor', 'fuelman', 'glpama', 'admin').required()
      });

      const { error, value } = updateSchema.validate({ username, fullname, role });
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      const user = await User.update(id, value);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'User updated successfully',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating user',
        error: error.message
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await User.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: error.message
      });
    }
  }

  static async login(req, res) {
    try {
      const { error, value } = loginValidationSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      const { username, password } = value;
      const user = await User.findByUsername(username);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const isValidPassword = await User.validatePassword(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
            role: user.role
          },
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error during login',
        error: error.message
      });
    }
  }
}

module.exports = UsersController;
