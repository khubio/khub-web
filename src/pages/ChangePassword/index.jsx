/* eslint-disable operator-linebreak */
import { yupResolver } from '@hookform/resolvers/yup';
import { validateChangePasswordSchema } from '@models/validateFormSchema';
import axiosConfig from '@services/axiosConfig';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { RiErrorWarningFill } from 'react-icons/ri';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { changePassword } from '@services/user.service';
import './ChangePassword.scss';

const SUCCESS_MESSAGE = 'Change password successfully!';
const FORM_CHANGE_PASSWORD = {
  data: [
    {
      type: 'oldPassword',
      title: 'Enter your old password',
      placeholder: '',
      key: 'change/oldPassword',
    },
    {
      type: 'newPassword',
      title: 'Enter your new password',
      placeholder: '',
      key: 'change/newPassword',
    },
    {
      type: 'confirmPassword',
      title: 'Confirm your new password',
      placeholder: '',
      key: 'change/confirmPassword',
    },
  ],
  button: {
    title: 'Change',
    target: '/change-password',
    option: 'Login',
    message: 'Already have an account?',
  },
};
const ChangePassword = () => {
  const userId = JSON.parse(localStorage.getItem('profile')).id;
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validateChangePasswordSchema),
  });

  const handleSubmitForm = async (data) => {
    const { oldPassword, newPassword } = data;
    const submitData = {
      oldPassword,
      newPassword,
    };
    setLoading(true);
    const requestBody = queryString.stringify(submitData);
    await changePassword(userId, requestBody)
      .then((res) => {
        if (res.code) {
          setIsSuccess(false);
          setIsError(true);
          setErrorMessage(res.message);
        } else {
          setIsError(false);
          setIsSuccess(true);
          setSuccessMessage(SUCCESS_MESSAGE);
          window.location.href = '/profile';
        }
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const fetchUser = async () => {
      const userID = JSON.parse(localStorage.getItem('profile')).id;
      const targetUrl = `users/${userID}`;
      await axiosConfig
        .get(targetUrl)
        .then((res) => {
          if (res.code) {
            setIsSuccess(false);
            setIsError(true);
            setErrorMessage(res.message);
          } else {
            setUser(res);
          }
        })
        .finally(() => setLoading(false));
    };
    fetchUser();
  }, []);
  return (
    <div className="edit">
      <div className="edit__container">
        <div className="edit__image">
          <img
            src={`${process.env.PUBLIC_URL}/images/avatar.png`}
            alt="avatar"
          />
        </div>

        <form
          className="edit__form"
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
        >
          {FORM_CHANGE_PASSWORD.data.map((item) => {
            const { type, title } = item;
            const readOnly = type === 'id';
            const validateErrorMessage = errors[type]?.message;
            return (
              <div className="edit__form-item" key={item.key}>
                <label className="edit__form-item-label" htmlFor={type}>
                  {title}
                </label>
                <input
                  className="edit__form-item-input"
                  type="password"
                  id={type}
                  {...register(type, { required: true })}
                  readOnly={readOnly}
                  defaultValue={user[type]}
                />
                {validateErrorMessage && (
                  <span className="edit__form-item--error">
                    {validateErrorMessage}
                  </span>
                )}
              </div>
            );
          })}

          <div className="edit__form-submit-result">
            {!loading && isError && (
              <>
                <RiErrorWarningFill className="edit__form-submit-result-status--error" />
                <span className="edit__form-submit-result-message--error">
                  {' '}
                  {errorMessage}
                </span>
              </>
            )}
            {!loading && isSuccess && (
              <>
                <IoCheckmarkDoneCircleSharp className="edit__form-submit-result-status--success" />
                <span className="edit__form-submit-result-message--success">
                  {' '}
                  {successMessage}
                </span>
              </>
            )}
          </div>

          <button className="edit__form-button" type="submit">
            {loading ? 'Please wait...' : FORM_CHANGE_PASSWORD.button.title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
