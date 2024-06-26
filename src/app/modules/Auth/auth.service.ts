import config from '../../config/config'
import { TUser } from '../User/user.interface'
import { User } from '../User/user.model'
import { TLoginUser } from './auth.interface'
import { createToken } from './auth.utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const signup = async (payload: TUser): Promise<any> => {
  //user existence check
  const user = await User.findOne({ email: payload.email })

  if (user) {
    throw new Error('User already exists')
  }

  //set user role
  // payload.role = USER_ROLE.admin

  //create user
  const newUser = await User.create(payload)
  const { _id, name, email, role, phone, address } = newUser
  return {
    data: {
      _id,
      name,
      email,
      role,
      phone,
      address,
    },
  }
}

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password')

  if (!user) {
    throw new Error('User not found')
  }

  const passwordMatch = await User.isPasswordMatched(
    payload.password,
    user.password
  )

  if (!passwordMatch) {
    throw new Error('Password not matched')
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  }
}

export const AuthServices = {
  signup,
  login,
}
