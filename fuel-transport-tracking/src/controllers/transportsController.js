
const Transport = require('../models/transport');
const Joi = require('joi');

const transportValidationSchema = Joi.object({
  unit_number: Joi.string().required(),
  driver_id: Joi.number().integer().required(),
  depot_id: Joi.number().integer().allow(null),
  terminal_id: Joi.number().integer().allow(null),
  destination: Joi.string().required(),
  fuel_type: Joi.string().valid('gasoline', 'diesel', 'kerosene').required(),
  volume: Joi.number().positive().required(),
  status: Joi.string().valid('pending', 'in_transit', 'arrived', 'unloading', 'completed', 'cancelled').default('pending'),
  notes: Joi.string().allow('', null),
  latitude: Joi.number().allow(null),
  longitude: Joi.number().allow(null)
});

class TransportsController {
  static async getAllTransports(req, res) {
    try {
      const transports = await Transport.findAll();
      res.json({
        success: true,
        data: transports
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching transports',
        error: error.message
      });
    }
  }

  static async getTransportById(req, res) {
    try {
      const { id } = req.params;
      const transport = await Transport.findById(id);
      
      if (!transport) {
        return res.status(404).json({
          success: false,
          message: 'Transport not found'
        });
      }

      res.json({
        success: true,
        data: transport
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching transport',
        error: error.message
      });
    }
  }

  static async createTransport(req, res) {
    try {
      const { error, value } = transportValidationSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      const transport = await Transport.create(value);
      res.status(201).json({
        success: true,
        message: 'Transport created successfully',
        data: transport
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating transport',
        error: error.message
      });
    }
  }

  static async updateTransport(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = transportValidationSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      const transport = await Transport.update(id, value);
      
      if (!transport) {
        return res.status(404).json({
          success: false,
          message: 'Transport not found'
        });
      }

      res.json({
        success: true,
        message: 'Transport updated successfully',
        data: transport
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating transport',
        error: error.message
      });
    }
  }

  static async deleteTransport(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Transport.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Transport not found'
        });
      }

      res.json({
        success: true,
        message: 'Transport deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting transport',
        error: error.message
      });
    }
  }

  static async updateTransportStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const statusSchema = Joi.object({
        status: Joi.string().valid('pending', 'in_transit', 'arrived', 'unloading', 'completed', 'cancelled').required()
      });

      const { error } = statusSchema.validate({ status });
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value'
        });
      }

      const transport = await Transport.updateStatus(id, status);
      
      if (!transport) {
        return res.status(404).json({
          success: false,
          message: 'Transport not found'
        });
      }

      res.json({
        success: true,
        message: 'Transport status updated successfully',
        data: transport
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating transport status',
        error: error.message
      });
    }
  }
}

module.exports = TransportsController;
