var router = require('express').Router()
var Users = require('../models/user')


// You never create a route like '/api/users' -- except perhaps for a priveledged admin user
router.post('/auth/register', (req, res) => { // never call 'next' inside an auth route!
  // @ts-ignore
req.body.password = Users.generateHash(req.body.password)  // don't bother with a confirmPassword on backend -- use that for front-end validation
  Users.create(req.body)
    .then(user => {
      if (!user) {
        return res.status(401).send({ error: 'Invalid username and/or password' })
      }
      user.password = null // probably Mongoose doesn't let you delete the password!!
      delete user.password // don't send the (hashed) password to the front-end
      req.session.uid = user._id // save the userId into the session
      res.send(user)
    })
    .catch(err => {
      res.status(401).send({ error: 'Invalid username and/or password' }) // do not send the 'err' object back -- giving too much info to potential hackers!
    })
})
router.post('/auth/login', (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).send({ error: 'Invalid username and/or password' })
      }
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ error: 'Invalid username and/or password' })
      }
      user.password = null // probably Mongoose doesn't let you delete the password!!
      delete user.password // don't send the (hashed) password to the front-end
      req.session.uid = user._id // save the userId into the session
      res.send({ Message: "Successfully Logged In", user })
    })
    .catch(err => {
      res.status(401).send({ error: 'Invalid username and/or password' }) // do not send the 'err' object back -- giving too much info to potential hackers!
    })
})
router.get('/auth/authenticate', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(401).send({ error: "Please Login to Continue" })
      }
      user.password = null;
      delete user.password;
      return res.status(200).send(user)
    }).catch(err => {
      return res.status(500).send({
        error: err
      })
    })
})
router.delete('/auth/logout', (req, res) => {
  // @ts-ignore
req.session.destroy()
  res.send("Successfully logged out")
})

module.exports = router