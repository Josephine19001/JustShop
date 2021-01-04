import crypto from 'crypto'
import bcrypt from 'bcryptjs'

const generateResetToken = (
  resetPasswordToken: string | undefined,
  resetPasswordExpire: number | undefined
) => {
  const resetToken = crypto.randomBytes(20).toString('hex')
  resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  // resetPasswordToken = bcrypt
  // .hash(resetToken,10)
  resetPasswordExpire = Date.now() + 20 * 1000 * 60
  return resetToken
}

export default generateResetToken
