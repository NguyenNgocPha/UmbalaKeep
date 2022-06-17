import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { auth, db } from "../../firebase-config";
import { TiEdit } from "react-icons/ti";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateNote } from "app/noteSlice";

import { IoMdColorPalette, IoIosAdd } from "react-icons/io";
import { AiOutlinePicture } from "react-icons/ai";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BiBellPlus, BiUndo, BiRedo } from "react-icons/bi";
import { RiInboxArchiveLine, RiMore2Fill } from "react-icons/ri";
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
    <div>
      <div className="note" onClick={() => handleShow()}>
        <h1>{notes.title}</h1>
        <p>{notes.content}</p>

        <button onClick={() => onDelete(notes.id)}>
          <MdDelete size={25} kl />
        </button>

        <button onClick={() => handleShow()}>
          <TiEdit size={25} />
        </button>
      </div>
      <Modal
        show={show}
        style={{ marginTop: 120, textAlign: "center" }}
        onHide={handleClose}
      >
        <Modal.Header style={{ height: 30, paddingTop: 20 }}>
          <Modal.Title>
            <input
              defaultValue={notes.title}
              type="text"
              placeholder="Title"
              name="title"
              style={{ border: "none", height: 30 }}
              onChange={handleChange}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: 50 }}>
          {" "}
          <p>
            <textarea
              defaultValue={notes.content}
              name="content"
              placeholder="Take a note..."
              style={{ width: "95%", border: "none" }}
            ></textarea>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <BiBellPlus size={20} style={{ marginRight: 30 }} />
            <MdPersonAddAlt1 size={20} style={{ marginRight: 30 }} />
            <IoMdColorPalette size={20} style={{ marginRight: 30 }} />
            <AiOutlinePicture size={20} style={{ marginRight: 30 }} />
            <RiInboxArchiveLine size={20} style={{ marginRight: 30 }} />
            <RiMore2Fill size={20} style={{ marginRight: 30 }} />
          </div>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateNote}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Note;
