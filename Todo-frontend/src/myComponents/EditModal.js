import { useState, useEffect } from "react";

export default function EditModal(props) {
  const handleClose = () => {
    props.setShowModal(false);
  };
  const [newtitle, setnewTitle] = useState("");
  const [newtime, setnewTime] = useState("");

  useEffect(() => {
    if (props.currentTodo) {
      setnewTitle(props.currentTodo.title || "");
      setnewTime(props.currentTodo.time || "");
    }
  }, [props.currentTodo]);

  const onChangeHandleTitle = (e) => {
    setnewTitle(e.target.value);
  };

  const onChangeHandleTime = (e) => {
    setnewTime(e.target.value);
  };

  const updatemodal = (e) => {
    e.preventDefault();
    const updated = {
      ...props.currentTodo,
      title: newtitle,
      time: newtime,
    };
    props.onSave(updated);
  };

  
    return (
      <>
      <div
        className={`modal fade ${props.status ? "show" : ""}`}
        style={{ display: props.status ? "block" : "none" }}
        tabIndex="-1"
        id="exampleModal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{ backgroundColor: "#141414ff", color: "white" }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
                style={{ color: "whitesmoke" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={updatemodal}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" style={{fontWeight:"bold"}}>Enter Title</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={newtitle}
                    onChange={onChangeHandleTitle}
                    style={{ border: "1px solid grey" }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1"style={{fontWeight:"bold"}}>Enter Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={newtime}
                    onChange={onChangeHandleTime}
                    style={{ border: "1px solid grey" }}
                  />
                </div>
                <button type="submit" className="btn btn-outline-warning">
                  Edit Task
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

