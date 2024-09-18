import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import ErrorPage from './pages/ErrorPage'
import Main from './conversations/Conversations'
import ProtectedRoutes from './layout/ProtectedRoutes'

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <ErrorPage />
    },
    {
      path: '/register',
      element: <Register />,
      errorElement: <ErrorPage />
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/settings',
          element: <Settings />,
          errorElement: <ErrorPage />
        },
        {
          path: '/chatroom',
          element: <Main />,
          errorElement: <ErrorPage />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}
