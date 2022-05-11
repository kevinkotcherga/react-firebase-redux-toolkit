import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db } from '../utils/firebase.config';

const Delete = ({ postId }) => {
  const handleDelete = () => {
    // DELETE

    // Supprimer de la data à firebase
    // db est le nom de la db que firebase doit aller chercher
    // posts est le nom de la collection à choisir
    // postId est l'id récupéré depuis Post qui devra être supprimé
    deleteDoc(doc(db, "posts", postId))
  };

  return (
    <span className="delete" onClick={e => handleDelete()}>
      <i className="fa-solid fa-trash-can"></i>
    </span>
  );
};

export default Delete;
