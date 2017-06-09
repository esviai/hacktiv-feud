const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: 'sidik.haktiv8@gmail.com',
    pass: 'c0dingsiangmalam'
  }
});

var CronJob = require('cron').CronJob;
var kue = require('kue'),
  queue = kue.createQueue();

new CronJob('* * 12 6 5 2', function() {
  queueEmail('priambodo@gmail.com')
  queueEmail('sidik.riders@gmail.com')
  queueEmail('sidik.hidayatullah@gmail.com')
  this.stop()
}, null, true, 'Asia/Jakarta');

function queueEmail(receiver) {
  var job = queue.create('email', {
    from: '"Hacktiv - Feud" <hacktiv-feud@aquarius.com>',
    to: receiver,
    subject: 'PERINGATAN!! PERMAINAN AKAN DI MULAI',
    text: 'PERINGATAN',
    html: '<h1>PERINGATAN!!</h1><p> permainan sebentar lagi akan di mulai🐈</p><p> hacktiv-feud sangat menyenangkan ketika tidak telat saat memulai permainan</p>'
  }).save(function(err) {
    if (!err) console.log(job.id);
  });

queue.process('email', function(job, done) {
  transporter.sendMail(job.data, (error, info) => {
  if (error) {
      return console.log(error);
  } else {
    return console.log('sukses coi');
  }
  done()
});
