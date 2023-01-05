import './GroupJoin.scss';
import { Link } from 'react-router-dom';

const GroupJoin = () => {
  return (
    <div className="group-join">
      <div className="group-join__container">
        <div className="group-join__close-tag" aria-hidden />
        <div className="group-join__logo">
          <img
            src={`${process.env.PUBLIC_URL}/images/khub_icon_3.png`}
            alt="logo"
          />
        </div>
        <button className="group-join__form-button" type="submit">Join group</button>
        <div className="group-join__form-option">
          <span>Go to home page</span>
          <Link
            className="group-join__form-option-link"
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

export default GroupJoin;
