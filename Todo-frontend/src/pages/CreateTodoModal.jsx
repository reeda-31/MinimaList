import { useState, useRef, useEffect } from "react";
import Button from "../components/ui/Button";
import "cally";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CreateTodoModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = calendarRef.current;

    const handleDateChange = (e) => {
      const selectedDate = e.target.value;
      setDueDate(selectedDate);
      document.getElementById("cally-popover1")?.hidePopover();
    };

    calendar?.addEventListener("change", handleDateChange);

    return () => {
      calendar?.removeEventListener("change", handleDateChange);
    };
  }, [isOpen]);

  const handleClose = () => {
    setTitle("");
    setDueDate("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/todo/create-todo`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, dueDate }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create task");
      }

      setTitle("");
      setDueDate("");
      onClose();
      // console.log(data.data)
      navigate("/feed", {
        state: { newTodo: data.data },
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-top sm:modal-middle modal-open">
      <div className="modal-box ">
        <h3 className="font-bold text-lg">Create a New Task</h3>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              className="input input-bordered w-full focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Date</span>
            </label>

            <button
              type="button"
              popoverTarget="cally-popover1"
              className="input input-bordered w-full text-left focus:outline-none"
              id="cally1"
              style={{ anchorName: "--cally1" }}
            >
              {dueDate ? moment(dueDate).format("MMM Do YYYY") : "Pick a date"}
            </button>

            <div
              popover="auto"
              id="cally-popover1"
              className="dropdown bg-base-100 rounded-box shadow-lg w-72"
              style={{ positionAnchor: "--cally1" }}
            >
              <calendar-date ref={calendarRef} className="cally">
                <svg
                  aria-label="Previous"
                  className="fill-current size-4"
                  slot="previous"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                </svg>
                <svg
                  aria-label="Next"
                  className="fill-current size-4"
                  slot="next"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                </svg>
                <calendar-month />
              </calendar-date>
            </div>
          </div>

          {/* Buttons */}
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={handleClose}>
              Cancel
            </button>

            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>

      {/* backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>Close</button>
      </form>
    </dialog>
  );
};

export default CreateTodoModal;
