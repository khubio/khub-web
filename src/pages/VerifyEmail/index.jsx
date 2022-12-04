import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { verifyEmail } from '@services/auth.service';

const VerifyEmail = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleVerifyEmail = async () => {
    const token = queryString.parse(window.location.search)?.token;
    await verifyEmail(token).then((res) => {
      if (res.code) {
        setIsError(true);
        setErrorMessage(res.message);
      } else {
        setIsError(false);
        setErrorMessage('');
        window.location.href = '/auth/login';
      }
    });
  };
  useEffect(() => {
    handleVerifyEmail();
  }, []);
  return <h5>{isError ? errorMessage : 'Verify email successfully'}</h5>;
};

export default VerifyEmail;
