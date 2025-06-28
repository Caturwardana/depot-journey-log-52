
# Fuel Transport Tracking Backend

A complete Express.js backend API for fuel transport tracking system with MySQL database integration.

## Features

- **User Management**: Authentication, role-based access (driver, supervisor, fuelman, glpama, admin)
- **Transport Tracking**: Complete CRUD operations for fuel transport management
- **File Upload**: Secure image upload with validation and storage
- **Database Integration**: MySQL with connection pooling
- **Input Validation**: Joi schema validation for all endpoints
- **Security**: JWT authentication, password hashing with bcrypt
- **Error Handling**: Comprehensive error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fuel-transport-tracking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup MySQL Database**
   ```bash
   # Login to MySQL
   mysql -u root -p
   
   # Run the schema file
   source database/schema.sql
   ```

4. **Configure Environment Variables**
   Copy `.env` file and update with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=fuel_transport_tracking
   DB_PORT=3306
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h
   ```

5. **Start the Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/login` - User login

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Transports
- `GET /api/transports` - Get all transports
- `GET /api/transports/:id` - Get transport by ID
- `POST /api/transports` - Create new transport
- `PUT /api/transports/:id` - Update transport
- `DELETE /api/transports/:id` - Delete transport
- `PATCH /api/transports/:id/status` - Update transport status

### Additional Routes
- Depots: `/api/depots`
- Terminals: `/api/terminals`
- Checkpoints: `/api/checkpoints`
- Documents: `/api/documents`
- Flow Meters: `/api/flowmeter`
- Fuel Quality: `/api/fuelquality`
- Activity Logs: `/api/activitylogs`

## Default Login Credentials

All default users have password: `pass123`

- **Driver**: username: `driver1`
- **Supervisor**: username: `supervisor1`
- **Fuelman**: username: `fuelman1`
- **GL PAMA**: username: `glpama1`
- **Admin**: username: `admin1`

## Database Schema

The database includes the following main tables:
- `users` - User accounts and authentication
- `transports` - Fuel transport records
- `depots` - Fuel depot information
- `terminals` - Terminal locations
- `checkpoints` - Transport checkpoints
- `documents` - File attachments
- `flow_meters` - Flow meter readings
- `fuel_quality` - Fuel quality tests
- `activity_logs` - System activity logging

## File Upload

Images are stored in the `uploads/` directory with:
- File type validation (jpg, png, jpeg, gif)
- File size limits (5MB max)
- Automatic file renaming to prevent conflicts
- Image compression for optimization

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- CORS configuration
- Error handling without sensitive data exposure

## Testing

Test the API endpoints using tools like Postman or curl:

```bash
# Login example
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"driver1","password":"pass123"}'

# Get transports example
curl -X GET http://localhost:3000/api/transports \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Frontend Integration

This backend is designed to work with the React frontend application. Update the frontend API service configuration to point to `http://localhost:3000/api`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
