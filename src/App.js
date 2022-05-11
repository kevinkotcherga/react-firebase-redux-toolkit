import React, { useState } from 'react';
import ConnectModal from './components/ConnectModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase.config';

function App() {
	const [user, setUser] = useState(null);

	// onAuthStateChanged est une méthode de firebase qui surveille chaque changement d'authentification
	onAuthStateChanged(auth, currentUser => {
		setUser(currentUser);
	});

	return (
		<div>
			<div className="app-header">
				<ConnectModal />
			</div>
			<div className="posts-container"></div>
		</div>
	);
};

export default App;
