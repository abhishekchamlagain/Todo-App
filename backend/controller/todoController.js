const Todo = require("../modules/todo");

// create todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    if (title.length > 100) {
      return res.status(400).json({ error: "Title too long" });
    }
    
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error.message);
    res.status(500).json({ error: "Failed to add task: " + error.message });
  }
};

// get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};