window.fbAsyncInit = function() {
  FB.init({
    appId: '1922259988055135',
    cookie: true,
    xfbml: true,
    version: 'v2.8'
  });
  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response) {
    console.log('ini dari inisiasi FB SDK');
    console.log(response);
    if (response.status == "not_authorized") {
      console.log('belum login app, tapi sudah login fb');
      app.isLogin = false
    } else if (response.status == 'connected') {
      console.log('sudah login app, sudah login fb');
      app.isLogin = true
    } else {
      console.log('belum dua dua nya');
      app.isLogin = false
    }
  });
};

function loginWithFB() {
  FB.login(function(response) {
    console.log('ini dari fungsi FB.login');
    console.log(response);
    if (response.status == "not_authorized") {
      alert('belum login app, tapi sudah login fb');
      app.isLogin = false
    } else if (response.status == 'connected') {
      alert('sudah login app, sudah login fb');
      app.isLogin = true
    } else {
      alert('belum dua dua nya');
      app.isLogin = false
    }
  })
}

function logoutFromFB() {
  FB.logout(function(response) {
    app.isLogin = false
    alert('sudah logout yaa')
    console.log(response);
  })
}

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// ini bagiannya TWITTER -------------------------------------------------------
function loginWithTwitter() {
  alert(`mohon maaf, untuk saat ini login melalui Twiiter masih dalam tahap pengembangan
    \nWe are sorry, but at the moment login via twitter is still under development
    \n죄송 합니다만, 트위터를 통한 로그인은 아직 개발 단계에 있습니다.`)
}
