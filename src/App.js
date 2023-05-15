import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/not-found/NotFound';
import Login from './pages/login/Login';
import './App.css';
import RouterProtector from './models/RouteProtector';
import Dashboard from './pages/home/Dashboard';
import Users from './pages/users/Users';
import { useEffect } from 'react';
import User from './pages/users/user/User';
import Backups from './pages/backups/Backups';
import NewBackup from './pages/backups/new/NewBackup';
import Backup from './pages/backups/backup/Backup';
import Schedule from './pages/schedule/Schedule';
import ScheduleUser from './pages/schedule/scheduleUser/ScheduleUser';
import Log from './pages/log/Log';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: 
      <RouterProtector>
        <Dashboard />
      </RouterProtector>
    },
    {
      path: "/users",
      element: 
      <RouterProtector>
        <Users />
      </RouterProtector>
    },
    {
      path: "/users/:ID",
      element: 
      <RouterProtector>
        <User />
      </RouterProtector>
    },
    {
      path: "/backups",
      element: 
      <RouterProtector>
        <Backups />
      </RouterProtector>
    },
    {
      path: "/backups/new",
      element: 
      <RouterProtector>
        <NewBackup />
      </RouterProtector>
    },
    {
      path: "/backups/:ID",
      element: 
      <RouterProtector>
        <Backup />
      </RouterProtector>
    },
    {
      path: "/schedule",
      element: 
      <RouterProtector>
        <Schedule />
      </RouterProtector>
    },
    {
      path: "/schedule/:ID",
      element: 
      <RouterProtector>
        <ScheduleUser />
      </RouterProtector>
    },
    {
      path: "/log",
      element: 
      <RouterProtector>
        <Log />
      </RouterProtector>
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  useEffect(() => {
    if(window.innerWidth < 450)
    {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    } 
  });
 
  return (
    <>
      <div className='resolution'>
        <h2>This resolution is not supported!</h2>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
