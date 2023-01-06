import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { verifyEmail } from '@services/auth.service';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleVerifyEmail = async () => {
    const token = queryString.parse(window.location.search)?.token;
    await verifyEmail(token)
      .then(() => {
        setIsError(false);
        setErrorMessage('');
        navigate('/auth/login');
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err.message);
      });
  };
  useEffect(() => {
    handleVerifyEmail();
  }, []);
  return <h5>{isError ? errorMessage : 'Verify email successfully'}</h5>;
};

export default VerifyEmail;
