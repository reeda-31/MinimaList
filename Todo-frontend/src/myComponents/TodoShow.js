import React from "react";
import {ClockIcon,CalendarDaysIcon,TrashIcon,PencilSquareIcon} from "@heroicons/react/16/solid"
import { motion } from "framer-motion";



export default function TodoShow(props) {
  return (
    <motion.div
      key={props.todo.sno}
      initial={{ opacity: 0, x: -50 }}      
      animate={{ opacity: 1, x: 0 }}        
      exit={{ opacity: 0, x: 50 }}          
      transition={{ duration: 0.5 }}
    >
    <div className="mb-2 p-2" style={{backgroundColor:props.todo.isComplete?"#2ecc71":"#e57373",borderRadius:"5px",color:props.mode==="dark"?"black":"black"}}>
      <input
        type="checkbox"
        className="mr-1"
        id="exampleCheck1"
        checked={props.todo.isComplete}
        onChange={() => props.onComplete(props.todo)}
        style={{ width: "15px", height: "15px" }}
      />
      {props.todo.isComplete ? (
        <h4 style={{ textDecoration: "line-through", display: "inline" }}>
          Task: {props.todo.title}
        </h4>
      ) : (
        <h4 style={{ display: "inline" }}>Task: {props.todo.title}</h4>
      )}
      <div className="" style={{display:"inline-flex",float:"right"}}>
        <button
          className="btn btn-danger mb-2 mr-2 "
          onClick={() => {
            props.onDelete(props.todo);
          }}
        >
          <TrashIcon style={{height:"20px",width:"20px"}}/>
        </button>
        <button
          className="btn btn-dark mb-2 mr-2"
          data-toggle="modal"
          data-target="#exampleModal"
          disabled={props.todo.isComplete===true}
          onClick={() => {
            props.onEdit(props.todo);
          }}
        >
          <PencilSquareIcon style={{height:"20px",width:"20px"}}/>
        </button>
      </div>
      <h6 style={{marginLeft:"1.4rem",}}><ClockIcon style={{height:"20px",width:"20px"}}/>: {props.todo.time}</h6>
      <h6 style={{marginLeft:"1.4rem",}}><CalendarDaysIcon style={{height:"20px",width:"20px"}}/>: {props.todo.date}</h6>
    </div>
    </motion.div>
  );
}
