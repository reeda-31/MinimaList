// import React from "react";
import React, { useState } from 'react'
import {PlusIcon} from "@heroicons/react/16/solid"

export default function Addtodo(props) {
const [title,setTitle]=useState("");
const [time,setTime]=useState("");

const onChangeHandleTitle=(e)=>
{
  setTitle (e.target.value)
}

const onChangeHandleTime=(e)=>
{
  setTime (e.target.value)
}

const submit=(e)=>
{
  e.preventDefault();
  props.additem(title, time);
  setTitle ("")
  setTime ("")
}

  const mystylediv = {
    border: props.mode==="light"?"1px solid black":"1px solid grey",
    padding:"1rem",
    borderRadius:"10px",
    backgroundColor: props.mode==="light"?"#f6f6f6ff":"#27292cff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)"
  };

  return (
    <div className='container mb-3 glass' style={{ ...mystylediv, maxWidth: "20rem" }}>
      <h2 className='text-center'>Add your task</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Enter Title</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={title}
            onChange={onChangeHandleTitle}
            style={{border:"1px solid grey"}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Enter Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={onChangeHandleTime}
            style={{border:"1px solid grey"}}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Task<PlusIcon style={{height:"20px",width:"20px"}}/>
        </button>
      </form>
    </div>
  );
}
