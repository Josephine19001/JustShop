import express from 'express'

import {
  createProduct,
  getById,
  getAll,
  deleteProduct,
  updateProduct,
  filterProductBy,
  customerPayment,
} from '../controllers/product'
import contant from '../constant/contant'
import authorize from '../middlewares/authorize'
import authenticate from '../middlewares/authentication'

const router = express.Router()

const { ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_USER } = contant

// router.get('/', getAll)

router
  .route('/')
  .post(authenticate, authorize(ROLE_ADMIN || ROLE_SUPER_ADMIN), createProduct)
  .get(getAll)
  .get(filterProductBy)

router
  .route('/:productId')
  .get(getById)
  .put(authenticate, authorize(ROLE_ADMIN || ROLE_SUPER_ADMIN), updateProduct)
  .delete(
    authenticate,
    authorize(ROLE_ADMIN || ROLE_SUPER_ADMIN),
    deleteProduct
  )
router.post('/payment', customerPayment)
export default router
