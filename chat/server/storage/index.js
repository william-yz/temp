'use strict'
const fs = require('fs')
const path = require('path')

const dirtySet = new Set()

const users = require('./users')

const ALL_STORES = {
  users
}


const find = (name, sth) => q => sth.filter(n => Object.keys(q).every(field => q[field] === n[field]))
const save = (name, sth) => user => {
  sth.push(user)
  dirtySet.add(name)
}

setInterval(() => {
  dirtySet.forEach( store =>
    fs.writeFile(path.join(__dirname,store+'.json') , JSON.stringify(ALL_STORES[store])))
  dirtySet.clear()
}, 5e3)

module.exports = {
  saveUser: save('users', users),
  findUser: find('users', users)
}
