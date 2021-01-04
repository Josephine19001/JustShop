import express from 'express'
import passport from 'passport'

import {
  getAll,
  getById,
  deleteUser,
  getByEmail,
  signUp,
  signIn,
  googleLogin,
  updateProfile,
  forgotPassword,
  resetPassword,
  makeUserAdmin,
  banUser,
  changePassword,
} from '../controllers/user'
import contant from '../constant/contant'
import authorize from '../middlewares/authorize'
import authenticate from '../middlewares/authentication'
import verifyJWT from '../middlewares/authentication'

const router = express.Router()

const { ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_USER } = contant

router.post('/', signUp)
router.post('/signin', signIn)
router.post(
  '/google-signin',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)

router.put('/update', updateProfile)
router.put(
  '/ban',
  authenticate,
  authorize(ROLE_ADMIN || ROLE_SUPER_ADMIN),
  banUser
)
router.put('/role', authenticate, authorize(ROLE_SUPER_ADMIN), makeUserAdmin)

router.post('/forgot-password', forgotPassword)
router.put('/change-password', authenticate, changePassword)
router.put('/reset-password/:resetToken', resetPassword)

router
  .route('/')
  .get(authenticate, authorize(ROLE_ADMIN || ROLE_SUPER_ADMIN), getAll)

router.route('/email').get(authenticate, getByEmail)

router
  .route('/:userId')
  .get(
    authenticate,
    authorize(ROLE_ADMIN || ROLE_SUPER_ADMIN || ROLE_USER),
    getById
  )
  .delete(authenticate, authorize(ROLE_ADMIN || ROLE_SUPER_ADMIN), deleteUser)

export default router
