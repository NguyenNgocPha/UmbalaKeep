import React, { useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import CreateArea from "./CreateArea";
import Note from "./Note";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteNote } from "app/noteSlice";
import { addTrash } from "app/trashSlice";
function Home(props) {
  const dispatch = useDispatch();

  const photos = useSelector((state) => state.note.current);

  async function deleteNotes(id) {
    const small_animals = photos.filter((animal) => {
      return animal.id === id;
    });
    const action1 = addTrash(small_animals[0]);
    const actionResult1 = await dispatch(action1);

    const action2 = deleteNote(id);
    const actionResult2 = await dispatch(action2);
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
      }
    });

    return unsub;
  }, []);
  return (
    <div>
      <CreateArea />
      {photos.map((note, index) => (
        <Note key={index} notes={note} onDelete={deleteNotes} />
      ))}
    </div>
  );
}

export default Home;
