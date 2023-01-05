import { GOOGLE_ID } from '@configs';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateLoginSchema } from '@models/validateFormSchema';
import { login, loginWithGoogle } from '@services/auth.service';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.scss';

const SUCCESS_LOG_IN_MESSAGE = 'Login successfully';
const FORM_LOGIN = {
  data: [
    {
      type: 'email',
      title: 'Email',
      placeholder: 'god.mentor@kms-technology.com',
      key: 'login/email',
    },
    {
      type: 'password',
      title: 'Password',
      // placeholder: '',
      key: 'login/password',
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
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validateLoginSchema),
  });

  const handleSubmitForm = async (data) => {
    setLoading(true);
    const submitData = new URLSearchParams(data);
    login(submitData)
      .then((res) => {
        const { tokens, user } = res;
        setIsError(false);
        localStorage.setItem('tokens', JSON.stringify(tokens));
        localStorage.setItem('profile', JSON.stringify(user));
        setIsSuccess(true);
        setSuccessMessage(SUCCESS_LOG_IN_MESSAGE);
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsError(true);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  };

  const onSuccessGoogle = async (data) => {
    await loginWithGoogle(data.profileObj)
      .then((res) => {
        const { tokens, user } = res;
        setIsError(false);
        localStorage.setItem('tokens', JSON.stringify(tokens));
        localStorage.setItem('profile', JSON.stringify(user));
        setIsSuccess(true);
        reset();
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsError(true);
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  };
  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
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
              <div className="login__form-item" key={item.key}>
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

          <Link
            className="login__form-option-link login__form-forgot-password"
            to="/auth/forgot-password"
            aria-hidden
          >
            Forgot password?
          </Link>

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
                        src={`${process.env.PUBLIC_URL}/images/google_icon.png`}
                        alt="google"
                        aria-hidden
                      />
                    )}
                    onSuccess={onSuccessGoogle}
                    onFailure={onFailure}
                    cookiePolicy="single_host_origin"
                    isSignedIn={false}
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
