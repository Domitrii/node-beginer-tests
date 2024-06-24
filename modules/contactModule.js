import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "U should write contact"]
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    favorite: {
        type: Boolean
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

export default mongoose.model("NewContact", contactSchema)
