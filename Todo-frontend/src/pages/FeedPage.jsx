import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EditTodoModal from "./EditTodoModal";
import { Folder, ListTodo, Pencil, Trash2 } from "lucide-react";
import Header from "../components/custom/Header";
import moment from "moment";
import { Calendar } from "lucide-react";
import Button from "../components/ui/Button";

const FeedPage = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { user, loading,logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleLogout=async ()=>{
  await logout();
  navigate("/login");
  }

  const addTodo = (todo) => {
    setTasks((prev) => [todo, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/todo/delete-todo/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/todo/fetch-todos`,
          { credentials: "include" },
        );
        const data = await response.json();
        let todos = data.data;
        if (location.state?.newTodo) {
          todos = [
            location.state.newTodo,
            ...todos.filter((t) => t._id !== location.state.newTodo._id),
          ];
        }
        setTasks(todos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingFeed(false);
      }
    };
    fetchTasks();
  }, []);

  // Extract categories
  const categories = useMemo(() => {
    const map = {};
    tasks.forEach((todo) => {
      if (todo.category) {
        if (!map[todo.category]) {
          map[todo.category] = {
            total: 0,
            completed: 0,
          };
        }

        map[todo.category].total += 1;

        if (todo.completed) map[todo.category].completed += 1;
      }
    });

    return map;
  }, [tasks]);

  const categoryNames = Object.keys(categories);

  // Filter todos by category
  const filteredTodos =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((t) => t.category === selectedCategory);

  const toggleComplete = async (id) => {
    try {
      const todo = tasks.find((t) => t._id === id);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/todo/update-todo/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await response.json();

      setTasks((prev) => prev.map((t) => (t._id === id ? data.data : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = (updatedTodo) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)),
    );
  };

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loadingFeed) {
    return <div className="p-6">Loading tasks...</div>;
  }

  return (
    <>
      <Header
        addTodo={addTodo}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        hasCategories={categoryNames.length > 0}
      />

      <div className="min-h-screen bg-base-200 flex relative ">
        {/* SIDEBAR */}
        <aside
          className={`z-40 bg-base-100 border-r w-64 p-5 space-y-4 transform transition-all duration-300 fixed top-16 h-[calc(100vh-4rem)]
md:relative md:top-0 md:h-auto md:translate-x-0
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:w-0 md:p-0 md:overflow-hidden"}`}
        >
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Folder size={18} />
            Categories
          </h2>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`btn btn-sm justify-start ${
                selectedCategory === "All" ? "btn-primary" : "btn-ghost"
              }`}
            >
              <ListTodo size={16} />
              All Tasks
            </button>

            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm justify-start ${
                  selectedCategory === cat ? "btn-primary" : "btn-ghost"
                }`}
              >
                <Folder size={16} />
                {cat}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t">
            <Button
              variant="btn-ghost"
              className="w-full justify-start text-error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main
          className={`flex-1 lg:px-40 p-6 transition-all duration-300 ${
            sidebarOpen ? "max-w-full" : "max-w-8xl"
          }`}
        >
          {/* Heading */}

          <h1 className="text-3xl font-bold mb-6 text-center">
            {tasks.length > 0 ? "Here are your tasks" : "Add your first task! "}
          </h1>

          {/* CATEGORY CARDS */}
          {categoryNames.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {categoryNames.map((cat) => (
                <div
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="card bg-base-100 shadow cursor-pointer hover:shadow-lg transition"
                >
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <Folder size={18} />
                      {cat}
                    </div>

                    <p className="text-sm text-base-content/70">
                      {categories[cat].completed} / {categories[cat].total}{" "}
                      completed
                    </p>

                    <progress
                      className="progress progress-primary w-full"
                      value={categories[cat].completed}
                      max={categories[cat].total}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TODO GRID */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className="card bg-base-100 shadow group hover:shadow-lg"
              >
                <div className="card-body">
                  <div className="flex items-start gap-3">
                    {/* CHECKBOX */}
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mt-1"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo._id)}
                    />

                    <div className="flex-1">
                      <h2
                        className={`font-semibold text-lg ${
                          todo.completed ? "line-through opacity-60" : ""
                        }`}
                      >
                        {todo.title}
                      </h2>
                      <h6 className="flex items-center gap-1 text-xs text-gray my-1">
                        <Calendar size={12} /> :{" "}
                        {moment(todo.dueDate).format("MMM D, YYYY")}
                      </h6>

                      {todo.category && (
                        <span className="badge badge-outline mt-2">
                          {todo.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* /* HOVER ACTIONS* */}
                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => {
                        setSelectedTodo(todo);
                        setOpenTodoModal(true);
                      }}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn btn-sm btn-ghost text-error"
                      onClick={() => {
                        handleDelete(todo._id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <EditTodoModal
          isOpen={openTodoModal}
          onClose={() => setOpenTodoModal(false)}
          todo={selectedTodo}
          updateTodo={updateTodo}
        ></EditTodoModal>
      </div>
    </>
  );
};

export default FeedPage;
