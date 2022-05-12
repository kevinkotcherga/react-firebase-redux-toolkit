import React, { useRef } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../utils/firebase.config';
import CommentCard from './CommentCard';

const CommentPost = ({ post, user }) => {
  const answerContent = useRef();

  const handleComment = (e) => {
    e.preventDefault();

    let data = [];
    // Si la data comments est vide alors le commentaire s'ajoutera à la data
    if (post.comments === null) {
      data = [
        {
          commentAuthor: user.displayName,
          text: answerContent.current.value
        },
      ];
      // Si le data n'est pas vide alors la data de post.comments est récupéré (avec ...)
    } else {
      data = [
        ...post.comments,
        // et le nouveau message est ajouté à la suite
        {
          commentAuthor: user.displayName,
          text: answerContent.current.value
        },
      ];
    };

    // UPDATE LA DATA POUR METTRE A JOUR LES COMMENTAIRES

    // updateDoc permet d'update la data
    // db est le nom de la db que firebase doit aller chercher
    // posts est le nom de la collection à choisir
    // post.id est le post à éditer
    // comments: data ici c'est comments qui prendra la valeur de data dans la db
    updateDoc(doc(db, 'posts', post.id), { comments: data });
    answerContent.current.value = '';
  };

  // REPRENDRE LA VIDEO A 55:44

  return (
    <div className="comment-container">
      <h5 className="comment-title">Commentaires</h5>
      {/* && veux dire est-ce que c'est true, si oui affiche la suite */}
      {post.comments && post.comments.map((comment, index) => (
        <CommentCard comment={comment} key={index}/>
      ))}

      {/* Si l'utilisateur est connecté alors il peut poster un commentaire
      sinon un message s'affichera */}
      {user ? (
        <form onSubmit={(e) => handleComment(e)}>
          <textarea placeholder='Envoyer un commentaire' ref={answerContent}></textarea>
          <input type="submit" value="Envoyer" />
        </form>
      ) : (
        <p>Vous devez être connecté pour poster un commentaire</p>
      )}
    </div>
  );
};

export default CommentPost;
