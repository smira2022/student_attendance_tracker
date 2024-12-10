const StudentRecord = require('../models/studentRecord.js');
const AttendanceManager = require('../models/attendanceManager.js');

exports.getHome = async(req, res) => {
    
    try {
        const students = await StudentRecord.find({});

        const maxAttendanceCount = students.attendance ? students.length : 0;

        res.render('attendance.ejs', {students, maxAttendanceCount});

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.addStudent = async (req, res) => {

    try {
       
        const student = new StudentRecord({
            name: req.body.name,
            email: req.body.email,
        });

        await student.save();
        res.redirect('/attendance');

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.getAllRecords = async (req, res) => {
    try {
        const record = await StudentRecord.find().exec();
        res.json(record);

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

exports.deleteAllRecords = async(req, res) => {
    try {
        await StudentRecord.deleteMany({});
        res.redirect('/attendance');

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

exports.deleteStudent = async(req, res) => {
    try {
        const studentName =  req.body.name;
        const result = await StudentRecord.deleteOne({name: studentName});

        if(result.deleteCount == 0){
            return res.status(404).send('User not found');
        } else {
            return res.redirect('/attendance');
        }

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

exports.updateStudent = async (req, res) => {
    const  attendanceDate = req.body;
    const length = req.body.attendance? req.body.attendance.length : 0;
    

    try {
        
    } catch (error) {
        
    }
};
    
