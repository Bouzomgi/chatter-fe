import '../../styles/layout/Form.scss'
import '../../styles/general/Arrow.scss'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import SubmissionArrow from '../form/SubmissionArrow'
import AuthService from '../../services/requesters/AuthService'
import axios, { AxiosError, HttpStatusCode } from 'axios'
import registerSchema from '../../validators/registerValidator'
import { ValidationError } from 'yup'
import FormField from '../form/FormField'

export default function Register() {
  const [isArrowShaking, setIsArrowShaking] = useState(false)
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [response, setResponse] = useState('')
  const [error, setError] = useState('')

  function assignInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target
    setRegisterForm((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  function clearFeedback() {
    setErrors({
      username: '',
      email: '',
      password: ''
    })
    setResponse('')
    setError('')
  }

  function handleValidationError(validationError: ValidationError) {
    const discoveredErrors = {
      username: '',
      email: '',
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
      if (axiosError.response.status === HttpStatusCode.Conflict) {
        setError('Username or email already in use')
      } else {
        setError('Could not register account')
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

  async function submitRegistration() {
    try {
      clearFeedback()

      // validate inputs clientside
      await registerSchema.validate(registerForm, { abortEarly: false })

      await AuthService.register(registerForm)
      setResponse('Successfully created account')
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
    <div className='content form-centerer'>
      <div className='form'>
        <h1>sign up</h1>
        <div className='input-section'>
          <FormField
            fieldName='email'
            value={registerForm.email}
            assignInput={assignInput}
            error={errors.email}
            dataCy='email-field'
          />
          <FormField
            fieldName='username'
            value={registerForm.username}
            assignInput={assignInput}
            error={errors.username}
            dataCy='username-field'
          />
          <FormField
            fieldName='password'
            value={registerForm.password}
            assignInput={assignInput}
            error={errors.password}
            isPassword={true}
            dataCy='password-field'
          />
        </div>
        <div className='submission'>
          <div className='submission-message' data-cy='submission-message'>
            <span className='success'>{response}</span>
            <span className='failure'>{error}</span>
            {!(response || error) && <span className='placeholder' />}
          </div>
          <div className='submission-row'>
            <Link className='alternate-form-text' to='/'>
              login?
            </Link>
            <SubmissionArrow
              onSubmit={submitRegistration}
              isArrowShaking={isArrowShaking}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
