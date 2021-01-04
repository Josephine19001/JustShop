import { Request, Response, NextFunction } from 'express'
import Stripe from 'stripe'
import { v4 as uuid } from 'uuid'

import Product from '../models/Product'
import ProductService from '../services/product'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'

const stripe = new Stripe(`${process.env.SECRET_LIVE_APIKEY}`, {
  apiVersion: '2020-03-02',
})

//@desc         Create product
//@route        POST /api/v1/product
//@access       private
//@role         admin, super-admin
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      category,
      variants,
      sizes,
      description,
      image,
      price,
      quantity,
    } = req.body

    const product = new Product({
      name,
      category,
      variants,
      sizes,
      description,
      image,
      price,
      quantity,
    })

    await ProductService.create(product)

    res.status(200).json(product)
  } catch (error) {
    if (error.name === 'MongoError' && error.name === 'ValidationError') {
      next(new InternalServerError('Internal Server Error', error.message))
    } else {
      next(new BadRequestError(error.message, error))
    }
  }
}

//@desc         Update product
//@route        PUT /api/v1/product
//@access       private
//@role         admin, super-admin
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.productId
    const updatedProduct = await ProductService.update(productId, update)
    res.json(updatedProduct)
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new UnauthorizedError('Unauthorized', error))
    }
  }
}

//@desc         Filter product by Tag
//@route        GET /api/v1/product
//@access       public
//@role         admin, super-admin, users
export const filterProductBy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req
    res.json(await ProductService.findByQuery(query))
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new NotFoundError('Not Found', error))
    }
  }
}

//@desc         Get All Products
//@route        GET /api/v1/product
//@access       public
//@role         admin, super-admin, users
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pageNumber = parseInt(req.query.page)
  const pageLimit = parseInt(req.query.limit)
  try {
    res.json(await ProductService.findAll(pageNumber, pageLimit))
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new NotFoundError('Not Found', error))
    }
  }
}

//@desc         Delete product
//@route        GET /api/v1/product/:productId
//@access       private
//@role         admin, super-admin
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    await ProductService.deleteProduct(productId)
    res.status(204).end()
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new UnauthorizedError('Unauthorized', error))
    }
  }
}

//@desc         Get product by Id
//@route        GET /api/v1/product/:productId
//@access       public
//@role         admin, super-admin, users
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId
    res.json(await ProductService.findById(productId))
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new NotFoundError('Not Found', error))
    }
  }
}

export const customerPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product, token } = req.body
    const idempotencyKey = uuid()
    const createPayment = stripe.customers.create({
      email: token.email,
      source: token._id,
    })
    const customer: any = await createPayment
    const results = stripe.charges.create(
      {
        amount: product.price * 100,
        currency: 'usd',
        customer: customer.id,
      },
      { idempotencyKey }
    )
    return res.status(200).json(results)
  } catch (error) {
    next(new BadRequestError(error.message, error))
  }
}
