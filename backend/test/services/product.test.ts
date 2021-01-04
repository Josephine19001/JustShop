import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import * as dbhelper from '../db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'
const nonExistingProductTag = { name: 'something' }

async function createProduct() {
  const product = new Product({
    name: 'Bag',
    categories: ['Classy', 'African'],
    variants: ['Pink', 'Red'],
    sizes: ['Big', 'Small', 'Medium'],
  })
  return await ProductService.create(product)
}

describe('product service', () => {
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
    const product = await createProduct()
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Bag')
  })

  //find product by id test success
  it('should get a product with id', async () => {
    const product = await createProduct()
    const found = await ProductService.findById(product._id)
    expect(found).toEqual(
      expect.objectContaining({
        __v: product.__v,
        _id: product._id,
        categories: expect.arrayContaining(product.categories),
        name: product.name,
        sizes: expect.arrayContaining(product.sizes),
        variants: expect.arrayContaining(product.variants),
      })
    )
  })

  //find product by id test failure
  it('should get a product with non-exisiting product id', async () => {
    expect.assertions(1)
    try {
      return await ProductService.findById(nonExistingProductId)
    } catch (error) {
      expect(error.message).toMatch(`Product ${nonExistingProductId} not found`)
    }
  })

  //find product by tag test by name
  it('should get a product by tag by name', async () => {
    const product = await createProduct()
    const filter = { name: product.name }
    try {
      const foundTag = await ProductService.findByQuery(filter)
      expect(foundTag).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            __v: product.__v,
            _id: product._id,
            categories: expect.arrayContaining(product.categories),
            name: product.name,
            sizes: expect.arrayContaining(product.sizes),
            variants: expect.arrayContaining(product.variants),
          }),
        ])
      )
    } catch (error) {
      expect(error.message).toMatch(`Product tag ${filter} not found`)
    }
  })

  //find product by tag test category
  it('should get a product by tag category', async () => {
    const product = await createProduct()
    const filter = { categories: product.categories }
    try {
      const foundTag = await ProductService.findByQuery(filter)
      expect(foundTag).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            __v: product.__v,
            _id: product._id,
            categories: expect.arrayContaining(product.categories),
            name: product.name,
            sizes: expect.arrayContaining(product.sizes),
            variants: expect.arrayContaining(product.variants),
          }),
        ])
      )
    } catch (error) {
      expect(error.message).toMatch(`Product tag ${filter} not found`)
    }
  })

  //find product by tag test variant
  it('should get a product by tag variant', async () => {
    const product = await createProduct()
    const filter = { variants: product.variants }
    if (!product) {
      throw new Error(`Product tag ${filter} not found`)
    }
    try {
      const foundTag = await ProductService.findByQuery(filter)
      expect(foundTag).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            __v: product.__v,
            _id: product._id,
            categories: expect.arrayContaining(product.categories),
            name: product.name,
            sizes: expect.arrayContaining(product.sizes),
            variants: expect.arrayContaining(product.variants),
          }),
        ])
      )
    } catch (error) {
      expect(error.message).toMatch(`Product tag ${filter} not found`)
    }
  })

  //find product by tag test size
  it('should get a product by tag size', async () => {
    const product = await createProduct()
    const filter = { sizes: product.sizes }
    try {
      const foundTag = await ProductService.findByQuery(filter)
      expect(foundTag).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            __v: product.__v,
            _id: product._id,
            categories: expect.arrayContaining(product.categories),
            name: product.name,
            sizes: expect.arrayContaining(product.sizes),
            variants: expect.arrayContaining(product.variants),
          }),
        ])
      )
    } catch (error) {
      expect(error.message).toMatch(`Product tag ${filter} not found`)
    }
  })

  // find product by tag test failure
  it('should get a product with non-exisiting product tag', async () => {
    expect.assertions(0) // I NEED TO CHECK THIS AGAIN
    try {
      return await ProductService.findByQuery(nonExistingProductTag)
    } catch (error) {
      expect(error.message).toMatch(
        `Product tag ${nonExistingProductTag} not found`
      )
    }
  })

  //find all products success
  it('should get a all list of products', async () => {
    const product = await createProduct()
    const pageNum = 1
    const limitNum = 2
    const foundList = await ProductService.findAll(pageNum, limitNum)
    expect(foundList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __v: product.__v,
          _id: product._id,
          categories: expect.arrayContaining(product.categories),
          name: product.name,
          sizes: expect.arrayContaining(product.sizes),
          variants: expect.arrayContaining(product.variants),
        }),
      ])
    )
  })

  //update existing products name
  it('should update an existing product name', async () => {
    const product = await createProduct()
    try {
      const update = {
        __v: product.__v,
        name: 'Sneakers',
      }

      const updated = await ProductService.update(product._id, update)
      expect(updated).toHaveProperty('_id')
      expect(updated).toHaveProperty('name', 'Sneakers')
      expect(updated).toEqual(
        expect.objectContaining({
          __v: updated.__v,
          _id: product._id,
          categories: expect.arrayContaining(product.categories),
          name: update.name,
          sizes: expect.arrayContaining(product.sizes),
          variants: expect.arrayContaining(product.variants),
        })
      )
    } catch (error) {
      expect(error.message).toMatch(`Product ${product._id} not found`)
    }
  })

  //update existing products categories
  it('should update an existing product categories', async () => {
    const product = await createProduct()
    try {
      const update = {
        __v: product.__v,
        categories: ['Shoes'],
      }

      const updated = await ProductService.update(product._id, update)
      expect(updated).toHaveProperty('_id')
      expect(updated).toHaveProperty(
        'categories',
        expect.arrayContaining(['Shoes'])
      )
      expect(updated).toEqual(
        expect.objectContaining({
          __v: updated.__v,
          _id: product._id,
          categories: expect.arrayContaining(update.categories),
          name: product.name,
          sizes: expect.arrayContaining(product.sizes),
          variants: expect.arrayContaining(product.variants),
        })
      )
    } catch (error) {
      expect(error.message).toMatch(`Product ${product._id} not found`)
    }
  })

  //update existing products sizes
  it('should update an existing product sizes', async () => {
    const product = await createProduct()
    try {
      const update = {
        __v: product.__v,
        sizes: ['Med'],
      }

      const updated = await ProductService.update(product._id, update)
      expect(updated).toHaveProperty('_id')
      expect(updated).toHaveProperty('sizes', expect.arrayContaining(['Med']))
      expect(updated).toEqual(
        expect.objectContaining({
          __v: updated.__v,
          _id: product._id,
          categories: expect.arrayContaining(product.categories),
          name: product.name,
          sizes: expect.arrayContaining(update.sizes),
          variants: expect.arrayContaining(product.variants),
        })
      )
    } catch (error) {
      expect(error.message).toMatch(`Product ${product._id} not found`)
    }
  })

  //update existing products variants
  it('should update an existing product variants', async () => {
    const product = await createProduct()
    try {
      const update = {
        __v: product.__v,
        variants: ['Green'],
      }

      const updated = await ProductService.update(product._id, update)
      expect(updated).toHaveProperty('_id')
      expect(updated).toHaveProperty(
        'variants',
        expect.arrayContaining(['Green'])
      )
      expect(updated).toEqual(
        expect.objectContaining({
          __v: updated.__v,
          _id: product._id,
          categories: expect.arrayContaining(product.categories),
          name: product.name,
          sizes: expect.arrayContaining(product.sizes),
          variants: expect.arrayContaining(updated.variants),
        })
      )
    } catch (error) {
      expect(error.message).toMatch(`Product ${product._id} not found`)
    }
  })

  //update non-existing product
  it('should get a product with non-exisiting updated product', async () => {
    expect.assertions(1)
    const update = {
      name: 'Sneakers',
      categories: ['Shoes'],
    }
    try {
      return await ProductService.update(nonExistingProductId, update)
    } catch (error) {
      expect(error.message).toMatch(`Product ${nonExistingProductId} not found`)
    }
  })

  //delete product by id
  it('should delete an existing product', async () => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService.deleteProduct(product._id)
    try {
      return await ProductService.findById(nonExistingProductId)
    } catch (error) {
      expect(error.message).toMatch(`Product ${nonExistingProductId} not found`)
    }
  })
})
