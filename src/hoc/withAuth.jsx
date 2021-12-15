import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function requireAuth(WrappedComponent) {
  const Authentication = (props) => {
    const navigate = useNavigate();
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        navigate('/');
      }
    });
    return <WrappedComponent {...props} />;
  };

  return Authentication;
}
