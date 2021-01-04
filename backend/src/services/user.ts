import bcrypt from 'bcryptjs'

import User, { UserDocument } from '../models/User'
import getSignedToken from '../helpers/getSignedToken'
import generateResetPasswordToken from '../helpers/resetToken'
import constant from '../constant/contant'

const { ROLE_ADMIN, ROLE_USER } = constant

function createUser(payload: UserDocument): Promise<UserDocument> {
  return User.find({ email: payload.email })
    .select('-password')
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error('Email already exist')
      } else {
        return bcrypt
          .hash(payload.password, 10)
          .then((hashed) => {
            const newUser = new User({
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
              password: hashed,
              role: payload.role,
            })
            return newUser.save()
          })
          .catch((err) => {
            throw new Error('Fill in all required fields')
          })
      }
    })
}

function signInUser(email: string, password: string): Promise<string> {
  return User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('User does not exist, check email')
      }
      if (user.isBanned == true) {
        throw new Error(
          'You are banned from using an account due to breach of policy'
        )
      }
      return bcrypt.compare(password, user.password).then((response) => {
        console.log('response', response)
        if (response) {
          const token = getSignedToken(
            user._id,
            user.role,
            user.email,
            user.firstName,
            user.lastName
          )
          return token
        } else {
          throw new Error('Incorrect password, try again')
        }
      })
    })
}

function googlesignInUser(email: string) {
  return (
    User.findOne({ email: email })
      // .select('-password')
      .exec()
      .then((user) => {
        if (!user?.email) {
          throw new Error('Incorrect Email')
        }
        if (user?.isBanned == true) {
          throw new Error(
            'You are banned from using an account due to breach of policy'
          )
        }
        return getSignedToken(
          user._id,
          user.role,
          user.email,
          user.firstName,
          user.lastName
        )
      })
  )
}

//I will fix this later
function userForgotPassword(email: string) {
  return User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('No account associated with this email')
      }
      return user.save()
    })
}

function findUserByEmail(email?: string): Promise<UserDocument> {
  return User.findOne({ email })
    .select('-password')
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${email} not found`)
      }
      return user
    })
}

const comparePassword = async (
  userPassword: string,
  enteredOldPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(enteredOldPassword, userPassword)
}
async function userChangePassword(
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<UserDocument> {
  const user: any = await User.findOne({ email: email })
  const isMatch = await comparePassword(oldPassword, user.password)
  // try {
  if (!user) {
    throw new Error('Incorrect Email')
  }
  if (isMatch) {
    throw new Error('Current password should not match new password')
  } else {
    const hashed = await bcrypt.hash(newPassword, 10)
    user.password = hashed
  }
  return user.save()
}

function updateUserProfile(payload: UserDocument) {
  return User.findOne({ email: payload.email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error('Incorrect Email')
      }
      if (user.email === payload.email) {
        if (payload.email) {
          user.email = payload.email
        }
        if (payload.firstName) {
          user.firstName = payload.firstName
        }
        if (payload.lastName) {
          user.lastName = payload.lastName
        }
      }
      return user.save()
    })
}

function findAndMakeAdmin(payload: UserDocument): Promise<UserDocument> {
  return User.findOne({ email: payload.email })
    .exec()
    .then((user: any) => {
      if (!user) {
        throw new Error('Incorrect Email')
      } else {
        if (user.role == ROLE_USER) {
          user.role = ROLE_ADMIN
        } else {
          user.role = ROLE_USER
        }
      }
      return user?.save()
    })
}
function findAndBan(payload: UserDocument): Promise<UserDocument> {
  return User.findOne({ email: payload.email })
    .exec()
    .then((user: any) => {
      if (!user) {
        throw new Error('Incorrect Email')
      } else {
        if (user.isBanned == false) {
          user.isBanned = true
        } else {
          user.isBanned = false
        }
      }
      return user?.save()
    })
}

function findUserById(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .select('-password')
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      return user
    })
}

async function findOrCreateUser(payload: Partial<UserDocument>) {
  try {
    return await findUserByEmail(payload.email)
  } catch (error) {
    try {
      const user = new User(payload)
      return user.save()
    } catch (error) {
      throw new Error('Cannot create user')
    }
  }
}

function findAllUsers(): Promise<UserDocument[]> {
  return User.find().sort({ userName: 1, email: -1 }).select('-password').exec()
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec()
}

export default {
  findUserById,
  findAllUsers,
  deleteUser,
  createUser,
  findOrCreateUser,
  findUserByEmail,
  signInUser,
  googlesignInUser,
  updateUserProfile,
  userForgotPassword,
  userChangePassword,
  findAndBan,
  findAndMakeAdmin,
}
