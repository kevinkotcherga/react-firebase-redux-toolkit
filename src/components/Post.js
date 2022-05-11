import React from 'react';

const Post = ({ post }) => {
  // dateFormateur formatera la data
  const dateFormater = (date) => {
		// Math.floor arrondie la date à l'inferieur
		// new Date() est la date du jour
		// qui est soustrait à new Date(date)
		// new Date(date) transforme la date non exploitable en une date exploitable
		// le resultat obtenue est en milisecondes il faut donc diviser par (1000 * 3600)
    // 1000 ramène en secondes, 3600 en heures et 24 en jours
		let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));
    // Si c'est publié il y a 0 jours il affichera aujourd'hui
    if (days === 0){
      return "aujourd'hui";
    } else if (days === 1) {
      return "il y a 1 jour"
    } else {
      return "il y a " + days + " jours"
    }
	};

	return (
		<div className="post">
      <div className="post-header">
        <div className="left-part">
          <div className="title">
            <span>{post.author[0]}</span>
            <h2>{post.author}</h2>
          </div>
          <h5>Posté {dateFormater(post.date)}</h5>
        </div>
      </div>
    </div>
	);
};

export default Post;
