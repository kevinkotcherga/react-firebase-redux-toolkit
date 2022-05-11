import React, { useRef } from 'react';

const CommentPost = ({ post, user }) => {
  const answerContent = useRef();

  const handleComment = (e) => {
    e.preventDefault();
    console.log(answerContent.current.value);
  };

  // REPRENDRE LA VIDEO A 55:44

  return (
    <div className="comment-container">
      <h5 className="comment-title">Commentaires</h5>
      {/* MAP */}

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
