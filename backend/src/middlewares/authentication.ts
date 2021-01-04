import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { UnauthorizedError } from '../helpers/apiError'
import config from '../config/config'

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split('Bearer ')[1]

  //no token found
  if (!token) {
    throw new UnauthorizedError('Unauthorized to access this route')
  }

  try {
    const decoded = await jwt.verify(token, config.jwtSecret)
    req.body.authenticate = decoded

    next()
  } catch (err) {
    next(new UnauthorizedError('Unauthorized to access this route'))
  }
}

export default verifyJWT
