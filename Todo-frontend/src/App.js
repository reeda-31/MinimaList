import React, { useState, useEffect } from "react";
import Header from "./myComponents/Header";
import Addtodo from "./myComponents/Addtodo";
import TodosDisplay from "./myComponents/TodosDisplay";
import EditModal from "./myComponents/EditModal";
import ProgressBar from "./myComponents/ProgressBar";
import About from "./myComponents/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  let initialtodo;
  if (localStorage.getItem("todos") === null) {
    initialtodo = [];
  } else {
    initialtodo = JSON.parse(localStorage.getItem("todos"));
  }

  let initialmode=JSON.parse(localStorage.getItem("mode")) || "light";

  const [todos, setTodos] = useState(initialtodo);
  const[filterBy,setFilterBy]=useState("all")

  const filteredTodos=()=>{
    if(filterBy==="completed")
      return todos.filter((todo) => todo.isComplete === true)
    else if(filterBy==="incomplete")
      return todos.filter((todo) => todo.isComplete === false)
    else
      return todos
  }

  const onDelete = (todo) => {
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );

    const updatedTodos = todos
      .filter((e) => e !== todo)
      .map((todoItem, index) => ({
        ...todoItem,
        sno: index + 1, // Reassign sno in order
      }));
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const [showModal, setShowModal] = useState(false);

  const [currentTodo, setCurrentTodo] = useState("");

  const onEdit = (todo) => {
    setShowModal(true);
    setCurrentTodo(todo);
  };

  const updatemodal = (updated) => {
    const newTodos = todos.map((todo) =>
      todo.sno === updated.sno ? updated : todo
    );
    setTodos(newTodos);
    // setShowModal(false);
  };

  const additem = (title,time) => {
    let sno;
    if (!title || !time) alert("All the fields should be filled");
    else {
      if (todos.length === 0) {
        sno = 1;
      } else {
        sno = todos[todos.length - 1].sno + 1;
      }
      let mytodo = {
        sno: sno,
        title: title,
        time: time,
        date: new Date().toLocaleDateString(),
        isComplete: false,
      };
      setTodos([...todos, mytodo]);
    }
  };

  const [mode, setmode] = useState(initialmode);

  const toggleMode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#1b1e21";
      document.body.style.color = "white";
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  const onComplete = (todo) => {
    const updated = todos.map((item) => {
      if (item.sno === todo.sno) {
        return { ...item, isComplete: !todo.isComplete };
      } else return item;
    });
    setTodos(updated);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
    if (mode === "light") {
    document.body.style.backgroundColor="white"
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor="#111111ff"
    document.body.style.color = "white";
  }
  }, [mode]);

  return (
    <div>
      <Router>
        <Header
          title="ToDo List"
          searchBar={true}
          mode={mode}
          togglemode={toggleMode}
          todos={todos}
          setFilterBy={setFilterBy}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProgressBar
                  completedNumber={
                    todos.filter((todo) => todo.isComplete).length
                  }
                  todos={todos}
                />
                <div className="d-flex flex-column flex-lg-row col-12 mb-1"style={{ alignItems: "flex-start" }} >
                  <Addtodo additem={additem} mode={mode} />

                  <TodosDisplay
                    todos={filteredTodos()}
                    onDelete={onDelete}
                    mode={mode}
                    onEdit={onEdit}
                    onComplete={onComplete}
                  />

                  <EditModal
                    status={showModal}
                    setShowModal={setShowModal}
                    additem={additem}
                    currentTodo={currentTodo}
                    onSave={updatemodal}
                  />
                </div>
              </>
            }
          />
          <Route path="/about" element={<About mode={mode} />} />
        </Routes>
      </Router>
    </div>
  );
}
