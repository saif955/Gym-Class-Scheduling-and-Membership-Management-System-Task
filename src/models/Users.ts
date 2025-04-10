import mongoose, { Document, Schema } from "mongoose";

// Interface for User document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'trainer' | 'trainee';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: { 
        type: String, 
        enum: ['admin', 'trainer', 'trainee'],
        default: 'trainee'
    }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
