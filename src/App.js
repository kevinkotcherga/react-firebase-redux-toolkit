import React, { useState } from 'react';
import ConnectModal from './components/ConnectModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './utils/firebase.config';
import CreatePost from './components/CreatePost';

function App() {
	const [user, setUser] = useState(null);

	// handleLogout est appelé au clique du button
	const handleLogout = async () => {
		// SignOut est une méthode de firebase qui permet la déconnexion
		// C'est auth qui sera signOut
		await signOut(auth);
	};

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
						<button onClick={() => handleLogout()}>Deconnéxion</button>
					</div>
				)}
				{/* si user existe il affiche CreatePost, si non : page de connexion */}
				{user ? <CreatePost /> : <ConnectModal />}
			</div>
			<div className="posts-container"></div>
		</div>
	);
};

export default App;
