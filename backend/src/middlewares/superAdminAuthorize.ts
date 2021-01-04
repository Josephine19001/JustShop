import { Request, Response, NextFunction } from 'express'

import { UnauthorizedError } from '../helpers/apiError'
import constant from '../constant/contant'

const { ROLE_SUPER_ADMIN } = constant

// const role = ROLE_ADMIN || ROLE_SUPER_ADMIN

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const role = req.body.authenticate.role
  console.log('This is the:', role)

  if (role === ROLE_SUPER_ADMIN) {
    next()
  } else {
    next(new UnauthorizedError('Unthorized to access this route'))
  }
}

export default authorize
