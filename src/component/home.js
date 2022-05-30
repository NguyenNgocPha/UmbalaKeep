import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import CreateArea from "./CreateArea";
import Note from "./Note";
import { useNavigate } from "react-router-dom";

function Home(props) {
  let navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const [user, setUser] = useState([]);

  function UpdateNote() {
    const docRef = db
      .collection("users")
      .doc(user.uid)
      .collection("notes")
      .get()
      .then((query) => {
        var a = [];
        query.forEach((doc) => {
          const data1 = doc.data();
          data1.id = doc.id;
          a.push(data1);
        });
        setNotes(a);
      });
  }

  function addNote(newNote) {
    console.log(newNote);
    const myDoc = db
      .collection("users")
      .doc(user.uid)
      .collection("notes")
      .add(newNote)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        UpdateNote();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  function deleteNotes(id) {
    let small_animals = notes.filter((animal) => {
      return animal.id === id;
    });
    const myDocss = db
      .collection("users")
      .doc(user.uid)
      .collection("trash")
      .doc(small_animals[0].id)
      .set(small_animals[0])
      .then((docRef) => {
        console.log("ok");

        const myDelete = db
          .collection("users")
          .doc(user.uid)
          .collection("notes")
          .doc(small_animals[0].id)
          .delete()
          .then((docRef) => {
            console.log("Delete: ok");
            UpdateNote();
          })
          .catch((error) => {
            console.error("Error Delete document: ", error);
          });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    // setNotes((preValue) => {
    //   return [...preValue.filter((note, index) => index !== id)];
    // });
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const docRef = db
          .collection("users")
          .doc(user.uid)
          .collection("notes")
          .get()
          .then((query) => {
            var a = [];
            query.forEach((doc) => {
              const data1 = doc.data();
              data1.id = doc.id;
              a.push(data1);
            });
            setNotes(a);
          });
      }
    });

    return unsub;
  }, []);
  return (
    <div>
      <CreateArea onAdd={addNote} />

      {notes.map((note, index) => (
        <Note
          key={index}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNotes}
        />
      ))}
    </div>
  );
}

export default Home;
