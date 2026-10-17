const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());


//read ka code hai 
app.get('/employees', async (req, res) => {
  try {
    const [employees] = await db.query(
      'SELECT * FROM employees ORDER BY id ASC'
    );

    return res.status(200).json(employees);
  } catch (error) {
    console.error('Fetch employees error:', error);

    return res.status(500).json({
      message: 'Failed to fetch employees'
    });
  }
});

// create ka code
app.post('/employees', async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO employees (name, email, role) VALUES (?, ?, ?)',
      [name, email, role]
    );

    return res.status(201).json({
      message: 'Employee created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create employee error:', error);

    return res.status(500).json({
      message: 'Failed to create employee'
    });
  }
});

//Update ka code 
app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  try {
    const [result] = await db.query(
      'UPDATE employees SET name = ?, email = ?, role = ? WHERE id = ?',
      [name, email, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    return res.status(200).json({
      message: 'Employee updated successfully'
    });

  } catch (error) {
    console.error('Update error:', error);

    return res.status(500).json({
      message: 'Failed to update employee'
    });
  }
});
//Delete ka code
app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'DELETE FROM employees WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    return res.status(200).json({
      message: 'Employee deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);

    return res.status(500).json({
      message: 'Failed to delete employee'
    });
  }
});


const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await db.query('SELECT 1');

    console.log('MySQL connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
