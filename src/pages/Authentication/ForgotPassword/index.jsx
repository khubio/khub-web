import { yupResolver } from '@hookform/resolvers/yup';
import queryString from 'query-string';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { validateForgotPasswordSchema } from '@models/validateFormSchema';
import axiosConfig from '@services/axiosConfig';
import './ForgotPassword.scss';

const SUCCESS_MESSAGE = 'Email has been sent';
const FORM_FORGET_PASSWORD = {
  data: [
    {
      type: 'email',
      title: 'Enter your registered email',
      placeholder: 'god.mentor@kms-technology.com',
      key: 'forgot/email',
    },
  ],
  button: {
    title: 'Send',
    target: '/forgot-password',
    option: 'Login',
    message: 'Already have an account?',
  },
};

const ForgotPassword = ({ isOpen, setOpen }) => {
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
    resolver: yupResolver(validateForgotPasswordSchema),
  });

  const handleSubmitForm = async (data) => {
    const targetUrl = '/auth/forgot-password';
    setLoading(true);
    const submitData = queryString.stringify(data);
    await axiosConfig
      .post(targetUrl, submitData)
      .then(() => {
        setIsError(false);
        setIsSuccess(true);
        setSuccessMessage(SUCCESS_MESSAGE);
        reset();
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsError(true);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="forgot-password">
      <div className="forgot-password__container">
        <div
          className="forgot-password__close-tag"
          onClick={() => setOpen(!isOpen)}
          aria-hidden
        />
        <div className="forgot-password__logo">
          <img
            src={`${process.env.PUBLIC_URL}/images/khub_icon_3.png`}
            alt="logo"
          />
        </div>
        <form
          className="forgot-password__form"
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
        >
          {FORM_FORGET_PASSWORD.data.map((item) => {
            const { type, title, placeholder } = item;
            const validateErrorMessage = errors[type]?.message;
            return (
              <div className="forgot-password__form-item" key={item.key}>
                <label
                  className="forgot-password__form-item-label"
                  htmlFor={type}
                >
                  {title}
                </label>
                <input
                  className="forgot-password__form-item-input"
                  type={type === 'password' ? 'password' : 'text'}
                  id={type}
                  placeholder={placeholder}
                  onFocus={(e) => (e.target.placeholder = '')}
                  {...register(type, { required: true })}
                />
                {validateErrorMessage && (
                  <span className="forgot-password__form-item--error">
                    {validateErrorMessage}
                  </span>
                )}
              </div>
            );
          })}

          <div className="forgot-password__form-submit-result">
            {!loading && isError && (
              <>
                <RiErrorWarningFill className="forgot-password__form-submit-result-status--error" />
                <span className="forgot-password__form-submit-result-message--error">
                  {' '}
                  {errorMessage}
                </span>
              </>
            )}
            {!loading && isSuccess && (
              <>
                <IoCheckmarkDoneCircleSharp className="forgot-password__form-submit-result-status--success" />
                <span className="forgot-password__form-submit-result-message--success">
                  {' '}
                  {successMessage}
                </span>
              </>
            )}
          </div>

          <button className="forgot-password__form-button" type="submit">
            {loading ? 'Please wait...' : FORM_FORGET_PASSWORD.button.title}
          </button>

          <div className="forgot-password__form-option">
            <span>{FORM_FORGET_PASSWORD.button.message}</span>
            <Link
              className="forgot-password__form-option-link"
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

export default ForgotPassword;
