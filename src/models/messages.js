import mongoose from 'mongoose'

export const Message = mongoose.model('Message', {
  message: String,
  senderMail: String,
  receiverMail: String,
  timestamp: Number,
})
