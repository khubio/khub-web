/* eslint-disable operator-linebreak */
import { yupResolver } from '@hookform/resolvers/yup';
import { validateEditProfileSchema } from '@models/validateFormSchema';
import axiosConfig from '@services/axiosConfig';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { RiErrorWarningFill } from 'react-icons/ri';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Profile.scss';

const SUCCESS_EDIT_MESSAGE = 'Edit profile successfully!';
const FORM_EDIT = {
  data: [
    {
      type: 'id',
      title: 'User ID',
      placeholder: '',
      key: 'profile/password',
    },
    {
      type: 'firstName',
      title: 'First name',
      placeholder: '',
      key: 'profile/firstName',
    },
    {
      type: 'lastName',
      title: 'Last name',
      placeholder: '',
      key: 'profile/lastName',
    },
    // {
    //   type: 'phone',
    //   title: 'Phone number',
    //   placeholder: '',
    //   key: 'profile/phone',
    // },
  ],
  button: {
    title: 'Update now',
    target: '/registration',
    option: 'Login',
    message: 'Already have an account?',
  },
};
const Profile = () => {
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validateEditProfileSchema),
  });

  const handleSubmitForm = async (data) => {
    const { id, firstName, lastName } = data;
    const submitData = {
      firstName,
      lastName,
    };
    const targetUrl = `users/${id}`;
    setLoading(true);
    const requestBody = queryString.stringify(submitData);
    await axiosConfig
      .patch(targetUrl, requestBody)
      .then((res) => {
        if (res.code) {
          setIsSuccess(false);
          setIsError(true);
          setErrorMessage(res.message);
        } else {
          setIsError(false);
          setIsSuccess(true);
          window.location.reload();
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
          {FORM_EDIT.data.map((item) => {
            const { type, title } = item;
            const readOnly = type === 'id';
            const validateErrorMessage = errors[type]?.message;
            return (
              <div className="edit__form-item" key={item.key}>
                <label className="edit__form-item-label" htmlFor={type}>
                  {title}
                </label>
                {isEdit ? (
                  <input
                    className="edit__form-item-input"
                    type="text"
                    id={type}
                    {...register(type, { required: true })}
                    readOnly={readOnly}
                    defaultValue={user[type]}
                  />
                ) : (
                  <input
                    className="edit__form-item-input"
                    type="text"
                    id={type}
                    disabled
                    defaultValue={user[type]}
                  />
                )}
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
          </div>

          {isEdit ? (
            <button className="edit__form-button" type="submit">
              {loading ? 'Please wait...' : FORM_EDIT.button.title}
            </button>
          ) : (
            <button
              className="edit__form-button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(true);
              }}
            >
              <MdEdit className="edit__form-button-icon" />
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
