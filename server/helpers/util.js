var addZeroTo = (num) => {
  return parseInt(num) < 10 ? num='0'+num : num=num
}

var cronTimePattern = (dateNow) => {
  let minutes = addZeroTo(dateNow.getMinutes())
  let hours = addZeroTo(dateNow.getHours())
  let date = addZeroTo(dateNow.getDate())
  let month = addZeroTo(dateNow.getMonth())
  let year = dateNow.getYear() - 100
  return `00 ${minutes} ${hours} ${date} ${month} ${year}`
}

var gameTime = ((surveyTime) => {
  let gameTime = new Date()
  return gameTime.setMinutes(surveyTime.getMinutes() + 5)
})

var surveyTime = ((gameTime) => {
  let surveyTime = new Date()
  return surveyTime.setMinutes(gameTime.getMinutes() + 5)
})

//let times = [new Date(), new Date()]
//let cronTimes = ["",""]
//
//for(let i=0; i<10; i++) {
//  times[0] = new Date(gameTime(times[1]))
//  times[1] = new Date(surveyTime(times[0]))
//  cronTimes[0] = cronTimePattern(times[0])
//  cronTimes[1] = cronTimePattern(times[1])
//  //console.log(cronTimes)
//}

module.exports = {
  gameTime,
  surveyTime,
  cronTimePattern
}
