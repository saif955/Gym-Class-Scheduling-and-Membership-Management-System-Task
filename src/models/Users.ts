import mongoose, { Document, Schema, Types } from "mongoose";

// Interface for User document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    //constant place in another file
    role:'admin' | 'trainer' | 'trainee';
    enrolledSchedules?: Types.ObjectId[];
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
    },
    enrolledSchedules: [{
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
        default: []
    }]
}, {
    timestamps: true
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
