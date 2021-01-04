import * as jwt from 'jsonwebtoken'
import config from '../config/config'

const getSignedToken = function (
  id: string,
  role: string,
  email: string,
  firstName?: string,
  lastName?: string
) {
  return jwt.sign(
    { id: id.toString(), role: role, email: email, firstName, lastName },
    config.jwtSecret,
    {
      expiresIn: 86400,
    }
  )
}

export default getSignedToken
