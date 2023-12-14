import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { asyncApi } from './api';

const Service = () => {
  const [items, setItems] = useState([]);
  const [drop, setDrop] = useState({});
  const [value, setValue] = useState([]);
  const user = useSelector((state) => state.slice.user);
  const history = useNavigate();
  useEffect(() => {
    if (!user) {
      history('/login');
    }
    asyncApi().then(setItems);
  }, [history, user]);
  const onItem = (item) => {
    setDrop((prev) => {
      const child = item.children
        ? item.children[0]?.key.split('-').fill(0).join('-')
        : null;
      if (child && child.length !== 1) prev[child] = item.children;
      for (let x in prev) {
        if (child?.length < x.length) delete prev[x];
      }
      return { ...prev };
    });
  };
  const itemChange = (e) => {
    setValue((g) => {
      g[0] = e.target.value;
      return [...g];
    });
  };
  const dropChange = (e, d) => {
    setValue((g) => {
      g[d.split('-').length - 1] = e.target.value;
      return [...g];
    });
  };
  const filterItems = (arr) => {
    return value[0] ? arr.filter((g) => g.name.indexOf(value[0]) >= 0) : arr;
  };
  const filterDrop = (arr, i) => {
    return value[i] ? arr.filter((g) => g.name.indexOf(value[i]) >= 0) : arr;
  };
  return (
    <div className="service">
      <div className="service-items">
        <input className="service-input" onChange={itemChange} />
        {filterItems(items).map((item) => (
          <div
            className="service-item"
            onClick={() => onItem(item)}
            key={item.key}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="service-drops">
        {Object.entries(drop).map((pair) => (
          <div key={pair[0]}>
            <input
              className="service-input"
              onChange={(e) => dropChange(e, pair[0])}
            />
            <div>
              {filterDrop(pair[1], pair[0].split('-').length - 1).map(
                (item) => (
                  <div
                    className="service-drop"
                    onClick={() => onItem(item)}
                    key={item.key}
                  >
                    {item.name}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
