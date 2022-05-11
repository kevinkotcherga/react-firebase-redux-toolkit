import React, { useRef } from 'react'
import { auth } from '../utils/firebase.config';

const SignUp = () => {
  // useRef() récupèrent les valeurs dans le formulaire
  const registerEmail = useRef();
  const registerPassword = useRef();

  // handleRegister est la fonction qui s'envoie quand submit est cliqué
  const handleRegister = (e) => {
    e.preventDefault();
    // try essaye d'effectuer la commande
    try {
      // auth et createUserWithEmailAndPassword créent un utilisateur avec Firebase
      auth.createUserWithEmailAndPassword(registerEmail.current.value, registerPassword.current.value)
      // Ajout du pseudo dans la data, qui ne peut pas être fait précédement avec firebase
      .then(async (userAuth) => {
        console.log(userAuth);
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
            <input type="text" placeholder='Pseudo' required />
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
