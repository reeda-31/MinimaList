

const TodoCard = ({ todo, onEdit, handleDelete, onCategoryClick }) => {
  return (
    <div className="group bg-base-200 p-4 rounded-xl shadow-md flex justify-between items-start hover:shadow-lg transition-all">
      {/* Left Content */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{todo.title}</h2>

        {/* Category badge only if exists */}
        {todo.category && (
          <div
            className="badge badge-outline cursor-pointer"
            onClick={() => onCategoryClick(todo.category)}
          >
            {todo.category}
          </div>
        )}
      </div>

      {/* Hover buttons */}
      <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition">
        <button className="btn btn-sm btn-outline" onClick={() => onEdit(todo)}>
          <Pencil size={16} />
        </button>

        <button
          className="btn btn-sm btn-error btn-outline"
          onClick={() => handleDelete(todo._id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
