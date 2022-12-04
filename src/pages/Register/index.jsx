/* eslint-disable operator-linebreak */
import { yupResolver } from '@hookform/resolvers/yup';
import queryString from 'query-string';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { validateSignUpSchema } from '@models/validateFormSchema';
import { register as registerHandle } from '@services/auth.service';
import './Register.scss';

const SUCCESS_SIGN_UP_MESSAGE =
  'Success! Please confirm your account in email!';
const FORM_SIGN_UP = {
  data: [
    {
      type: 'firstName',
      title: 'First name',
      placeholder: 'Nguyen',
      key: 'signUp/firstName',
    },
    {
      type: 'lastName',
      title: 'Last name',
      placeholder: 'Trinh',
      key: 'signUp/lastName',
    },
    {
      type: 'email',
      title: 'Email',
      placeholder: 'god.mentor@kms-technology.com',
      key: 'signUp/email',
    },
    {
      type: 'password',
      title: 'Password',
      placeholder: '',
      key: 'signUp/password',
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
    setLoading(true);
    const submitData = queryString.stringify(data);
    await registerHandle(submitData)
      .then((res) => {
        if (res.code) {
          setIsSuccess(false);
          setIsError(true);
          setErrorMessage(res.message);
        } else {
          setIsError(false);
          setIsSuccess(true);
          reset();
          setSuccessMessage(SUCCESS_SIGN_UP_MESSAGE);
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
            src={`${process.env.PUBLIC_URL}/images/khub_icon_3.png`}
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
              <div className="register__form-item" key={item.key}>
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
            {!loading && isError && (
              <>
                <RiErrorWarningFill className="register__form-submit-result-status--error" />
                <span className="register__form-submit-result-message--error">
                  {' '}
                  {errorMessage}
                </span>
              </>
            )}
            {!loading && isSuccess && (
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
