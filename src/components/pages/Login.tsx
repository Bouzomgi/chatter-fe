import '../../styles/layout/Form.scss'
import '../../styles/general/Arrow.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import arrow from '../../assets/arrow.svg'
import Header from '../layout/Header'
import AuthService from '../../services/requesters/AuthService'
import axios, { AxiosError, HttpStatusCode } from 'axios'
import { ValidationError } from 'yup'
import FormField from '../form/FormField'
import EmptyFormRow from '../form/EmptyFormInputRow'
import loginSchema from '../../validators/loginValidator'
import LocalStorageService from '../../services/LocalStorageService'

export default function Login() {
  const [isArrowShaking, setIsArrowShaking] = useState(false)
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  function assignInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target
    setLoginForm((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  function clearFeedback() {
    setErrors({
      username: '',
      password: ''
    })
    setError('')
  }

  function handleValidationError(validationError: ValidationError) {
    const discoveredErrors = {
      username: '',
      password: ''
    }
    validationError.inner.forEach((error) => {
      if (error.path && error.path in discoveredErrors) {
        discoveredErrors[error.path as keyof typeof discoveredErrors] =
          error.message
      }
    })
    setErrors(discoveredErrors)
  }

  function handleAxiosError(axiosError: AxiosError) {
    if (axiosError.response) {
      if (axiosError.response.status === HttpStatusCode.NotFound) {
        setError('Username does not exist')
      } else if (axiosError.response.status === HttpStatusCode.Unauthorized) {
        setError('Invalid password')
      } else if (
        axiosError.response.status === HttpStatusCode.InternalServerError
      ) {
        setError('Server could not process request')
      } else {
        setError('Could not login')
      }
    } else if (axiosError.request) {
      if (axiosError.code === 'ECONNABORTED') {
        setError('Request timed out')
      } else if (
        axiosError.code === 'ECONNREFUSED' ||
        axiosError.code === 'ERR_NETWORK'
      ) {
        setError('Could not connect to server')
      } else {
        setError('No response from the server')
      }
    } else {
      setError('Unknown error')
    }
  }

  async function submitLogin() {
    try {
      clearFeedback()

      // validate inputs clientside
      await loginSchema.validate(loginForm, { abortEarly: false })

      const { data } = await AuthService.login(loginForm)

      const userDetails = {
        ...data,
        userId: data.userId
      }

      LocalStorageService.setUserDetails(userDetails)

      navigate('/chatroom')
    } catch (error) {
      // shake the arrow
      setIsArrowShaking(true)
      setTimeout(() => setIsArrowShaking(false), 500)

      if (ValidationError.isError(error)) {
        handleValidationError(error)
      } else if (axios.isAxiosError(error)) {
        handleAxiosError(error)
      } else {
        setError('Unknown error')
      }
    }
  }

  return (
    <div id='app'>
      <Header isLoggedIn={false} />
      <div className='content form-centerer'>
        <div className='form'>
          <h1>login</h1>
          <div className='input-section'>
            <FormField
              fieldName='username'
              value={loginForm.username}
              assignInput={assignInput}
              error={errors.username}
            />
            <FormField
              fieldName='password'
              value={loginForm.password}
              assignInput={assignInput}
              error={errors.password}
            />
            <EmptyFormRow />
          </div>
          <div className='submission'>
            <div className='submission-message'>
              <span className='failure'>{error}</span>
              {!error && <span className='placeholder' />}
            </div>
            <div className='submission-row'>
              <Link className='alternate-form-text' to='/register'>
                register?
              </Link>
              <button onClick={submitLogin}>
                <img
                  className={
                    'selection-arrow' + (isArrowShaking ? ' shake' : '')
                  }
                  src={arrow}
                  alt='next arrow'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
