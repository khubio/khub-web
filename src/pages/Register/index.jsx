import { yupResolver } from '@hookform/resolvers/yup';
import queryString from 'query-string';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { sendVerifyEmail } from '@utils/mailer';
import { validateSignUpSchema } from '@models/validateFormSchema';
import axiosConfig from '@services/axiosConfig';
import './Register.scss';

const SUCCESS_SIGN_UP_MESSAGE = 'Success! Please confirm your account in email!';
const FORM_SIGN_UP = {
  data: [
    {
      type: 'firstName',
      title: 'First name',
      placeholder: 'Nguyen',
    },
    {
      type: 'lastName',
      title: 'Last name',
      placeholder: 'Trinh',
    },
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
    title: 'Sign up',
    target: '/registration',
    option: 'Login',
    message: 'Already have an account?',
  },
};

const Register = ({ isOpen, setOpen }) => {
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
    resolver: yupResolver(validateSignUpSchema),
  });

  const handleSubmitForm = async (data) => {
    const targetUrl = '/auth/register';
    setLoading(true);
    const submitData = queryString.stringify(data);
    await axiosConfig
      .post(targetUrl, submitData)
      .then((res) => {
        if (res?.error) {
          setIsSuccess(false);
          setIsError(true);
          setErrorMessage(res.message);
        } else {
          setIsError(false);
          setIsSuccess(true);
          setSuccessMessage(SUCCESS_SIGN_UP_MESSAGE);
          sendVerifyEmail(data);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="register">
      <div className="register__container">
        <div
          className="register__close-tag"
          onClick={() => setOpen(!isOpen)}
          aria-hidden
        />
        <div className="register__logo">
          <img
            src={`${process.env.PUBLIC_URL}/images/khub_icon_2.png`}
            alt="logo"
          />
        </div>
        <form
          className="register__form"
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
        >
          {FORM_SIGN_UP.data.map((item) => {
            const { type, title, placeholder } = item;
            const validateErrorMessage = errors[type]?.message;
            return (
              <div className="register__form-item">
                <label className="register__form-item-label" htmlFor={type}>
                  {title}
                </label>
                <input
                  className="register__form-item-input"
                  type={type === 'password' ? 'password' : 'text'}
                  id={type}
                  placeholder={placeholder}
                  onFocus={(e) => (e.target.placeholder = '')}
                  {...register(type, { required: true })}
                />
                {validateErrorMessage && (
                  <span className="register__form-item--error">
                    {validateErrorMessage}
                  </span>
                )}
              </div>
            );
          })}

          <div className="register__form-submit-result">
            {isError && (
              <>
                <RiErrorWarningFill className="register__form-submit-result-status--error" />
                <span className="register__form-submit-result-message--error">
                  {' '}
                  {errorMessage}
                </span>
              </>
            )}
            {isSuccess && (
              <>
                <IoCheckmarkDoneCircleSharp className="register__form-submit-result-status--success" />
                <span className="register__form-submit-result-message--success">
                  {' '}
                  {successMessage}
                </span>
              </>
            )}
          </div>

          <button className="register__form-button" type="submit">
            {loading ? 'Please wait...' : FORM_SIGN_UP.button.title}
          </button>

          <div className="register__form-option">
            <span>{FORM_SIGN_UP.button.message}</span>
            <Link
              className="register__form-option-link"
              to="/auth/login"
              aria-hidden
            >
              {FORM_SIGN_UP.button.option}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
