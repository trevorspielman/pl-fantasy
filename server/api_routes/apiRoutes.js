var router = require('express').Router();
var axios = require('axios')

var key = '?key=e96ab9f00ea6c4d6e6ad50967fc0627d'
let beerDB = axios.create({
  baseURL: 'http://api.brewerydb.com/v2/',
  timeout: 10000
})


router.get('/api/styles', (req, res, next) => {
  beerDB.get('http://api.brewerydb.com/v2/styles' + key)
    .then(response => {
      res.send(response.data.data)
    })
})


router.get('/api/categories', (req, res, next) => {
  beerDB.get('http://api.brewerydb.com/v2/categories' + key)
    .then(response => {
      res.send(response.data.data)
    })
})

router.get('/api/fermentables', (req, res, next) => {
  var page = 0
  var promises = []
  for (let i = 1; i < 5; i++) {
    page++
    promises.push(beerDB.get('http://api.brewerydb.com/v2/fermentables' + key + '&p=' + page)
      .then(response => {
        return response.data.data
      })
      .catch(err => {
        console.error(err)
      })
    )
  }
  Promise.all(promises)
    .then(results => {
      var fermentableArr = []
      for (let i = 0; i < results.length; i++) {
        const fermentArr = results[i];
        fermentableArr = fermentableArr.concat(fermentArr)
      }
      res.send(fermentableArr)
    })
    .catch(err => {
      console.error(err)
    })
})

router.get('/api/hops', (req, res, next) => {
  var page = 0
  var promises = []
  for (let i = 0; i < 4; i++) {
    page++
    promises.push(beerDB.get('http://api.brewerydb.com/v2/hops' + key + '&p=' + page)
      .then(response => {
        return response.data.data
      })
      .catch(err => {
        console.error(err)
      })
    )
  }
  Promise.all(promises)
    .then(results => {
      var hopsArr = []
      for (let i = 0; i < results.length; i++) {
        const hopArr = results[i];
        hopsArr = hopsArr.concat(hopArr)
      }
      res.send(hopsArr)
    })
    .catch(err => {
      console.error(err)
    })
})

router.get('/api/yeasts', (req, res, next) => {
  var page = 0
  var promises = []
  for (let i = 0; i < 8; i++) {
    page++
    promises.push(beerDB.get('http://api.brewerydb.com/v2/yeasts' + key + '&p=' + page)
      .then(response => {
        return response.data.data
      })
      .catch(err => {
        console.error(err)
      })
    )
  }
  Promise.all(promises)
    .then(results => {
      var yeastsArr = []
      for (let i = 0; i < results.length; i++) {
        const yeastArr = results[i];
        yeastsArr = yeastsArr.concat(yeastArr)
      }
      res.send(yeastsArr)
    })
    .catch(err => {
      console.error(err)
    })
})

router.get('/api/adjuncts', (req, res, next) => {
  setTimeout(function () {
    var page = 0
    var promises = []
    for (let i = 0; i < 15; i++) {
      page++
      promises.push(beerDB.get('http://api.brewerydb.com/v2/adjuncts' + key + '&p=' + page)
        .then(response => {
          return response.data.data
        })
        .catch(err => {
          console.error(err)
        })
      )
    }
    Promise.all(promises)
      .then(results => {
        var adjunctsArr = []
        for (let i = 0; i < results.length; i++) {
          const adjunctArr = results[i];
          adjunctsArr = adjunctsArr.concat(adjunctArr)
        }
        res.send(adjunctsArr)
      })
      .catch(err => {
        console.error(err)
      })
  }, 200)
})


module.exports = { router };