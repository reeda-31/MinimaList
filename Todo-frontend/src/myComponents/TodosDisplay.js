import React from "react";
import TodoShow from "../myComponents/TodoShow";
import { AnimatePresence } from "framer-motion";


export default function TodosDisplay(props) {

  return (
    <div
      className="container mb-3 mb-lg-0 glass"
      style={{
        border:
        props.mode === "light" ? "1px, solid, black" : "1px, solid, grey",
        width: "100%",
        padding: "1rem",
        borderRadius: "10px",
        backgroundColor: props.mode==="light"?"#f6f6f6ff":"#27292cff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
      }}
    >
      <AnimatePresence mode="sync">
      {props.todos && props.todos.length > 0 ? (
        <>
          <h3 className="text-center">TO-DO List</h3>
          <hr
            style={{
              border:
                props.mode === "light"
                  ? "1px solid rgba(197, 196, 196, 1)"
                  : "1px solid #e0dfdf",
            }}
          ></hr>
          
          {props.todos.map((todo) => {
            return (
              <TodoShow
                todo={todo}
                key={todo.sno}
                onDelete={props.onDelete}
                mode={props.mode}
                onEdit={props.onEdit}
                onComplete={props.onComplete}
              />
            );
          })}
          
        </>
      ) : (
        <h5 style={{ textAlign: "center" }}>No todos to display</h5>
      )}
      </AnimatePresence>
    </div>
  );
}
