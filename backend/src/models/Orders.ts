import mongoose, { Document, mongo } from 'mongoose'

export type OrderDocument = Document & {
  name: string
  product: any
  quantity: string
}

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  address: {
    type: Object,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    quantity: {
      type: Number,
      default: 1,
    },
  },
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
