import { useState, useEffect } from "react";
import AddTodo from "./components/addtodo.jsx";
import DisplayData from "./components/displaydata.jsx";
import "./App.css";

function App() {
  const [input, setInput] = useState([]);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [activeTab, setActiveTab] = useState("ongoing");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_URL}/api/todos/`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const tasks = await response.json();
        setInput(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Make sure backend is running on " + API_URL);
      }
    };

    fetchTodos();
  }, [API_URL]);

  const addInput = async (newInput, newDescription) => {
    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newInput, description: newDescription || "", completed: false }),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const newTask = await response.json();
      setInput([newTask, ...input]);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add task: " + error.message);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setInput(input.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete task: " + error.message);
    }
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setEditingTitle(task.title);
  };

  const saveEditTask = async () => {
    if (!editingTitle.trim()) {
      alert("Task cannot be empty");
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/todos/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingTitle, description: "", completed: false }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      const updatedTask = await response.json();
      setInput(input.map(task => task._id === editingId ? updatedTask : task));
      setEditingId(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update task: " + error.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const task = input.find(t => t._id === id);
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task.title, description: task.description, completed: !currentStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      const updatedTask = await response.json();
      setInput(input.map(t => t._id === id ? updatedTask : t));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update task: " + error.message);
    }
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      {error && (
        <div className="bg-gradient-to-r from-red-100 to-pink-100 border-l-4 border-red-500 text-red-800 px-6 py-4 m-4 rounded-lg shadow-md flex items-center gap-3">
          <div>
            <p className="font-semibold">Connection Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
      <AddTodo addInput={addInput} />
      <DisplayData display={input} onEdit={editTask} onDelete={deleteTask} onToggleComplete={toggleComplete} editingId={editingId} editingTitle={editingTitle} setEditingTitle={setEditingTitle} onSaveEdit={saveEditTask} onCancelEdit={cancelEdit} activeTab={activeTab} setActiveTab={setActiveTab} />
      <footer className="text-gray-600 text-center py-8 text-sm font-medium border-t border-gray-100 mt-2">
        <p>Made by Abhishek Chamlagain</p>
      </footer>
    </div>
  );
}

export default App;
