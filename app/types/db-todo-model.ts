import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdOn: {
        type: String,
        required: true,
    },
    assignedUsers: {
        type: Array,
        require: true,
    },
    assignedGroup: {
        type: Number,
        required: true,
    },
});

const Todo = mongoose.models.Task || mongoose.model('Task', todoSchema);
export { Todo };
