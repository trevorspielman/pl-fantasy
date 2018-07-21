var router = require('express').Router();
var Board = require('../models/recipe');
var Users = require('../models/user');

//Get Users by email
router.get('/api/users', (req, res, next) => {
  Users.findOne({email: req.body.email})
    .then( user => {
      console.log(user)
      if(!user) {
        return res.status(401).send({error: 'Invalid username'})
      }
      user.password = null // probably Mongoose doesn't let you delete the password!!
      delete user.password // don't send the (hashed) password to the front-end
      res.send({user})
    })
    .catch( err => {
      res.status(401).send({error: 'Invalid username'}) // do not send the 'err' object back -- giving too much info to potential hackers!
    })
})

router.get('/api/users/:userid', (req, res, next) => {
  Users.findById(req.params.userid)
    .then(user => {
      if (user){
        user.password = null // probably Mongoose doesn't let you delete the password!!
        delete user.password
      }
      res.send(user)
    })
    .catch(err => {
      console.error(err)
    })
})

router.put('/api/users/:userid', (req, res, next) => {
  Users.findById(req.params.userid)
    .then(user => {
      for (var key in req.body){
        if (key != 'password' && key != '_id'){
          user[key] = req.body[key]
        }
      }
      user.password = null
      delete user.password
      res.send(user)
    })
    .catch(err => {
      console.error(err)
    })
})

router.put('/api/users/:userid/shoppingList', (req, res, next) => {
  Users.findById(req.params.userid)
    .then(user => {
      user.shoppingList.fermentables = req.body.fermentables
      user.shoppingList.hops = req.body.hops
      user.shoppingList.steepingGrains = req.body.steepingGrains
      user.shoppingList.adjuncts = req.body.adjuncts
      user.shoppingList.yeasts = req.body.yeasts
      user.markModified('shoppingList')
      user.save() // probably Mongoose doesn't let you delete the password!!
      res.send(user)
    })
    .catch(err => {
      console.error(err)
    })
})

router.put('/api/users/:userid/followers', (req, res, next) => {
  Users.findById(req.params.userid)
    .then(user => {
      user.following.push(req.body)
      user.markModified('following')
      user.save()
      res.send(user)
    })
    .catch(err => {
      console.error(err)
    })
})

router.delete('/api/users/:userid/followers/:followerid', (req, res, next) => {
  Users.findById(req.params.userid)
    .then(user => {
      for (var i = 0; i < user.following.length; i++){
        if (user.following[i]._id == req.params.followerid){
          user.following.splice(i, 1)
          user.save()
          break;
        }
      }
      res.send(user)
    })
    .catch(err => {
      console.error(err)
    })
})






module.exports = { router };