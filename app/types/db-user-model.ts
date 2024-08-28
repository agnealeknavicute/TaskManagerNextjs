import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: Array,
            required: true,
        },
        assignedGroup: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export { User };
