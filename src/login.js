import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userLog } from './redux/slice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const user = useSelector((state) => state.slice.user);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    localStorage.setItem('user', JSON.stringify(data.username));
    dispatch(userLog(JSON.parse(localStorage.getItem('user'))));
  };
  useEffect(() => {
    if (user) {
      history('/');
    }
  });
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-title">Вход</div>
        <label>
          <div className="input-title">Username</div>
          <input
            {...register('username', {
              required: 'Enter preferred name',
              maxLength: {
                value: 20,
                message: 'Maximum 20 characters',
              },
              minLength: {
                value: 3,
                message: 'Minimum 3 characters',
              },
            })}
            type="text"
            className="login-input"
            placeholder="Username"
          />
          <div className="input-error">
            {errors?.username && errors?.username?.message}
          </div>
        </label>
        <label>
          <div className="input-title">Password</div>
          <input
            {...register('password', {
              required: 'Enter password.',
              maxLength: {
                value: 40,
                message: 'Maximum 40 characters',
              },
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
            })}
            type="password"
            className="login-input"
            placeholder="Password"
          />
          <div className="input-error">
            {errors?.password && errors?.password?.message}
          </div>
        </label>
        <input className="submit" type="submit" value="Enter" />
      </form>
    </div>
  );
};

export default Login;
