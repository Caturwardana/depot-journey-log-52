
import { Request, Response } from 'express';
import { User, CreateUserData, UpdateUserData } from '../models/user.js';

export class UsersController {
  static async getAll(req: Request, res: Response) {
    try {
      res.json({
        success: true,
        message: "Users retrieved successfully",
        data: [
          {
            id: 1,
            username: "admin1",
            fullname: "Administrator",
            role: "admin",
            created_at: new Date()
          }
        ]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving users",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res.json({
        success: true,
        message: "User retrieved successfully",
        data: {
          id: parseInt(id),
          username: "admin1",
          fullname: "Administrator",
          role: "admin",
          created_at: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving user",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const userData: CreateUserData = req.body;
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          id: Math.floor(Math.random() * 1000),
          ...userData,
          created_at: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData: UpdateUserData = req.body;
      res.json({
        success: true,
        message: "User updated successfully",
        data: {
          id: parseInt(id),
          ...updateData,
          updated_at: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating user",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res.json({
        success: true,
        message: "User deleted successfully",
        data: { id: parseInt(id) }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export default UsersController;
