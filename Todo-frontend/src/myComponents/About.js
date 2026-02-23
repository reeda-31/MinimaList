import React from "react";

export default function About(props) {
  return (
    <div
      className="accordion container my-4"
      id="accordionExample"
      style={{
        backgroundColor: props.mode === "light" ? "white" : "#111111ff",
        color: props.mode === "light" ? "black" : "white",
      }}
    >
      <div
        className="card"
        style={{
          backgroundColor: props.mode === "light" ? "white" : "#111111ff",
          color: props.mode === "light" ? "black" : "white",
          border: props.mode === "light" ? "1px solid black" : "1px solid grey",
        }}
      >
        <div className="card-header" id="headingOne">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              style={{
                color: props.mode === "light" ? "black" : "white",
                fontSize: "1.2rem",
              }}
            >
              About the app
            </button>
          </h2>
        </div>

        <div
          id="collapseOne"
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            This ToDo List application, developed using React, is a
            full-featured task management tool designed to help users organize
            and track their daily activities with ease. It offers a clean and
            responsive interface where users can add tasks by providing a title,
            description, and time. Once tasks are created, users can edit them
            as needed or delete them if they are no longer relevant. A key
            feature of the app is the ability to mark tasks as completed. When a
            task is marked complete, it is visually hidden from the main list,
            but the data is preserved and reflected in a dynamic progress bar
            that shows the percentage of tasks completed out of the total. To
            enhance usability, the application includes a light/dark mode
            toggle, allowing users to switch themes based on their preference or
            environment. React Router is implemented to enable smooth navigation
            between different pages of the application—for example, an "About"
            page that provides information about the app. Additionally, all
            tasks are stored in the browser’s local storage, ensuring that the
            user's data is retained even after the page is refreshed or the
            browser is closed. The app makes use of React’s `useState` and
            `useEffect` hooks to manage component state and side effects
            efficiently, creating a seamless and intuitive user experience.
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          backgroundColor: props.mode === "light" ? "white" : "#111111ff",
          color: props.mode === "light" ? "black" : "white",
          border: props.mode === "light" ? "1px solid black" : "1px solid grey",
        }}
      >
        <div className="card-header" id="headingTwo ">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={{
                color: props.mode === "light" ? "black" : "white",
                fontSize: "1.2rem",
              }}
            >
              How to use ToDo List Website
            </button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <ol>
              Here's how you can use its features: <br></br>
              <b>Add a Task:</b> Fill in the task title, description, and time
              in the input form. Click the "Add Task" button to create a new
              task. The task will appear in your ToDo list. <br></br>
              <b>View Your Tasks:</b> All your active (incomplete) tasks will be
              listed on the main screen. You can view the title, description,
              and time of each task.<br></br> <b>Edit a Task:</b> Click the
              "Edit" button next to any task. A modal will pop up with the
              task's current details pre-filled. Modify the details and click
              "Submit" to update the task.<br></br> <b>Delete a Task:</b> Click
              the "Delete" button to permanently remove a task from the list.
              <br></br> Mark a Task as Completed: Click the "Task Completed"
              button to mark a task as finished. The task will disappear from
              the active task list but will still count toward the progress.
              <br></br> <b>Track Your Progress:</b> A progress bar at the top
              shows how many tasks you’ve completed out of the total. <br></br>
              <b>Switch Theme:</b>
              Use the Light/Dark Mode toggle in the header to change the
              appearance of the app.<br></br> <b>Persistent Storage:</b> Your
              tasks are saved in your browser’s local storage, so they remain
              available even after you refresh or close the browser.<br></br>{" "}
              <b>Navigate to Other Pages:</b> Use the navigation links (e.g., to
              an "About" page) to learn more about the app or view additional
              features using React Router.
            </ol>
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          backgroundColor: props.mode === "light" ? "white" : "#111111ff",
          color: props.mode === "light" ? "black" : "white",
          border: props.mode === "light" ? "1px solid black" : "1px solid grey",
        }}
      >
        <div className="card-header" id="headingThree">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={{
                color: props.mode === "light" ? "black" : "white",
                fontSize: "1.2rem",
              }}
            >
              Use Cases & Data Privacy
            </button>
          </h2>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            This ToDo List app is ideal for individuals seeking a simple and
            effective way to manage their daily tasks and boost productivity.
            Whether you're a student keeping track of assignments, a
            professional managing work tasks, or someone planning daily chores,
            this app provides an intuitive interface to help you organize and
            prioritize your work. With features like adding, editing, deleting,
            and marking tasks as complete—along with a visual progress bar and
            local storage for persistence—the app ensures users stay on top of
            their goals throughout the day. The inclusion of light and dark mode
            enhances usability in different lighting environments, and React
            Router provides a seamless navigation experience between multiple
            pages. <br></br>
            <br></br>
            <b>Disclaimer:</b> This ToDo List application is intended for
            personal, educational, and non-commercial use. The app stores task
            data locally on the user's browser using localStorage, which means
            that tasks are not accessible across different devices or browsers.
            The app does not include user authentication or data encryption, so
            sensitive or confidential information should not be stored in it.
            While every effort has been made to ensure stability and proper
            functionality, the app is provided "as is" without any warranties or
            guarantees. Use of this application is at your own discretion and
            risk.
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          backgroundColor: props.mode === "light" ? "white" : "#111111ff",
          color: props.mode === "light" ? "black" : "white",
          border: props.mode === "light" ? "1px solid black" : "1px solid grey",
        }}
      >
        <div className="card-header" id="headingThree">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={{
                color: props.mode === "light" ? "black" : "white",
                fontSize: "1.2rem",
              }}
            >
              Developer Information
            </button>
          </h2>
        </div>
        <div
          id="collapseFour"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <b>Developer Name:</b> Syed Reeda Mehwesh <br></br><b>Role:</b> Front-End Web Developer<br></br>
            <b>Project:</b> React ToDo List App<br></br><b>Tech Stack:</b>  React, JavaScript, HTML,
            CSS, Bootstrap, React Router, localStorage.<br></br><b>GitHub: </b> 
            <a href="https://github.com/reeda-31">Github Link</a> <br></br><b>Email: </b>mehweshreeda3108@gmail.com<br></br><b>About Me: </b>I am a passionate front-end developer
            focused on building user-friendly and responsive web applications.
            This ToDo List app was devneloped as a project to practice React
            fundamentals, state management, routing, and working with browser
            storage. I am constantly learning and aiming to improve both
            functionality and user experience in my applications. I am aiming to learn MERN stack development and soon create full stack projects.
          </div>
        </div>
      </div>
    </div>
  );
}
