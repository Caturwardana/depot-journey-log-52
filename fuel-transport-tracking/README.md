### Step 1: Set Up Your Environment

1. **Install Node.js**: Make sure you have Node.js installed on your machine.

2. **Create a New Directory for Your Project**:
   ```bash
   mkdir fuel-transport-tracking
   cd fuel-transport-tracking
   ```

3. **Initialize a New Node.js Project**:
   ```bash
   npm init -y
   ```

4. **Install Required Packages**:
   ```bash
   npm install express mysql2 body-parser dotenv
   ```

### Step 2: Create the Project Structure

Create the following files and directories:

```
fuel-transport-tracking/
│
├── .env
├── app.js
└── routes/
    └── transport.js
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory to store your database connection details:

```plaintext
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=fuel_transport_tracking
```

### Step 4: Set Up the Express Application

In `app.js`, set up the Express server and connect to the MySQL database:

```javascript
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Routes
app.use('/api/transport', require('./routes/transport')(db));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

### Step 5: Create Routes for Transport Records

In `routes/transport.js`, create routes to interact with the `transport_records` table:

```javascript
// routes/transport.js
module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    // Get all transport records
    router.get('/', (req, res) => {
        db.query('SELECT * FROM transport_records', (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    });

    // Get a specific transport record by ID
    router.get('/:id', (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM transport_records WHERE id = ?', [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Transport record not found' });
            }
            res.json(results[0]);
        });
    });

    // Create a new transport record
    router.post('/', (req, res) => {
        const newRecord = req.body;
        db.query('INSERT INTO transport_records SET ?', newRecord, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, ...newRecord });
        });
    });

    // Update a transport record
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const updatedRecord = req.body;
        db.query('UPDATE transport_records SET ? WHERE id = ?', [updatedRecord, id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Transport record updated successfully' });
        });
    });

    // Delete a transport record
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM transport_records WHERE id = ?', [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Transport record deleted successfully' });
        });
    });

    return router;
};
```

### Step 6: Run Your Application

1. **Start the Server**:
   ```bash
   node app.js
   ```

2. **Test the API**: You can use tools like Postman or curl to test the API endpoints. For example:
   - GET all transport records: `GET http://localhost:3000/api/transport`
   - GET a specific transport record: `GET http://localhost:3000/api/transport/1`
   - POST a new transport record: `POST http://localhost:3000/api/transport` with JSON body.
   - PUT to update a transport record: `PUT http://localhost:3000/api/transport/1` with JSON body.
   - DELETE a transport record: `DELETE http://localhost:3000/api/transport/1`.

### Conclusion

This is a basic setup for an Express.js application that connects to a MySQL database and provides RESTful API endpoints for managing transport records. You can expand this application by adding more routes, implementing authentication, and creating a frontend to interact with the API.