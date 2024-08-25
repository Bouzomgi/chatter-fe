import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Settings from './Settings'
import ErrorPage from './ErrorPage'
import Main from './Conversations/Conversations'
import ProtectedRoutes from './ProtectedRoutes'

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
