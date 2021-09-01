import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Here we do encryption of password.
//For doing that, before we actually save, we're going to run an async function
userSchema.pre('save', async function (next) {

    //When we register, we just create a new user. We have used User.create in userController
    //Even though we're using create, it's basically syntactic sugar for the .save method
    //So this will run even though we're calling create and then this plain text password will be
    //encrypted through this piece of middleware.

    //We only want this to run if the password field is sent or modified. If we update our name or email
    //but not password, we don't want this to run bcz if it does, it's going to create a new hash and we
    //will not be able to login in
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User