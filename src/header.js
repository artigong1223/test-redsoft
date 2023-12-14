import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import { userLog } from './redux/slice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.slice.user);
  const exit = () => {
    localStorage.removeItem('user');
    dispatch(userLog(null));
  };
  return (
    <Fragment>
      <div className="header">
        <NavLink className="logo" to="/">
          Test
        </NavLink>
        <div>
          {user ? (
            <div className="user-logout">
              <div>{user}</div>
              <div style={{ cursor: 'pointer' }} onClick={exit}>
                Выйти
              </div>
            </div>
          ) : (
            <NavLink className="login-header" to="/login">
              Войти
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Header;
