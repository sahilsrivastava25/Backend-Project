import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({ // take refernce from our data model view.
  username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },

  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  fullName:{
    type: String,
    required: true,
    trim: true,
    index: true
  },

  avatar: {
    type: String, // cloudinary url
    required: true
  },

  coverImage: {
    type: String // cloudinary url
  },

  watchHistory: [ // will contain video ids of video watched
    {
      type: Schema.Types.ObjectId,
      ref: "Video"
    }
  ],

  password:{ // needs to be encrypted
    type: String,
    required: [true, 'Password is required']
  },

  refreshToken:{
    type: String
  }
  
}, {timestamps: true})

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next()

  this.password = bcrypt.hash("this.password", 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.passoword)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
} // it's faster so we didn't use async.


userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          // less details as it was refreshed everytime
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}




export const User = mongoose.model("User", userSchema)
