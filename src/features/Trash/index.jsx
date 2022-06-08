import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";

import NoteTrash from "./NoteTrash";
import { useDispatch,useSelector } from "react-redux";
import { RehibiliTrash } from "app/noteSlice";
import {deleteTrash}from "app/trashSlice";

function Trash(props) {

  const dispatch = useDispatch();
  const trash = useSelector((state) => state.trash.current);


  async function restores(id) {
    let small_animals = trash.filter((animal) => {
      return animal.id === id;
    });
    const action1 = RehibiliTrash(small_animals[0]);
    const actionResult1 = await dispatch(action1);

    const action2 = deleteTrash(id);
    const actionResult2 = await dispatch(action2);

  }

 async function deleteNote(id) {
        const action = deleteTrash(id);
    const actionResult2 = await dispatch(action);
    
  }


  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {   
      }
    });

    return unsub;
  }, []);
  return (
    <div>
     
      {trash.map((note, index) => (
        <NoteTrash 
          key={index}
          id={note.id}
          title={note.title}
          content={note.content}
          onRestores={restores}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
}

export default Trash;
