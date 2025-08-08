import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import ErrorPage from './pages/ErrorPage'
import Main from './conversations/Conversations'
import ProtectedRoutes from './layout/ProtectedRoutes'

import Header from './layout/Header'
import StandardRoutes from './layout/StandardRoutes'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <StandardRoutes />,
          children: [
            {
              path: '/',
              element: <Login />
            },
            {
              path: '/register',
              element: <Register />
            }
          ]
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: '/settings',
              element: <Settings />
            },
            {
              path: '/chatroom',
              element: <Main />
            }
          ]
        }
      ]
    }
  ])

  return (
    <div id='app'>
      <RouterProvider router={router} />
    </div>
  )
}
