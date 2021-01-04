import request from 'supertest'

import { ProductDocument } from '../../src/models/Product'
import * as dbhelper from '../db-helper'
import app from '../../src/app'
import { authenticate } from '../../src/config/config'

const nonExistingProductId = '5e57b77b5744fa0b461'

async function createProduct(
  token: string,
  override?: Partial<ProductDocument>
) {
  let product = {
    name: 'Bag',
    categories: ['Classy', 'African'],
    variants: ['Pink', 'Red'],
    sizes: ['Big', 'Small', 'Medium'],
  }
  if (override) {
    product = { ...product, ...override }
  }

  return await request(app)
    .post('/api/v1/products')
    .set('Authorization', `Bearer ${token}`)
    .send(product)
}

describe('product controller', () => {
  let token: string

  beforeAll((done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: authenticate.email,
        password: authenticate.password,
      })
      .end((err, response) => {
        token = response.body.token //save the token
        done()
      })
  })

  //connect in memory before test
  beforeEach(async () => {
    await dbhelper.connect()
  })

  //clear database after each test
  afterEach(async () => {
    await dbhelper.clearDatabase()
  })

  //close connection after all test
  afterAll(async () => {
    await dbhelper.closeDatabase()
  })

  //create product test
  it('should create a product', async () => {
    const res = await createProduct(token)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('Bag')
  })

  //create product with wrong data
  // it('should not create a product with wrong data', async () => {
  //   const res = await request(app)
  //     .post('/api/v1/products')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       // These fields should be included
  //       // name: 'Sneaker',
  //       // variants: 'Blue',
  //       categories: ['Shoes'],
  //       sizes: 40,
  //     })
  //   console.log('this is res.body', res.body)
  //   expect(res.status).toBe(400)
  //   // }
  // })

  // get an exisiting product by id
  it('should get back an existing product by id', async () => {
    let res = await createProduct(token)

    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app).get(`/api/v1/products/${productId}`)
  })

  // //get a non existing product with wrong id
  it('should not get back a non-existing product', async () => {
    const res = await request(app).get(
      `/api/v1/products/${nonExistingProductId}`
    )
    expect(res.status).toBe(404)
  })

  // // get all products
  it('should get back all products', async () => {
    const res1 = await createProduct(token, {
      name: 'Sneaker',
      categories: ['Shoes'],
      variants: ['Blue'],
      sizes: ['39'],
    })
    const res2 = await createProduct(token, {
      name: 'Blanket',
      categories: ['Bed'],
      variants: ['Red'],
      sizes: ['200*400'],
    })
    const res3 = await request(app).get('/api/v1/products')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res2.body._id)
    expect(res3.body[1]._id).toEqual(res1.body._id)
  })

  //update an existing product
  it('should update an existing product', async () => {
    let res = await createProduct(token)
    expect(res.status).toBe(200)
    console.log(res.body)
    const productId = res.body._id
    const update = {
      name: 'Sneakers',
      categories: ['Shoes'],
    }

    res = await request(app)
      .put(`/api/v1/products/update/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(update)
    console.log('After:', res.body)
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Sneakers')
  })

  // //delete product
  it('should delete an existing product', async () => {
    let res = await createProduct(token)
    expect(res.status).toBe(200)
    const productId = res.body._id

    res = await request(app)
      .delete(`/api/v1/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/products/${productId}`)
    expect(res.status).toBe(404)
  })
})
