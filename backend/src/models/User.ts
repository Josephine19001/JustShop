/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

import constant from '../constant/contant'

const { ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN } = constant

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  isBanned?: boolean
  getSignedToken?: any
  generatePasswordResetToken?: any
  resetPasswordToken?: string
  resetPasswordExpire?: number
  googleId?: string
}

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    minlength: 1,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Provide a valid email'],
  },
  password: {
    type: String,
    // required: [true, 'Password required'],
    minlength: 6,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: ROLE_USER,
    enum: [ROLE_ADMIN, ROLE_USER, ROLE_SUPER_ADMIN],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  googleId: {
    type: String,
  },
})

export default mongoose.model<UserDocument>('User', UserSchema)
