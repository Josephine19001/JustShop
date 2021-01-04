/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  category: string
  variants: string
  sizes: string
  description: string
  price: string
  image: string
  quantity: number
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  category: {
    type: String,
    required: true,
  },
  variants: {
    type: String,
    required: true,
  },
  sizes: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
  },
})

export default mongoose.model<ProductDocument>('Product', ProductSchema)
