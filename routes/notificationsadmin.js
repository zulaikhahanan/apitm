const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Acct = require('../models/accounts');
const Tasks = require('../models/tasks');


//Get To  Admin Notification Page
router.get('/notificationsadmin', ensureAuthenticated, (req,res) => {
    
  const _id = ObjectID(req.session.passport.user);

  Acct.getById(_id, function(results){
    
      Tasks.getAll(function(taskList){
        console.log(taskList)
        var Completed = taskList.filter(obj => {
          return obj.status !== "Incomplete";
        })

        var Incomplete = taskList.filter(obj => {
          return obj.status === "Incomplete";
          
        })
        res.render('notificationsadmin', {title: 'SmartList - Admin Notifications',
          username: results.username,
          profilepic: results.profilepic,
          fullname: results.fullname,
          incompletetask:Incomplete,
          completetask:Completed,
          taskList:taskList
        
        });
      })
  })
})


module.exports = router;