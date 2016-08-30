const users = {
  'yangwi' : '1234',
  'fuma2' : '1234'
};



module.exports = {
  exist : id => !!users[id],

  check : (id, password) => !!users[id] && users[id] === password
}
