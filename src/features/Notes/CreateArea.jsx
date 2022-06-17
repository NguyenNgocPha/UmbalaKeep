import React, { useState } from "react";
import "css/Home.css";
import { addNote } from "app/noteSlice";
import { useDispatch } from "react-redux";
import { IoMdColorPalette, IoIosAdd } from "react-icons/io";
import { AiOutlinePicture } from "react-icons/ai";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BiBellPlus, BiUndo, BiRedo } from "react-icons/bi";
import { RiInboxArchiveLine, RiMore2Fill } from "react-icons/ri";
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
              rows={isExpanded ? 1 : 1}
            >

            </textarea>
            <div class='textareaFooter' style={{ display: isExpanded ? 'flex' : 'none' }}>
              <BiBellPlus size={18} style={{ marginRight: 30 }} />
              <MdPersonAddAlt1 size={18} style={{ marginRight: 30 }} />
              <IoMdColorPalette size={18} style={{ marginRight: 30 }} />
              <AiOutlinePicture size={18} style={{ marginRight: 30 }} />
              <RiInboxArchiveLine size={18} style={{ marginRight: 30 }} />
              <RiMore2Fill size={18} style={{ marginRight: 30 }} />
              <BiUndo size={18} style={{ marginRight: 30 }} />
              <BiRedo size={18} style={{ marginRight: 30 }} />
              <button type="button" onClick={submitButton} style={{ marginRight: 30 }}>add

              </button>
              <button type="button" onClick={ExithandleExpanded} style={{ marginRight: 30 }}>close

              </button>
            </div>
          </p>
          {/* <div class='textareaFooter'>   
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default CreateArea;
