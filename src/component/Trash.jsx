import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import CreateArea from "./CreateArea";
import NoteTrash from "./NoteTrash";
function Trash(props) {
  const [notes, setNotes] = useState([]);

  const [user, setUser] = useState([]);
 

  function restores(id) {
    let small_animals = notes.filter((animal) => {
      return animal.id === id;
    });
    const myDocss = db
      .collection("users")
      .doc(user.uid)
      .collection("notes")
      .doc(small_animals[0].id)
      .set(small_animals[0])
      .then((docRef) => {
        console.log("ok");

        const myDelete = db
          .collection("users")
          .doc(user.uid)
          .collection("trash")
          .doc(small_animals[0].id)
          .delete()
          .then((docRef) => {
            console.log("Delete: ok"+small_animals[0].id);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error Delete document: ", error);
          });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

   
  }

  function deleteNote(id) {
    let small_animals = notes.filter((animal) => {
      return animal.id === id;
    });
    const myDocss = db
      .collection("users")
      .doc(user.uid)
      .collection("trash")
      .doc(small_animals[0].id)
      .delete()
      .then((docRef) => {
        console.log("ok");
        window.location.reload();
        
      })
      .catch((error) => {
      });

   
  }


  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const docRef = db
          .collection("users")
          .doc(user.uid)
          .collection("trash")
          .get()
          .then((query) => {
            var a=[];
            query.forEach((doc) => {
              const data1 = doc.data();
              data1.id = doc.id;
              a.push(data1)
             
            });
            setNotes(a);
          });
      }
    });

    return unsub;
  }, []);
  return (
    <div>
     
      {notes.map((note, index) => (
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
