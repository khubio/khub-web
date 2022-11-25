import React, { useState, ReactElement } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FieldValues } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axiosConfig from '@services/axiosConfig';
import { validateLoginSchema } from '@models/validateFormSchema';
import './Login.scss';

const SUCCESS_LOG_IN_MESSAGE = 'Login successfully';
const ERROR_LOG_IN_MESSAGE = 'Email or password is incorrect';
const FORM_LOGIN = {
  data: [
    {
      type: 'email',
      title: 'Email',
      placeholder: 'god.mentor@kms-technology.com',
    },
    {
      type: 'password',
      title: 'Password',
      placeholder: '',
    },
  ],
  button: {
    title: 'Login',
    target: '/login',
    option: 'Sign up',
    message: 'Don’t have an account?',
  },
};

const Login = ({ isOpen, setOpen }) => {
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
    resolver: yupResolver(validateLoginSchema),
  });

  const handleSubmitForm = async (data) => {
    const targetUrl = 'auth/login';
    setLoading(true);
    const submitData = new URLSearchParams(data);
    await axiosConfig
      .post(targetUrl, submitData)
      .then((res) => {
        if (res?.error) {
          setIsSuccess(false);
          setIsError(true);
          setErrorMessage(ERROR_LOG_IN_MESSAGE || res.message);
        } else {
          setIsError(false);
          setIsSuccess(true);
          setSuccessMessage(SUCCESS_LOG_IN_MESSAGE);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="login">
      <div className="login__container">
        <div
          className="login__close-tag"
          onClick={() => setOpen(!isOpen)}
          aria-hidden
        />
        <div className="login__logo">
          <img
            src={`${process.env.PUBLIC_URL}/images/khub_icon_2.png`}
            alt="logo"
          />
        </div>
        <form
          className="login__form"
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
        >
          {FORM_LOGIN.data.map((item) => {
            const { type, title, placeholder } = item;
            const validateErrorMessage = errors[type]?.message;
            return (
              <div className="login__form-item">
                <label className="login__form-item-label" htmlFor={type}>
                  {title}
                </label>
                <input
                  className="login__form-item-input"
                  type={type === 'password' ? 'password' : 'text'}
                  id={type}
                  placeholder={placeholder}
                  onFocus={(e) => (e.target.placeholder = '')}
                  {...register(type, { required: true })}
                />
                {validateErrorMessage && (
                  <span className="login__form-item--error">
                    {validateErrorMessage}
                  </span>
                )}
              </div>
            );
          })}

          <div className="login__form-submit-result">
            {isError && (
              <>
                <RiErrorWarningFill className="login__form-submit-result-status--error" />
                <span className="login__form-submit-result-message--error">
                  {' '}
                  {errorMessage}
                </span>
              </>
            )}
            {isSuccess && (
              <>
                <IoCheckmarkDoneCircleSharp className="login__form-submit-result-status--success" />
                <span className="login__form-submit-result-message--success">
                  {' '}
                  {successMessage}
                </span>
              </>
            )}
          </div>

          <button className="login__form-button" type="submit">
            {loading ? 'Please wait...' : FORM_LOGIN.button.title}
          </button>

          <div className="login__form-option">
            <span>{FORM_LOGIN.button.message}</span>
            <Link
              className="login__form-option-link"
              to="/auth/sign-up"
              aria-hidden
            >
              {FORM_LOGIN.button.option}
            </Link>
          </div>
          <div className="login__third_party">
            <div className="login__third_party">
              <div className="login__third_party-title">Or</div>
              <div className="login__third_party-list">
                <div className="login__third_party-item">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/google_icon.png`}
                    alt="google"
                  />
                </div>
                <div className="login__third_party-item">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/facebook_icon.png`}
                    alt="facebook"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
