import { NavLink } from 'react-router-dom';

const Main = () => {
  return (
    <div className="main">
      <NavLink className="service-link" to="/browse">
        Service
      </NavLink>
    </div>
  );
};

export default Main;
