import { useState, useRef, useEffect } from "react";
import Button from "../components/ui/Button";
import "cally";
import moment from "moment";

const CreateTodoPage = () => {
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
  }, []);

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
          body: JSON.stringify({
            title,
            dueDate,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create todo");
      }

      setTitle("");
      setDueDate("");

      alert("Todo created successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start pt-4 sm:pt-24 p-6">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Add a Task</h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>

              <input
                type="text"
                placeholder="Enter todo title"
                className="input input-bordered w-full focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Due Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Due Date</span>
              </label>

              {/*<input
                type="date"
                className="input input-bordered w-full focus:outline-none"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              /> */}

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
                popover="manual"
                id="cally-popover1"
                className="dropdown bg-base-100 rounded-box shadow-lg"
                style={{ positionAnchor: "--cally1" }}
              >
                <calendar-date
                  ref={calendarRef}
                  className="cally"
                  onChange={(e) => {
                    const selectedDate = e.currentTarget.value;
                    setDueDate(selectedDate);
                    document.getElementById("cally-popover1")?.hidePopover();
                  }}
                >
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
            <div className="card-actions justify-end mt-6">
              <Button type="submit">Create Todo</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTodoPage;
