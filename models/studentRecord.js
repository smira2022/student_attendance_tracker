const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['present', 'absent'],
    }

});

const studentRecordSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    attendance: {
        type: [attendanceSchema],
        default: [],
    }

});

const StudentRecord = mongoose.model('StudentRecord', studentRecordSchema);

module.exports = StudentRecord;
