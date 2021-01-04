import { Request, Response, NextFunction } from 'express'

import { UnauthorizedError } from '../helpers/apiError'
import constant from '../constant/contant'

const { ROLE_ADMIN, ROLE_SUPER_ADMIN } = constant

// const role = ROLE_ADMIN || ROLE_SUPER_ADMIN

const authorize = (roleEntered: string) => {
  // console.log('This is the:', role)
  return (req: Request, res: Response, next: NextFunction) => {
    let role = req.body.authenticate.role
    role = roleEntered
    if (role) {
      next()
    } else {
      next(new UnauthorizedError('Unthorized to access this route'))
    }
  }
}

export default authorize
