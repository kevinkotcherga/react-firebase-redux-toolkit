import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../utils/firebase.config";

const Login = () => {
  // useRef() récupèrent les valeurs dans le formulaire
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);

  // loginSubmit est la fonction qui s'active à la validation du formulaire
  const loginSubmit = async (e) => {
    e.preventDefault();
    // try essaye d'effectuer la commande
    try {
      const user = await signInWithEmailAndPassword(
        // auth pour envoyer les données à firebase
        auth,
        // email pour récupérer l'email
        loginEmail.current.value,
        // email pour récupérer le mot de passe
        loginPassword.current.value
      );
      console.log(user);
    // si try ne fonctionne pas, catch est effectué
    } catch(error) {
      console.log(error.message);
      setError(true);
    };
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Se connecter</h3>
        <form className='form-login' onSubmit={e => loginSubmit(e)}>
          <input type="email" placeholder='Email' ref={loginEmail}/>
          <input type="password" placeholder='Mot de passe' ref={loginPassword}/>
          <input type="submit" value='Se connecter'/>
          <span>{error && "Le mail ou le mot de passe ne correspondent pas"}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
