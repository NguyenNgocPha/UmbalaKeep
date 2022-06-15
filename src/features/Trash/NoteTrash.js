import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaTrashRestoreAlt } from "react-icons/fa";

function NoteTrash({ title, content, onRestores, id, onDelete }) {
  useEffect(() => {
    console.log(id);
  }, []);
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button type="button" onClick={() => onRestores(id)}>
        <FaTrashRestoreAlt size={19} color="red" />
      </button>
      <button type="button" onClick={() => onDelete(id)}>
        <MdDelete size={25} />
      </button>
    </div>
  );
}

export default NoteTrash;
