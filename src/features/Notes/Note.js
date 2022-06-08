import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { auth, db } from "../../firebase-config";
import { TiEdit } from "react-icons/ti";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateNote } from "app/noteSlice";
function Note({ notes, onDelete }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [note, setNote] = useState({
    title: notes.title,
    content: notes.content,
    id: notes.id,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  async function UpdateNote() {
    const action = updateNote(note);
    const actionResult = await dispatch(action);
    setShow(false);
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return unsub;
  }, []);
  return (
    <div className="note">
      <h1>{notes.title}</h1>
      <p>{notes.content}</p>

      <button onClick={() => onDelete(notes.id)}>
        <MdDelete size={25} />
      </button>

      <button onClick={() => handleShow()}>
        <TiEdit size={25} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <input
              defaultValue={notes.title}
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <p>
            <textarea
              defaultValue={notes.content}
              name="content"
              placeholder="Take a note..."
              onChange={handleChange}
              style={{ width: "95%" }}
            ></textarea>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateNote}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Note;
