import React, { useEffect, useState } from 'react';
import ConnectModal from './components/ConnectModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './utils/firebase.config';
import CreatePost from './components/CreatePost';
import { collection, doc, getDocs } from 'firebase/firestore';
import Post from './components/Post';

function App() {
	const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);


	// handleLogout est appelé au clique du button
	const handleLogout = async () => {
		// SignOut est une méthode de firebase qui permet la déconnexion
		// C'est auth qui sera signOut
		await signOut(auth);
	};

  // GET MESSAGES
  useEffect(() => {
		// getDocs permet de récupérer la données avec firebase
		// db est le nom de la db que firebase doit aller récupérer
		// posts est le nom de la collection à choisir
    // docs.map est la façon de faire pour récuprer la doc facilement
		getDocs(collection(db, 'posts')).then(res =>
			setPosts(res.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
		);
	}, []);
  console.log(posts);
	// onAuthStateChanged est une méthode de firebase qui surveille chaque changement d'authentification
	// onAuthStateChanged regarde dans auth si un utilisateur est présent
	onAuthStateChanged(auth, currentUser => {
		// currentUser est passé dans setUser et peut-être utilisé dans l'application
		// user aura les données de
		setUser(currentUser);
	});

	return (
		<div>
			<div className="app-header">
				{/* Si user existe, alors la div user-infos s'affichera */}
				{user && (
					<div className="user-infos">
						{/* span affiche la premiere lettre du prénom dans une bull d'ou le [0] */}
						<span>{user?.displayName[0]}</span>
						{/* h4 affiche le prénom de l'utilisateur */}
						{/* Les valeurs de user sont visibles dans la console */}
						<h4>{user?.displayName}</h4>
						<button onClick={() => handleLogout()}>Deconnexion</button>
					</div>
				)}
				{/* si user existe il affiche CreatePost, si non : page de connexion */}
				{user ? (
					<CreatePost uid={user.uid} displayName={user.displayName} />
				) : (
					<ConnectModal />
				)}
			</div>
			<div className="posts-container">
				{/* Si il y a un élement dans posts, alors ils s'affichent */}
				{posts.length > 0 &&
					posts
            // trie de la date la plus grande(recente) à la plus petite(ancienne)
            .sort((a,b) => b.date - a.date)
						// map de posts pour envoyer la data à Post
            // post est le tableau de data
            // user est l'utilisateur connecté, il sert à verifier si l'autheur du post est connecté
            // si oui il peux modifier ses messages
						.map(post => <Post post={post} key={post.id} user={user} />)}
			</div>
		</div>
	);
};

export default App;
