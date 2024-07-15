import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
        name: {
          type: String,
          default: "User",
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        token: {
          type: String,
          default: null,
        },
        refreshToken: {
          type: String,
          default: null,
        },
        avatarURL: {
          type: String,
          default: null,
        },
        gender: {
          type: String,
          enum: ["Male", "Female", "undefined"],
          default: "undefined",
        },
        dailyNorm: {
          type: Number,
          default: 2000,
        },
        weight: {
          type: Number,
          default: 0,
        },
        timeActive: {
          type: Number,
          default: 0,
        }
      }, {
        versionKey: false, 
        timestamps: true,
      }
)

export default mongoose.model("UserCont", userSchema)

