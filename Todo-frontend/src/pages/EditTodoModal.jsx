import React, { useState, useEffect } from "react";
import Button from "../components/ui/Button";

const EditTodoModal = ({ isOpen, onClose, todo, updateTodo }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
//   const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fill modal when todo changes
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setCategory(todo.category || "");
      setDueDate(todo.dueDate ? todo.dueDate.slice(0, 10) : "");
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/todo/update-todo/${todo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            category,
            dueDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await response.json();

      // update UI instantly
    updateTodo(data.data);

      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-md">

        <h3 className="font-bold text-lg mb-4">Edit Task</h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="label">Task Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="label">Due Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>


          {/* Buttons */}
          <div className="modal-action flex flex-col sm:flex-row gap-2">

            <Button
              type="button"
              variant="btn-ghost"
              className="w-full sm:w-auto"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="btn-primary"
              className="w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Task"}
            </Button>

          </div>
        </form>
      </div>

      {/* backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default EditTodoModal;