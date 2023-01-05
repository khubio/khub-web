import './NotFound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__close-tag" aria-hidden />
        <div className="not-found__logo">
          <img
            src={`${process.env.PUBLIC_URL}/images/khub_icon_3.png`}
            alt="logo"
          />
        </div>
        <h2>PAGE NOT FOUND</h2>
        <div className="not-found__form-option">
          <span>Go to home page</span>
          <Link
            className="not-found__form-option-link"
            to="/auth/login"
            aria-hidden
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
