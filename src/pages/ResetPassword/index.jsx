/* eslint-disable operator-linebreak */
import { yupResolver } from '@hookform/resolvers/yup';
import queryString from 'query-string';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { validateResetPasswordSchema } from '@models/validateFormSchema';
import axiosConfig from '@services/axiosConfig';
import './ResetPassword.scss';

const SUCCESS_MESSAGE = 'Your password has been changed successfully';
const FORM_FORGET_PASSWORD = {
  data: [
    {
      type: 'password',
      title: 'New Password',
      placeholder: '',
    },
    {
      type: 'confirmPassword',
      title: 'Confirm Password',
      placeholder: '',
    },
  ],
  button: {
    title: 'Send',
    target: '/reset-password',
    option: 'Login',
    message: 'Proceed to',
  },
};

const ResetPassword = ({ isOpen, setOpen }) => {
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
    resolver: yupResolver(validateResetPasswordSchema),
  });

  const handleSubmitForm = async (data) => {
    const { password } = data;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const targetUrl = `/auth/reset-password?token=${token}`;
    setLoading(true);
    const submitData = queryString.stringify({ password });
    await axiosConfig
      .post(targetUrl, submitData)
      .then((res) => {
        if (res.code) {
          setIsSuccess(false);
          setIsError(true);
          setErrorMessage(res.message);
        } else {
          setIsError(false);
          setIsSuccess(true);
          setSuccessMessage(SUCCESS_MESSAGE);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="reset-password">
      <div className="reset-password__container">
        <div
          className="reset-password__close-tag"
          onClick={() => setOpen(!isOpen)}
          aria-hidden
        />
        <div className="reset-password__logo">
          <img
            src={`${process.env.PUBLIC_URL}/images/khub_icon_3.png`}
            alt="logo"
          />
        </div>
        <form
          className="reset-password__form"
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
        >
          {FORM_FORGET_PASSWORD.data.map((item) => {
            const { type, title, placeholder } = item;
            const validateErrorMessage = errors[type]?.message;
            return (
              <div className="reset-password__form-item">
                <label
                  className="reset-password__form-item-label"
                  htmlFor={type}
                >
                  {title}
                </label>
                <input
                  className="reset-password__form-item-input"
                  type="password"
                  id={type}
                  placeholder={placeholder}
                  onFocus={(e) => (e.target.placeholder = '')}
                  {...register(type, { required: true })}
                />
                {validateErrorMessage && (
                  <span className="reset-password__form-item--error">
                    {validateErrorMessage}
                  </span>
                )}
              </div>
            );
          })}

          <div className="reset-password__form-submit-result">
            {!loading && isError && (
              <>
                <RiErrorWarningFill className="reset-password__form-submit-result-status--error" />
                <span className="reset-password__form-submit-result-message--error">
                  {' '}
                  {errorMessage}
                </span>
              </>
            )}
            {!loading && isSuccess && (
              <>
                <IoCheckmarkDoneCircleSharp className="reset-password__form-submit-result-status--success" />
                <span className="reset-password__form-submit-result-message--success">
                  {' '}
                  {successMessage}
                </span>
              </>
            )}
          </div>

          <button className="reset-password__form-button" type="submit">
            {loading ? 'Please wait...' : FORM_FORGET_PASSWORD.button.title}
          </button>

          <div className="reset-password__form-option">
            <span>{FORM_FORGET_PASSWORD.button.message}</span>
            <Link
              className="reset-password__form-option-link"
              to="/auth/login"
              aria-hidden
            >
              {FORM_FORGET_PASSWORD.button.option}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
