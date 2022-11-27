import { HTTP_STATUS } from '@constants/HTTP_STATUS';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateLoginSchema } from '@models/validateFormSchema';
import { useEffect, useState } from 'react';
import axiosConfig from '@services/axiosConfig';
import { gapi } from 'gapi-script';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import { FACEBOOK_ID, GOOGLE_ID } from '@configs';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import './Login.scss';

const SUCCESS_LOG_IN_MESSAGE = 'Login successfully';
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
        if (res?.error || res.code === HTTP_STATUS.UNAUTHORIZED) {
          setIsSuccess(false);
          setIsError(true);
          setErrorMessage(res.message);
        } else {
          setIsError(false);
          setIsSuccess(true);
          setSuccessMessage(SUCCESS_LOG_IN_MESSAGE);
        }
      })
      .finally(() => setLoading(false));
  };

  const onSuccessGoogle = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
  };
  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };
  const onSuccessFacebook = (res) => {
    console.log('[Login Success] currentUser:', res);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        GOOGLE_ID,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

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
            src={`${process.env.PUBLIC_URL}/images/khub_icon_3.png`}
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

          <div className="login__third_party">
            <div className="login__third_party">
              <div className="login__third_party-title">Or sign in with</div>
              <div className="login__third_party-list">
                <div className="login__third_party-item">
                  <GoogleLogin
                    clientId={GOOGLE_ID}
                    buttonText="Login with Google"
                    render={(renderProps) => (
                      <img
                        className="login__third_party-item-button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        src={`${process.env.PUBLIC_URL}/images/google_icon.png`}
                        alt="google"
                        aria-hidden
                      />
                    )}
                    onSuccess={onSuccessGoogle}
                    onFailure={onFailure}
                    cookiePolicy="single_host_origin"
                    isSignedIn
                  />
                </div>
                <div className="login__third_party-item">
                  <FacebookLogin
                    appId={FACEBOOK_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={onSuccessFacebook}
                    render={(renderProps) => (
                      <img
                        className="login__third_party-item-button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        src={`${process.env.PUBLIC_URL}/images/facebook_icon.png`}
                        alt="facebook"
                        aria-hidden
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

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
        </form>
      </div>
    </div>
  );
};

export default Login;
