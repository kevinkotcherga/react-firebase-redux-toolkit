import React, { useRef } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../utils/firebase.config';

const CreatePost = ({ uid, displayName }) => {
  const message = useRef();

  const handlePost = async (e) => {
    e.preventDefault();

    // data récupère les informations pour les envoyers à la db
    const data = {
      author: displayName,
      authorId: uid,
      message: message.current.value,
      comments: null,
      date: Date.now()
    }
    // Envoyer la data à firebase
    // db est le nom de la db que firebase doit aller chercher
    // posts est le nom de la collection à choisir
    // data est ce qui sera envoyé dans la db
    await addDoc(collection(db, "posts"), data);
    message.current.value = '';
  }

  return (
    <div className="new-post-modal">
      <form onSubmit={(e) => handlePost(e)}>
        <textarea placeholder='Message...' ref={message}></textarea>
        <input type="submit" value="Envoyer"/>
      </form>
    </div>
  );
};

export default CreatePost;
