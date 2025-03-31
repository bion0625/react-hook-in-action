

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import '../App.css';
import { FaCalendarAlt, FaDoorOpen, FaSpinner, FaUsers } from 'react-icons/fa';
import UserPickers from './Users/UserPickers';
import { UserProvider } from './Users/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';

const UsersPage = lazy(() => import('./Users/UsersPage'));
const BookingsPage = lazy(() => import('./Bookings/BookingsPage'));
const BookablesPage = lazy(() => import('./Bookables/BookablesPage'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

            <Suspense fallback={<FaSpinner/>}>
              <Routes>
                <Route path='/bookings' element={<BookingsPage />}></Route>
                <Route path='/bookables/*' element={<BookablesPage />}></Route>
                <Route path='/users' element={<UsersPage />}></Route>
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
