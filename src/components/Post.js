import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase.config';

const Post = ({ post, user }) => {
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState(null);
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

  const handleEdit = () => {
		setEdit(false);
		// EDIT

		// updateDoc permet d'update la data
		// db est le nom de la db que firebase doit aller chercher
		// posts est le nom de la collection à choisir
		// post.id est l'id du post à éditer
		// message (valeur de la db) sera modifier avec la valeur de editMessage
		// if (editMessage) = si editMessage contient quelque chose, alors l'edit se lancera
		if (editMessage) {
			updateDoc(doc(db, 'posts', post.id), { message: editMessage });
		}
	}

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
				{/* Si l'id de l'autheur du post est égal à l'uid de l'utilisateur connecté alors la div s'affichera */}
				{post.authorId === user?.uid && (
					<div className="right-part">
						{/* Quand le bouton editer sera cliquer, le state ira à l'inverse de ce qu'il est */}
						{/* Ca permet de revenir au message quand la partie edit est affiché */}
						<span onClick={() => setEdit(!edit)}>Editer</span>
						<span>Supprimer</span>
					</div>
				)}
				{/* Si edit est sur true, textearea s'affichera, sinon le message s'affichera */}
				{edit ? (
					<>
						<textarea
							autoFocus
							// Si editMessage est sur null post.message s'affichera
							// Si l'édition à commencer alors le message editer s'affichera
							defaultValue={editMessage ? editMessage : post.message}
							onChange={e => setEditMessage(e.target.value)}
						></textarea>
						{/* Au clique de la validation, la fonction handleEdit se lancera */}
						<button className="edit-btn" onClick={() => handleEdit()}>
							Modifier message
						</button>
					</>
				) : (
					// Si editMessage est sur null post.message s'affichera
					// Si l'édition à commencer alors le message editer s'affichera
					<p>{editMessage ? editMessage : post.message}</p>
				)}
			</div>
		</div>
	);
};

export default Post;
