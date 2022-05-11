import React, { useRef, useState } from 'react';
import { auth } from '../utils/firebase.config';

const SignUp = () => {
  // useRef() récupèrent les valeurs dans le formulaire
  const registerEmail = useRef();
  const registerPassword = useRef();
  const [displayName, setDisplayName] = useState('');

  // handleRegister est la fonction qui s'envoie quand submit est cliqué
  const handleRegister = (e) => {
    e.preventDefault();
    // try essaye d'effectuer la commande
    try {
      // auth et createUserWithEmailAndPassword créent un utilisateur avec Firebase
      auth.createUserWithEmailAndPassword(registerEmail.current.value, registerPassword.current.value)
      // then (la promesse) ne se déclenche qu'après l'éxecution de createUserWithEmailAndPassword
      // Ajout du pseudo dans la data, qui ne peut pas être fait précédement avec firebase
      .then(async (userAuth) => {
        // userAuth sont les valeurs email et password récupérés à qui sont ajoutés displayName
        await userAuth.user.updateProfile({
          displayName
        });
        console.log(userAuth);
        // window.location.reload rafraichit la page pour afficher la div de message
        window.location.reload();
      });
    // si try ne fonctionne pas, catch est effectué
    } catch(error) {
      console.log(error.message);
    };
    registerEmail('');
    registerPassword('');
  };

  return (
    <div>
      <div className="signup-container">
        <div className="signup">
          <h3>S'inscrire</h3>
          <form onSubmit={e => handleRegister(e)}>
            <input type="text" placeholder='Pseudo' required onChange={(e) => setDisplayName(e.target.value)}/>
            <input type="email" placeholder='Email' ref={registerEmail} required />
            <input type="password" placeholder='Mot de passe' ref={registerPassword} required/>
            <input type="submit" value="Valider l'inscription"/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
