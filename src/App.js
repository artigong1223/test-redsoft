import { Route, Routes } from 'react-router-dom';

import Header from './header';
import Login from './login';
import Main from './main';
import Service from './service';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="browse" element={<Service />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
