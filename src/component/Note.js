import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { auth, db } from "../firebase-config";
import { TiEdit } from "react-icons/ti";
import { Button, Modal } from "react-bootstrap";

function Note({ title, content, onDelete, id }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [note, setNote] = useState({
    title: title,
    content: content,
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

  function UpdateNote() {
    const myDocss = db
      .collection("users")
      .doc(user.uid)
      .collection("notes")
      .doc(id)
      .update(note)
      .then((docRef) => {
        console.log("okhhh");
        setShow(false);
        window.location.reload();
      })
      .catch((error) => {});
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
      <h1>{title}</h1>
      <p>{content}</p>

      <button onClick={() => onDelete(id)}>
        <MdDelete size={25} />
      </button>

      <button onClick={() => handleShow()}>
        <TiEdit size={25} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <input
              defaultValue={title}
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
              defaultValue={content}
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
