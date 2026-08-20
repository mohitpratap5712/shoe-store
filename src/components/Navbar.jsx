import React from 'react';
import logoimage from '../assets/the_shoes_house-02.avif';
import { About } from './about';
import App from '../App';
import adminpanel from './adminpanel';
import { Link } from 'react-router-dom';

const Navbar = () => {
 
  return (
    <nav className="flex bg-white-700 h-16 justify-between items-center text-black text-xl p-2">
      <div className="flex items-center gap-2 mx-3">
        <span><img className='w-30' src={logoimage} alt="" /></span>
      </div>
      <ul className="flex gap-4 mx-4 list-none">
        <li className='text-red-500'>Sale</li>
        <Link to="/about"><li>About</li></Link>
       <Link to="/contact"><li>contact</li></Link>

       <Link to="/brands"> <li>Brands</li></Link>
        <li>About</li>
      </ul>
      <div className="items-Cart flex gap-2  ">
        <button><svg 
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="54"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg></button>
        <button><svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="54"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          <line x1="12" y1="9" x2="12" y2="15"></line>
          <line x1="9" y1="12" x2="15" y2="12"></line>
        </svg></button>
        <Link to="/login">  <button><svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="54"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21a8 8 0 0 0-16 0"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg> </button> </Link>
        
     </div>
    </nav>
  );
};

export default Navbar;