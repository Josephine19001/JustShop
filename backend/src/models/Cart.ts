import mongoose, { Document } from 'mongoose'

export type CartDocument = Document & {
  products: Array<string>
}

const cartSchema = new mongoose.Schema({
  pro,
})
