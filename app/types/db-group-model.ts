import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    assignedUsers: {
        type: Array,
        require: true,
    },
});

const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);
export { Group };
