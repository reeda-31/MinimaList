import React from "react";

export default function ProgressBar(props) {
  let percent;
  if (props.completedNumber === 0 || props.todos.length === 0) {
    percent = 0;
  } else {
    percent = Math.ceil((props.completedNumber / props.todos.length) * 100);
  }

  return (
    <div className="container my-3">
      <h3>Tasks Completed</h3>
      <div className="progress">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percent}%
        </div>
      </div>
    </div>
  );
}
