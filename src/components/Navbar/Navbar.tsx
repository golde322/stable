import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex text-white text-lg p-2 select-none flex-wrap">
      <div className="font-bold flex justify-between w-full">
        <div>
          <Link to={'/'}>app name</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
