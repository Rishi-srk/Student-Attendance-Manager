exp = require("express")
app = exp()
const mclient = require("mongodb").MongoClient
const cors=require('cors')
const dburl = "mongodb+srv://internship:internship@cluster0.enn7h5x.mongodb.net/?retryWrites=true&w=majority";
//import path model
const path = require('path')
mclient.connect(dburl).then((client) => {

    let obj = client.db('database')

    //student collection obj
    let studentcollectionobj = obj.collection('student')
    app.set('studentcollectionobj', studentcollectionobj)
    //subject collection obj
    let subjectcollectionobj = obj.collection('subjects')
    app.set('subjectcollectionobj', subjectcollectionobj)
    //attendance collection obj
    let attendancecollectionobj = obj.collection('attendance')
    app.set('attendancecollectionobj', attendancecollectionobj)
    //studentattendance collection obj
    let studentAttendanceCollection = obj.collection('studentattendance')
    app.set('studentAttendanceCollection', studentAttendanceCollection)
    //faculty object
    let facultycollectionobject = obj.collection('faculty')
    app.set('facultycollectionobj', facultycollectionobject)

    console.log("connected to database.....")
})
    .catch(err => console.log(err))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})



app.use(cors())
app.use(exp.json())
app.get('/getstudent', async (req, res) => {

    let studentcollectionobj = req.app.get('studentcollectionobj')
    let data = await studentcollectionobj.find().toArray()
    res.send({ message: "data", payload: data })
})
app.post('/addstudent', (req, res) => {
    let data = req.body
    console.log(data)
    res.send({ message: "added student", payload: data })
    let studentcollectionobj = req.app.get('studentcollectionobj')
    let studentAttendanceCollection = req.app.get('studentAttendanceCollection')
    
    let attendance={rollno:data.rollno,branch:data.branch,dbms:0,os:0,or:0}
    console.log(attendance)
    studentAttendanceCollection.insertOne(attendance)
    studentcollectionobj.insertOne(data)
})

app.post('/addsubject', (req, res) => {
    let data = req.body
    console.log(data)
    res.send({ message: "added subjects", payload: data })
    let subjectcollectionobj = req.app.get('subjectcollectionobj')
    subjectcollectionobj.insertOne(data)

})
app.post('/attendance', (req, res) => {
    let data = req.body
    let attendancecollectionobj = req.app.get('attendancecollectionobj')
    console.log(data)
    res.send({ message: "added attendance", payload: data })
    attendancecollectionobj.insertOne(data)

})
app.post('/getMedicalList', async (req, res) => {
    data = req.body
    let facultycollectionobj = req.app.get('facultycollectionobj')
    let faculty = await facultycollectionobj.find({ mail: data.email }).toArray()
    let studentcollectionobj = req.app.get('studentcollectionobj')
    let section = await faculty[0].branch
    console.log(section)
    let students = await studentcollectionobj.find({ branch: section }).toArray()
    names = []
    students.map((x) => {
        if (x.medicalproof == 'Y')
            names.push({ name: x.name, rollno: x.rollno, branch: x.branch, mobile: x.mobile })
    })
    res.send({ message: "medical list", payload: names })
    console.log(names)

})

app.put('/editStudent', async (req, res) => {
    let data = req.body.rollno
    let studentcollectionobj = req.app.get('studentcollectionobj')
    await studentcollectionobj.updateOne({ rollno: data }, { $set: { name: req.body.name, branch: req.body.branch } })
    res.send({ message: "updated", payload: data })
})
app.get('/getsubject', async (req, res) => {
    let subjectcollectionobj = req.app.get('subjectcollectionobj')
    let data = await subjectcollectionobj.find().toArray()
    res.send({ message: "data", payload: data })

})
app.post('/studentattendance', async (req, res) => {
    let studentAttendanceCollection = req.app.get('studentAttendanceCollection')
    let data = req.body
    await studentAttendanceCollection.insertOne(data)
    res.send({ message: 'data', payload: data })
    console.log(data)
})

app.post('/getattendance', async (req, res) => {

    data = req.body
    let facultycollectionobj = req.app.get('facultycollectionobj')
    let studentAttendanceCollection = req.app.get('studentAttendanceCollection')
    let faculty = await facultycollectionobj.find({ mail: data.email }).toArray()
    let studentcollectionobj = req.app.get('studentcollectionobj')
    let section = await faculty[0].branch
    console.log(section)
    let students = await studentAttendanceCollection.find({ branch: section }).sort({"rollno":1}).toArray()
    console.log(students)

    let attendancecollectionobj = req.app.get('attendancecollectionobj')
    let attendance = await attendancecollectionobj.find().toArray()
    let totalattendance = attendance[0].dbms + attendance[0].os + attendance[0].or
    console.log(totalattendance)

    let arr = []
    students.map((user, index) => {
        console.log(user, index)
        let d = user.dbms + user.os + user.or
        let osattendance = ((user.os / attendance[0].os) * 100).toFixed(2)
        let dbmsattendance = ((user.dbms / attendance[0].dbms) * 100).toFixed(2)
        let orattendance = ((user.or / attendance[0].or) * 100).toFixed(2)
        let percent = ((d / totalattendance) * 100).toFixed(2)

        arr.push({ rno: user.rollno, attendance: percent, osattendance: osattendance, dbmsattendance: dbmsattendance, orattendance: orattendance })
    })
    res.send({ message: "attendance", payload: arr })
    console.log(arr)

})

app.put("/updateattendance", async (req, res) => {
    studentAttendanceCollection = req.app.get("studentAttendanceCollection")
    let data = req.body
    attendace = await studentAttendanceCollection.findOne({ rollno: data.rno })
    console.log(attendace)

    await studentAttendanceCollection.updateOne({ rollno: data.rno }, { $set: { dbms: data.dbms + attendace.dbms, or: data.or + attendace.or, os: data.os + attendace.os } })
    res.send({ message: "attendance updated" })
})
app.post('/getbelow65', async (req, res) => {
    let data = req.body

    let facultycollectionobj = req.app.get('facultycollectionobj')
    let attendancecollectionobj = req.app.get('attendancecollectionobj')
    let studentAttendanceCollection = req.app.get('studentAttendanceCollection')
    
    let faculty = await facultycollectionobj.find({ mail: data.email }).toArray()

    let attendance = await attendancecollectionobj.find().toArray()
    let totalattendance = attendance[0].dbms + attendance[0].os + attendance[0].or
    console.log(totalattendance)
    let section = await faculty[0].branch
    console.log(section)
    let students = await studentAttendanceCollection.find({ branch: section }).sort({"rollno":1}).toArray()
    console.log(students)
    // console.log(data)
    let arr = []
    students.map((user, index) => {
        console.log(user, index)
        let d = user.dbms + user.os + user.or
        let percent = ((d / totalattendance) * 100).toFixed(2);
        if (percent < 65) {
            arr.push({ rno: user.rollno, attendance: percent })
        }
    })
    res.send({ message: "attendance", payload: arr })
    console.log(arr)
})
app.post('/insertFaculty', async (req, res) => {
    let facultycollectionobj = req.app.get('facultycollectionobj')
    let data = req.body
    await facultycollectionobj.insertOne(data)

    res.send({ message: "data", payload: data })





})

app.get('/getfaculty', async (req, res) => {
    let facultycollectionobj = req.app.get('facultycollectionobj')
    let data = await facultycollectionobj.find().toArray()
    console.log(data)
    res.send({ message: "data", payload: data })

})

app.post('/getsectio', async (req, res) => {

    data = req.body
    let facultycollectionobj = req.app.get('facultycollectionobj')
    let faculty = await facultycollectionobj.find({ mail: data.email }).toArray()
    let studentcollectionobj = req.app.get('studentcollectionobj')
    let section = await faculty[0].branch
    console.log(section)
    let students = await studentcollectionobj.find({ branch: section }).sort({"rollno":1}).toArray()
   
    res.send({ message: "hi", payload: students }) 
})

app.post('/addattendance',async(req,res) => {
    let body=req.body
    let sub=body.subject
    // console.log(body)
    console.log(sub)
    let studentAttendanceCollection=req.app.get('studentAttendanceCollection')
    let attendancecollectionobj = req.app.get('attendancecollectionobj')
    let mainattendance = await attendancecollectionobj.find().toArray()
    // console.log(mainattendance)
    let a=mainattendance[0]
    // console.log(a)
    // console.log(a[sub])
    attendancecollectionobj.updateOne({},{ $set: {  [sub]: a[sub]+1 } })
    let studentdata=body.rollno
    studentdata.map(async(x)=>{
        attendace = await studentAttendanceCollection.findOne({ rollno: x })
        studentAttendanceCollection.updateOne({ rollno: x }, { $set: {  [sub]: attendace[sub]+1 } })
    })
    // res.send({message:"hi"})

})
app.get('/getstudentscsbs',async(req,res)=>{
    let studentcollectionobj = req.app.get('studentcollectionobj')
    let data = await studentcollectionobj.find({branch:"CSBS"}).sort({"rollno":1}).toArray()
    res.send({ message: "data", payload: data })


})
app.get('/getstudentscse',async(req,res)=>{
    let studentcollectionobj = req.app.get('studentcollectionobj')
    let data = await studentcollectionobj.find({branch:"CSE"}).sort({"rollno":1}).toArray()
    res.send({ message: "data", payload: data })


})
app.get('/getstudentscsbs',async(req,res)=>{
    let studentcollectionobj = req.app.get('studentcollectionobj')
    let data = await studentcollectionobj.find({branch:"CSBS"}).sort({"rollno":1}).toArray()
    res.send({ message: "data", payload: data })


})

app.listen(5000, () => console.log("server listening on port 5000....."))