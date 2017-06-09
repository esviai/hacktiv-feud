const CronJob = require('cron').CronJob
const util = require('../helpers/util')

const startServer = new Date()
var surveyTime = startServer
var gameTime = startServer


const scheduler = function() {
  gameTime = util.gameTime(surveyTime)

}
