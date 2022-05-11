import React, { useState } from 'react';

const ConnectModal = () => {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className='connect-modal'>
      <div className="header-btn">
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>
    </div>
  );
};

export default ConnectModal;
