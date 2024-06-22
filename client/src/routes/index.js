import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import MinimalLayout from 'layout/MinimalLayout/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// view pages
const Courses = Loadable(lazy(() => import('pages/home/View')));
const Users = Loadable(lazy(() => import('pages/users/View')));

// add new pages
const CustomerForm = Loadable(lazy(() => import('pages/home/customer-form')));
const AddUserForm = Loadable(lazy(() => import('pages/users/Add-new')));

// update pages
const UpdateCourseForm = Loadable(lazy(() => import('pages/home/Update')));
const UpdateUserForm = Loadable(lazy(() => import('pages/users/Update')));

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { user } = useAuthContext();
  // const { permissions } = user || {};

  return (
    <Routes>
      <Route path="/" element={!user ? <Navigate to="/pages/login" replace /> : <Navigate to="/app/home" />} />
      <Route path="/login" element={<AuthLogin />} />

      <Route path="pages" element={<MinimalLayout />}>
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>

      {/* <Route path="*" element={<PageNotFound />} /> */}

      <Route path="app" element={<MainLayout />}>
        {/* <Route path="access-denied" element={<AccessDeniedPage />} /> */}
        <Route path="dashboard" element={<DashboardDefault />} />
        {/* <Route path="profile" element={<UserForm />} /> */}

        {/* Course section */}
        <Route path="home" element={<Outlet />}>
          <Route index element={<Courses />} />
          <Route path="add" element={<CustomerForm />} />
          <Route path="update" element={<UpdateCourseForm />} />
        </Route>

        {/* User section */}
        <Route path="users" element={<Outlet />}>
          <Route index element={<Users />} />
          <Route path="add" element={<AddUserForm />} />
          <Route path="update" element={<UpdateUserForm />} />
        </Route>

        {/* Sample page */}
        <Route path="sample-page" element={<SamplePage />} />

        {/* Utilities */}
        <Route path="typography" element={<Typography />} />
        <Route path="color" element={<Color />} />
        <Route path="shadow" element={<Shadow />} />
        <Route path="icons/ant" element={<AntIcons />} />
      </Route>
    </Routes>
  );
}
