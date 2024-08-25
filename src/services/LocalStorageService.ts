import Avatar from '../models/Avatar'

type UserDetails = {
  userId: number
  username: string
  avatar: Avatar
}

export default class LocalStorageService {
  static setUserDetails(userDetails: UserDetails) {
    localStorage.setItem('userId', `${userDetails.userId}`)
    localStorage.setItem('username', userDetails.username)
    localStorage.setItem('avatarName', userDetails.avatar.name)
    localStorage.setItem('avatarUrl', userDetails.avatar.url)
  }

  static removeUserDetails() {
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('avatarName')
    localStorage.removeItem('avatarUrl')
  }

  static areUserDetailsSet() {
    return localStorage.getItem('userId') &&
      localStorage.getItem('username') &&
      localStorage.getItem('avatarName') &&
      localStorage.getItem('avatarUrl')
      ? true
      : false
  }

  static getUserDetails() {
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('username')
    const avatarName = localStorage.getItem('avatarName')
    const avatarUrl = localStorage.getItem('avatarUrl')

    if (userId && username && avatarName && avatarUrl) {
      return {
        userId: Number(userId),
        username,
        avatarName,
        avatarUrl
      }
    } else {
      throw new Error('could not get user details')
    }
  }
}
