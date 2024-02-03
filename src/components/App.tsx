import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Settings from './Settings'
import ErrorPage from './ErrorPage'

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
      path: '/settings',
      element: <Settings />,
      errorElement: <ErrorPage />
    }
  ])

  return <RouterProvider router={router} />
}
