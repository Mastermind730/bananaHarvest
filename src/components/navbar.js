import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../slices/authSlice';

const Navbar = () => {
  const signinStatus = useSelector((state) => state.authSlice.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav style={{ backgroundColor: '#db0f62' }} className='navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        <div className='d-flex align-items-center'>
          <button
            className='navbar-toggler me-3'
            type='button'
            onClick={toggleNav}
            aria-controls='navbarSupportedContent'
            aria-expanded={isNavOpen ? 'true' : 'false'}
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <Link className='navbar-brand' to='/home'>
            Harvest Farm
          </Link>
        </div>

        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id='navbarSupportedContent'>
          <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
           

            {signinStatus && (
              <>
               <li className='nav-item'>
              <Link className='nav-link active text-center' to='/home'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active text-center' to='/manageUser'>
                Manage User
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active text-center' to='/manageFarmer'>
                Manage Farmer
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active text-center' to='/addCompany'>
                Manage Company
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active text-center' to='/manageLabor'>
                Manage Labor
              </Link>
            </li>
                <li className='nav-item'>
                  <Link className='nav-link active text-center' to='/my-homes'>
                    Farmers
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link active text-center' to='/wishlist'>
                    Company
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link active text-center' to='/host'>
                    Schedule Farmer
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link active text-center' to='/host'>
                    Manage Labour
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className='navbar-nav ms-auto'>
          <li className='nav-item'>
            {!signinStatus ? (
              <Link className='nav-link active text-center' to='/signin'>
                Signin
              </Link>
            ) : (
              <button
                className='btn btn-link nav-link'
                style={{ textDecoration: 'none', color: 'white' }}
                onClick={() => {
                  navigate('/signin');
                  dispatch(signout());
                }}
              >
                Signout
              </button>
            )}
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
