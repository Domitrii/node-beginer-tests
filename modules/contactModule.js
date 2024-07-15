import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

export default mongoose.model("NewTrack", contactSchema)
