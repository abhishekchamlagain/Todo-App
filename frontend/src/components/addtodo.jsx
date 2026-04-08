import { useState } from "react";

function AddTodo({ addInput }) {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <section className="bg-white py-12">
        <div className="flex flex-col text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2" style={{ color: "#1791c8" }}>
              Welcome to Todo App
            </h1>
            <p className="text-gray-500 text-lg">Stay organized and get things done</p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Task Title</label>
                  <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full border-2 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition duration-200 placeholder-gray-400" 
                    style={{ borderColor: "#1791c8", "--tw-ring-color": "#1791c8" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Description (Optional)</label>
                  <textarea
                    placeholder="Add more details about your task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-2 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition duration-200 placeholder-gray-400 resize-none" 
                    style={{ borderColor: "#1791c8", "--tw-ring-color": "#1791c8" }}
                    rows="3"
                  />
                </div>

                <button
                  onClick={() => {
                    if (!input.trim()) {
                      alert("Please enter a task!");
                      return;
                    }
                    addInput(input, description);
                    setInput("");
                    setDescription("");
                  }}
                  className="w-full text-white font-semibold py-3 px-6 rounded-lg active:scale-95 transition duration-200 shadow-lg hover:shadow-2xl"
                  style={{ 
                    backgroundColor: "#1791c8",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#117ba8";
                    e.target.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#1791c8";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddTodo;
