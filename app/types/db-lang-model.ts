import mongoose from 'mongoose';

const langSchema = new mongoose.Schema(
    {
        locale: {
            type: String,
            required: true,
            unique: true,
        },
        translations: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true },
);

const Lang = mongoose.models.Lang || mongoose.model('Lang', langSchema);
export { Lang };
