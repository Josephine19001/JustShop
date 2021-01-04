import Product, { ProductDocument } from '../models/Product'

function create(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

function findById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      return product
    })
}
function findByQuery(
  filterTag: Partial<ProductDocument>
): Promise<ProductDocument[]> {
  return Product.find(filterTag)
    .exec()
    .then((products) => {
      if (!products) {
        throw new Error(`Product tag ${filterTag} not found`)
      }

      return products
    })
}

function findAll(page: number, limit: number): Promise<ProductDocument[]> {
  // const next = page - 1
  return Product.find()
    .sort({ name: 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()
}

function update(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  const { name, category, sizes, variants, quantity } = update

  return Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      if (name) {
        product.name = name
      }
      if (category) {
        product.category = category
      }
      if (variants) {
        product.variants = variants
      }
      if (sizes) {
        product.sizes = sizes
      }
      if (quantity) {
        product.quantity = quantity
      }
      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteProduct,
  findByQuery,
}
