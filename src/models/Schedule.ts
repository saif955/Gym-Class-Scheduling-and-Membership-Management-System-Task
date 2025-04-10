import mongoose, { Document, Schema } from 'mongoose';

// Interface for Schedule document
export interface ISchedule extends Document {
    trainerId: mongoose.Types.ObjectId;
    className: string;
    description: string;
    date: Date;
    startTime: string;
    endTime: string;
    maxParticipants: number;
    currentParticipants: number;
    status: 'scheduled' | 'cancelled' | 'completed';
    participants: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    isFull(): boolean;
    canBook(): boolean;
}

const ScheduleSchema: Schema = new Schema({
    trainerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Trainer ID is required']
    },
    className: {
        type: String,
        required: [true, 'Class name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
    },
    maxParticipants: {
        type: Number,
        required: [true, 'Maximum participants is required'],
        min: [1, 'Maximum participants must be at least 1'],
        max: [10, 'Maximum participants cannot exceed 10'],
        default: 10
    },
    currentParticipants: {
        type: Number,
        default: 0,
        min: [0, 'Current participants cannot be negative']
    },
    status: {
        type: String,
        enum: ['scheduled', 'cancelled', 'completed'],
        default: 'scheduled'
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Validate that endTime is after startTime
ScheduleSchema.pre('save', function(this: ISchedule, next) {
    // Use the actual schedule date combined with time strings
    const startDate = new Date(this.date);
    const [startHours, startMinutes] = this.startTime.split(':');
    startDate.setHours(parseInt(startHours), parseInt(startMinutes));

    const endDate = new Date(this.date);
    const [endHours, endMinutes] = this.endTime.split(':');
    endDate.setHours(parseInt(endHours), parseInt(endMinutes));

    // Handle跨 midnight case by adding a day if end time is earlier in 24h format
    if (endHours < startHours) {
        endDate.setDate(endDate.getDate() + 1);
    }
    
    if (endDate <= startDate) {
        next(new Error('End time must be after start time'));
    }
    next();
});

// Validate that currentParticipants doesn't exceed maxParticipants
ScheduleSchema.pre('save', function(this: ISchedule, next) {
    if (this.currentParticipants > this.maxParticipants) {
        next(new Error('Current participants cannot exceed maximum participants'));
    }
    next();
});

// Method to check if class is full
ScheduleSchema.methods.isFull = function(this: ISchedule): boolean {
    return this.currentParticipants >= this.maxParticipants;
};

// Method to check if booking is possible
ScheduleSchema.methods.canBook = function(this: ISchedule): boolean {
    return !this.isFull() && this.status === 'scheduled';
};

const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema);

export default Schedule;
