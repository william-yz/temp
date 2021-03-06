'use strict'

const request = require('superagent')
const fs = require('fs')
const cheerio = require('cheerio')
const _ = require('lodash')
const curry = _.curry

const db = require('../db/db')

const createRequest = (url, config) => request.get(url).set('Cookie', config.cookie)

const save = curry((userId, page) => {
  db.insert('raw_pages', {page})
    .then(({insertedIds}) => {
      db.insert('all_users', {
        userId,
        followeesPageId : insertedIds[0]
      })
    })
  return page
})

const compressPage = response => {
  return response.text
    .replace(/<script.*\/script>/g,'')
    .replace(/<style.*\/style>/g,'')
    .replace(/<link.*\/?>/g,'')
    .replace(/<script.*\/>/g,'')
    .replace(/\n/g,'')
}

const saveFollowees = $ => {
  const nodes = $('a.author-link')
  for (let i = 0; i< nodes.length; i ++) {
    let node = nodes[i]
    const href = node.attribs.href
    const userId = href.substring(href.lastIndexOf('/') + 1)
    db.insert('raw_users', {userId})
  }
}


const getFollowees = (config, userId) => {
  const url = `https://www.zhihu.com/people/${userId}/followees`
  const requester = createRequest(url, config)
  fs.appendFile('./request.log', url + '\n')
  console.log(url)
  return requester.then(compressPage)
    .then(save(userId))
    .then(cheerio.load)
    .then(saveFollowees)
}

module.exports = {
  getFollowees : _.curry(getFollowees)
}
//l_n_c=1; q_c1=138fbf1249e5421c85f3b75b5816d1ca|1471338510000|1471338510000;  _xsrf=6ac9de7e6f65ba736e3ba81b0f000a92;  cap_id="NDUxNWM1NDQ0YmQ0NGFhN2IzMDkzZGE2MDQ2N2NlZGI=|1471338510|5b880c676b810874a8fecefa4c50679295680cca";  cap_id="NDUxNWM1NDQ0YmQ0NGFhN2IzMDkzZGE2MDQ2N2NlZGI=|1471338510|5b880c676b810874a8fecefa4c50679295680cca"; l_cap_id="ODU3YzQwMDE3ZWE3NDQ2NDk3ODZmM2NiMjZhMGQzZDI=|1471338510|ffbedf74018cf519f778f5edad72b3311bbb8154";  cap_id="NDUxNWM1NDQ0YmQ0NGFhN2IzMDkzZGE2MDQ2N2NlZGI=|1471338510|5b880c676b810874a8fecefa4c50679295680cca"; l_cap_id="ODU3YzQwMDE3ZWE3NDQ2NDk3ODZmM2NiMjZhMGQzZDI=|1471338510|ffbedf74018cf519f778f5edad72b3311bbb8154"; d_c0="AJDAhnW6ZAqPTvTtVXz41ANzdhYAXUXAANs=|1471338457";  cap_id="NDUxNWM1NDQ0YmQ0NGFhN2IzMDkzZGE2MDQ2N2NlZGI=|1471338510|5b880c676b810874a8fecefa4c50679295680cca"; l_cap_id="ODU3YzQwMDE3ZWE3NDQ2NDk3ODZmM2NiMjZhMGQzZDI=|1471338510|ffbedf74018cf519f778f5edad72b3311bbb8154"; d_c0="AJDAhnW6ZAqPTvTtVXz41ANzdhYAXUXAANs=|1471338457"; _zap=b5ca7f91-cf59-45dc-a67d-8084e1312b2e; _za=7d5811dd-626d-414e-953c-3129331231b2;  cap_id="NDUxNWM1NDQ0YmQ0NGFhN2IzMDkzZGE2MDQ2N2NlZGI=|1471338510|5b880c676b810874a8fecefa4c50679295680cca"; l_cap_id="ODU3YzQwMDE3ZWE3NDQ2NDk3ODZmM2NiMjZhMGQzZDI=|1471338510|ffbedf74018cf519f778f5edad72b3311bbb8154"; d_c0="AJDAhnW6ZAqPTvTtVXz41ANzdhYAXUXAANs=|1471338457"; _zap=b5ca7f91-cf59-45dc-a67d-8084e1312b2e; _za=7d5811dd-626d-414e-953c-3129331231b2; __utma=51854390.501247466.1471338459.1471338459.1471338459.1; __utmb=51854390.20.10.1471338459; __utmc=51854390; __utmz=51854390.1471338459.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100--|2=registration_date=20160816=1^3=entry_date=20160816=1; __utmt=1; login="YzZmYmMzNmZhMzhiNGEzZWJiZDRlMTE1Njk1ZWM3NWE=|1471338641|9ad9233e7e578b54c613a179cd3398d87248a50f";  cap_id="NDUxNWM1NDQ0YmQ0NGFhN2IzMDkzZGE2MDQ2N2NlZGI=|1471338510|5b880c676b810874a8fecefa4c50679295680cca"; l_cap_id="ODU3YzQwMDE3ZWE3NDQ2NDk3ODZmM2NiMjZhMGQzZDI=|1471338510|ffbedf74018cf519f778f5edad72b3311bbb8154"; d_c0="AJDAhnW6ZAqPTvTtVXz41ANzdhYAXUXAANs=|1471338457"; _zap=b5ca7f91-cf59-45dc-a67d-8084e1312b2e; _za=7d5811dd-626d-414e-953c-3129331231b2; __utma=51854390.501247466.1471338459.1471338459.1471338459.1; __utmb=51854390.20.10.1471338459; __utmc=51854390; __utmz=51854390.1471338459.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100--|2=registration_date=20160816=1^3=entry_date=20160816=1; __utmt=1; login="YzZmYmMzNmZhMzhiNGEzZWJiZDRlMTE1Njk1ZWM3NWE=|1471338641|9ad9233e7e578b54c613a179cd3398d87248a50f"; a_t="2.0AGCAie26ZAoXAAAAm2XaVwBggIntumQKAJDAhnW6ZAoXAAAAYQJVTZtl2lcA2FRpg94CjpgNuxrD0B0Vr-u3jEtkGn5VX3DB9p_FfO0bOzCMHHWGSQ==";  cap_id="NDUxNWM1NDQ0YmQ0NGFhN2IzMDkzZGE2MDQ2N2NlZGI=|1471338510|5b880c676b810874a8fecefa4c50679295680cca"; l_cap_id="ODU3YzQwMDE3ZWE3NDQ2NDk3ODZmM2NiMjZhMGQzZDI=|1471338510|ffbedf74018cf519f778f5edad72b3311bbb8154"; d_c0="AJDAhnW6ZAqPTvTtVXz41ANzdhYAXUXAANs=|1471338457"; _zap=b5ca7f91-cf59-45dc-a67d-8084e1312b2e; _za=7d5811dd-626d-414e-953c-3129331231b2; __utma=51854390.501247466.1471338459.1471338459.1471338459.1; __utmb=51854390.20.10.1471338459; __utmc=51854390; __utmz=51854390.1471338459.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100--|2=registration_date=20160816=1^3=entry_date=20160816=1; __utmt=1; login="YzZmYmMzNmZhMzhiNGEzZWJiZDRlMTE1Njk1ZWM3NWE=|1471338641|9ad9233e7e578b54c613a179cd3398d87248a50f"; a_t="2.0AGCAie26ZAoXAAAAm2XaVwBggIntumQKAJDAhnW6ZAoXAAAAYQJVTZtl2lcA2FRpg94CjpgNuxrD0B0Vr-u3jEtkGn5VX3DB9p_FfO0bOzCMHHWGSQ=="; z_c0=Mi4wQUdDQWllMjZaQW9Ba01DR2RicGtDaGNBQUFCaEFsVk5tMlhhVndEWVZHbUQzZ0tPbUEyN0dzUFFIUld2NjdlTVN3|1471338651|3fdae4649ff5634704831193c6c3e5904f396c6f;
