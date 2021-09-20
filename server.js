const express = require('express')
const app = express()
var dateFormat = require('dateformat');
const cors = require('cors')
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const bodyParser = require("body-parser");
const router = express.Router();
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  username: {
    type: String,
    unique: true
  }
});
const STAFF_MODEL = mongoose.model("STAFF", staffSchema);

const subjectSchema = new Schema({
  subjectname: {
    type: String,
    unique: true
  },
  subjectcode: {
    type: String,
    unique: true
  },
  professorname: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const SUBJECT_MODEL = mongoose.model("SUBJECT", subjectSchema);

app.post('/api/staffmembers', async function (req, res) {
  var newStaffMember = new STAFF_MODEL({
    username: req.body.username
  });

  newStaffMember.save(function(err, created) {
    if (err) {
      return res.json(err);
      }else{
      res.json({
        _id: created._id,
        username: created.username
      })
      }
    });
});

app.get('/api/staffmembers', async function (req, res) {
  
  STAFF_MODEL.find(function(err, data) {
    if (err) {
      return res.json(err);
    }else{
      res.json(data)
      }
    });
});

app.post('/api/staffmembers/:username/subjects', async function (req, res) {
  var dateRec;
  
  var subject = {
    subjectname: req.body.subjectname,
    subjectcode: req.body.subjectcode,
    professorname: req.body.professorname
  }
  
  STAFF_MODEL.find({username: req.params.username}
  , (err, staffFound) => {
      if (err) {
        console.log('Error in updating data: '+err);
      }

      if(staffFound){

      var newSubject = new SUBJECT_MODEL(subject);

      newSubject.save(function(err, created) {
        if (err) {
          return res.json(err);
        }else{
          res.json({
          'created by': staffFound.username,
          subjectname: created.subjectname,
          subjectcode: created.subjectcode,
          professorname: created.professorname,
          createdAt: dateFormat(new Date(created.createdAt), "ddd mmm dd yyyy").toString()
        })
      }
    });

      }else{
        return res.json({error: 'Staff member not found...'});
      }
  });
});

app.get('/api/staffmembers/:username?', async function (req, res) {
  const { sub_name, sub_code, prof_name} = req.query;

  STAFF_MODEL.findOne({username: req.params.username}
  , (err, staffFound) => {
      if (err) {
        return res.json({error: 'error in fetching data'});
      }

      if(staffFound){

        var builtQuery = undefined;

        if(sub_name && sub_code && prof_name){
          builtQuery = {
            subjectname: sub_name,
            subjectcode: sub_code,
            professorname: prof_name
          }
        }else if(sub_name && sub_code){
          builtQuery = {
            subjectname: sub_name,
            subjectcode: sub_code
          }
        }else if(sub_name && prof_name){
          builtQuery = {
            subjectname: sub_name,
            professorname: prof_name
          }
        }else if(sub_code && prof_name){
          builtQuery = {
            subjectcode: sub_code,
            professorname: prof_name
          }
        }else if(sub_name){
          builtQuery = {
            subjectname: sub_name
          }
        }else if(sub_code){
          builtQuery = {
            subjectcode: sub_code
          }
        }else if(prof_name){
          builtQuery = {
            professorname: prof_name
          }
        }

        SUBJECT_MODEL.find(builtQuery, function(err, subjectsFound) {
          if (err) {
            return res.json(err);
          }else{
            res.json(subjectsFound)
          }
        });
        
      }else{
        return res.json({error: 'Staff member not found...'});
      }
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
