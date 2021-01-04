/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'

import User, { UserDocument } from '../models/User'
import UserServices from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
} from '../helpers/apiError'
import getSignedToken from '../helpers/getSignedToken'
import generateResetPasswordToken from '../helpers/resetToken'
import sendEmail from '../util/sendEmail'

type Options = {
  [key: string]: string
}

//@desc         Sign up User
//@route        GET /api/v1/users/
//@access       public
//@role         super-admin, users, admin

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body
    const savedUser = await UserServices.createUser(newUser)

    res.status(200).json({
      success: true,
      data: savedUser,
      token: getSignedToken(
        savedUser._id,
        savedUser.role,
        savedUser.email,
        savedUser.firstName,
        savedUser.lastName
      ),
    })
  } catch (error) {
    if (error.statusCode === 500) {
      next(new InternalServerError('Internal Server Error', error))
    } else {
      next(new BadRequestError(error.message, error))
    }
  }
}

//@desc         Sign in User
//@route        GET /api/v1/users/signin
//@access       public
//@role         super-admin,admin,user

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const token = await UserServices.signInUser(email, password)
    res.status(200).json({
      success: true,
      token: token,
    })
  } catch (error) {
    if (error.statusCode === 500) {
      next(new InternalServerError('Internal Server Error', error))
    } else {
      next(new BadRequestError(error.message, error))
    }
  }
}

//@desc         Google Log in
//@route        GET /api/v1/users/google-login
//@access       private
//@role         super-admin,admin,users
export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.user as UserDocument
    const token = await UserServices.googlesignInUser(email)

    res.status(200).json({
      sucess: true,
      token: token,
    })
  } catch (error) {
    if (error.statusCode === 500) {
      next(new InternalServerError('Internal Server Error', error))
    } else {
      next(new BadRequestError(error.message, error))
    }
  }
}

//@desc         Forgot password Request
//@route        GET /api/v1/users/forgot-password
//@access       public
//@role         super-admin,admin,users
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body as UserDocument
  const user: UserDocument | null = await User.findOne({ email: email })
  if (!user) {
    return next(new BadRequestError('No account associated with this email'))
  }
  user.save()
  const resetToken = generateResetPasswordToken(
    user?.resetPasswordToken,
    user?.resetPasswordExpire
  )

  const message = `Reset your password using this url: ${req.protocol}://${req.hostname}:5000/reset-password/${resetToken}`

  const options: Options = {
    email: req.body.email,
    message: message,
    subject: 'Password Reset',
  }

  try {
    await sendEmail(options)
    res.status(200).json({ success: true, message: 'Email sent' })
  } catch (error) {
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    user.save()
    return next(new BadRequestError('Could not send email'))
  }
}

//@desc         Reset password
//@route        GET /api/v1/users/reset-password
//@access       public
//@role         super-admin,admin,user
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')
  // const resetToken = bcrypt.hash(req.params.resetToken, 10)
  const { password } = req.body
  const user: any = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new Error('Password token is invalid or Token expired'))
  }
  if (!password) {
    return next(new BadRequestError('Provide password'))
  }
  user.password = password
  user.resetPasswordExpire = undefined
  user.resetPasswordToken = undefined
  user.save()
  const token = user.getSignedToken()
  res.status(200).json({ success: true, token: token })
}

//@desc         Update user profile
//@route        GET /api/v1/users/update
//@access       private
//@role         super-admin,admin, users

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const updatedUser = await UserServices.updateUserProfile(update)

    res.status(200).json({
      success: true,
      data: updatedUser,
      token: getSignedToken(
        updatedUser._id,
        updatedUser.role,
        updatedUser.email,
        updatedUser.firstName,
        updatedUser.lastName
      ),
    })
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new UnauthorizedError('Unauthorized', error))
    }
  }
}

//@desc         Update user status
//@route        GET /api/v1/users/ban
//@access       private
//@role         super-admin,admin

export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateBan = req.body

    await UserServices.findAndBan(updateBan)

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new UnauthorizedError('Unauthorized', error))
    }
  }
}

//@desc         Update user role
//@route        GET /api/v1/users/ban
//@access       private
//@role         super-admin,admin

export const makeUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateRole = req.body
    await UserServices.findAndMakeAdmin(updateRole)

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new UnauthorizedError('Unauthorized', error))
    }
  }
}
//@desc         Change password
//@route        GET /api/v1/users/:userId
//@access       private
//@role         super-admin, users, admin
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { email } = req.body.authenticate as any
    const { newPassword, oldPassword, email } = req.body
    console.log('body', req.body)
    await UserServices.userChangePassword(email, oldPassword, newPassword)

    res.status(200).json({
      success: true,
      // data: updatedPassword,
    })
  } catch (error) {
    if (error.statusCode === 500) {
      next(new InternalServerError('Internal Server Error', error))
    } else {
      next(new BadRequestError(error.message, error))
      console.log('error from backend', error)
    }
  }
}

//@desc         Delete product
//@route        GET /api/v1/users/:userId
//@access       private
//@role         super-admin
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    await UserServices.deleteUser(userId)
    res.status(204).end()
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new UnauthorizedError('Unauthorized', error))
    }
  }
}

//@desc         Filter product by Id
//@route        GET /api/v1/users/:userId
//@access       private
//@role         super-admin
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    res.json(await UserServices.findUserById(userId))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

//@desc         Filter user by email
//@route        GET /api/v1/users/email
//@access       private
//@role         super-admin
export const getByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email
    res.json(await UserServices.findUserById(email))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

//@desc         Get all Users
//@route        GET /api/v1/users
//@access       private
//@role         super-admin
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserServices.findAllUsers())
  } catch (error) {
    next(new NotFoundError('Products not found', error))
  }
}
