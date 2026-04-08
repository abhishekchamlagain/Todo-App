function DisplayData({
  display,
  onEdit,
  onDelete,
  onToggleComplete,
  editingId,
  editingTitle,
  setEditingTitle,
  onSaveEdit,
  onCancelEdit,
  activeTab,
  setActiveTab,
}) {
  const ongoingTasks = display.filter(task => !task.completed);
  const completedTasks = display.filter(task => task.completed);

  return (
    <section className="bg-white py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Tab Filter Buttons */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("ongoing")}
            className="px-6 py-2 font-semibold transition duration-200 text-gray-600"
            style={activeTab === "ongoing" ? { color: "#1791c8", borderBottom: "2px solid #1791c8", paddingBottom: "6px" } : {}}
          >
            Ongoing ({ongoingTasks.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className="px-6 py-2 font-semibold transition duration-200 text-gray-600"
            style={activeTab === "completed" ? { color: "#1791c8", borderBottom: "2px solid #1791c8", paddingBottom: "6px" } : {}}
          >
            Completed ({completedTasks.length})
          </button>
        </div>

        {display.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No tasks yet. Add one above!</p>
          </div>
        ) : activeTab === "ongoing" && ongoingTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">All tasks completed! Great job!</p>
          </div>
        ) : activeTab === "completed" && completedTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No completed tasks yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(activeTab === "ongoing" ? ongoingTasks : completedTasks).map((item, index) => (
              <TaskItem
                key={item._id}
                item={item}
                index={index + 1}
                isEditing={editingId === item._id}
                editingTitle={editingTitle}
                setEditingTitle={setEditingTitle}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                isCompleted={item.completed}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TaskItem({ item, index, isEditing, editingTitle, setEditingTitle, onEdit, onDelete, onToggleComplete, onSaveEdit, onCancelEdit, isCompleted }) {
  return (
    <div key={item._id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 group">
      {isEditing ? (
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-10 h-10 text-white rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "#1791c8" }}>
            {index}
          </span>
          <div className="flex-1 flex flex-col gap-3">
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              className="w-full border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition"
              style={{ borderColor: "#1791c8", "--tw-ring-color": "#1791c8" }}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={onSaveEdit}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                ✓ Save
              </button>
              <button
                onClick={onCancelEdit}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3 flex-1 min-w-0 items-start">
            {!isCompleted ? (
              <input
                type="checkbox"
                checked={false}
                onChange={() => onToggleComplete && onToggleComplete(item._id, isCompleted)}
                className="w-5 h-5 mt-1 cursor-pointer rounded"
                style={{ accentColor: "#1791c8" }}
              />
            ) : (
              <button
                onClick={() => onToggleComplete && onToggleComplete(item._id, isCompleted)}
                className="w-5 h-5 mt-1 cursor-pointer flex items-center justify-center rounded border-2"
                style={{ borderColor: "#1791c8", background: "white", padding: 0 }}
                title="Click to mark as ongoing"
              >
                <span style={{ color: "black", fontSize: "14px", fontWeight: "bold", lineHeight: 1 }}>✓</span>
              </button>
            )}
            <span className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-xs" style={{ backgroundColor: "#1791c8" }}>
              {index}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-lg font-semibold text-left break-words ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {item.title}
              </p>
              {item.description && (
                <p className="text-gray-600 text-sm text-left mt-2 italic break-words">
                  {item.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
            <button
              onClick={() => onEdit && onEdit(item)}
              className="p-2 rounded-lg transition duration-200"
              style={{ backgroundColor: "rgba(23, 145, 200, 0.1)", color: "#1791c8" }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = "#1791c8"; e.target.style.color = "white"; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = "rgba(23, 145, 200, 0.1)"; e.target.style.color = "#1791c8"; }}
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete && onDelete(item._id)}
              className="bg-red-100 hover:bg-red-500 text-red-600 hover:text-white p-2 rounded-lg transition duration-200"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayData;
