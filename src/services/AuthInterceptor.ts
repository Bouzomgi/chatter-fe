import axios, { HttpStatusCode } from 'axios'
import LocalStorageService from './LocalStorageService'
import eventEmitter from './EventEmitter'

const axiosAuthInstance = axios.create()

// Removes LocalStorage login details and redirects user if their request returned Unauthorized
axiosAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      LocalStorageService.removeUserDetails()
      eventEmitter.emit('unauthorized')
    }
    return Promise.reject(error)
  }
)

export default axiosAuthInstance
