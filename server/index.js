const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db/sequelize/models/index');

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Sync database
db.sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

// Routes

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const todo = await db.todo.create({
      description: req.body.description
    });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await db.todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await db.todo.findByPk(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a todo (Alternative)

// Using save() method, first retrieved the todo item from the database using findByPk() and then updated its properties before saving it back to the database.

// app.put("/todos/:id", async (req, res) => {
//   try {
//     const todo = await db.todo.findByPk(req.params.id); 
//     if (todo) {
//       todo.description = req.body.description;
//       await todo.save();
//       res.json(todo);
//     } else {
//       res.status(404).json({ error: 'Todo not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Update a todo

// Using update() method, updated the todo item with the specified id directly in the database. 
app.put("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const updatedDescription = req.body.description;

  try {
    // Update the todo with the specified id
    const [numRowsAffected, updatedTodo] = await db.todo.update(
      { description: updatedDescription },
      { where: { id: todoId }, returning: true }
    );

    // Check if any rows were affected by the update
    if (numRowsAffected > 0) {
      // If at least one row was affected, return the updated todo
      res.json(updatedTodo[0]);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await db.todo.findByPk(req.params.id);
    if (todo) {
      await todo.destroy();
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
