

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import '../App.css';
import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa';
import UserPickers from './Users/UserPickers';
import UsersPage from './Users/UsersPage';
import BookingsPage from './Bookings/BookingsPage';
import BookablesPage from './Bookables/BookablesPage';
import { UserProvider } from './Users/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className='App'>
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/bookings" className='btn btn-header'>
                    <FaCalendarAlt />
                    <span>Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/bookables" className='btn btn-header'>
                    <FaDoorOpen />
                    <span>Bookables</span>
                  </Link>
                </li>
                <li>
                  <Link to="/users" className='btn btn-header'>
                    <FaUsers />
                    <span>Users</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <UserPickers/>
          </header>

          <Routes>
            <Route path='/bookings' element={<BookingsPage />}></Route>
            <Route path='/bookables' element={<BookablesPage />}></Route>
            <Route path='/users' element={<UsersPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
