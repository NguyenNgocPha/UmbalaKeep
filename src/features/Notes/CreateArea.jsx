import React, { useState } from "react";
import "css/Home.css";
import { IoIosAdd } from "react-icons/io";
import { addNote } from "app/noteSlice";
import { useDispatch } from "react-redux";

function CreateArea({ }) {
  const [isExpanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: "",
    content: "",
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
  function handleExpanded() {
    setExpanded(true);
  }
  function ExithandleExpanded() {
    setExpanded(false);
  }

  async function submitButton(event) {
    if (note.title != "" || note.content != "") {
      const action = addNote(note);
      const actionResult = await dispatch(action);
      setNote({
        title: "",
        content: "",
      });
      event.preventDefault();
      ExithandleExpanded();
    } else {
      alert("fields cannot be left blank")
    }
  }

  return (
    <div>
      <form >
        <div class='formsize'>
          {isExpanded && (
            <input
              value={note.title}
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          )}
          <p>
            <textarea
              value={note.content}
              onClick={handleExpanded}
              name="content"
              placeholder="Take a note..."
              onChange={handleChange}
              rows={isExpanded ? 3 : 1}
            ></textarea>
          </p>
          <button type="button" onClick={submitButton}>
            <IoIosAdd size={35} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateArea;
