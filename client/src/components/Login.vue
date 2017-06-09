<template>
<div style="background: #e5e5e5">
  <div class="container">
    <div style='width: 100%; background-color: white; position: fixed; top: -2px; z-index: 5000; right: 0px;'>
      <nav class='nav container' style='max-width: 1000px'>
        <div class='nav-left'>
          <a class='nav-item'>
              <img src='http://i.imgur.com/NYfFAFr.png' alt='Hacktiv8 100 logo'>
            </a>
        </div>
        <p class='nav-item'>Already have an account? </p>
        <div class='nav-item'>
          <div class='field is-grouped'>
            <p class='control'>
              <a class='button is-warning' v-on:click='showlogin'>
                Sign In
              </a>
            </p>
            <div v-bind:class='modalClass' id='login-modal'>
              <div class='modal-background' v-on:click='closeModal'></div>
              <div class='modal-content' style='width: 30%;'>
                <div class='box' style='text-align: left;'>
                  <label class='label'>Username</label>
                  <p class='control has-icons-left'>
                    <input class='input' v-model='loginUsername' type='text' placeholder='username'>
                    <span class='icon is-small is-left'>
                      <i class='fa fa-user'></i>
                    </span>
                  </p><br>
                  <label class='label'>Password</label>
                  <p class='control has-icons-left'>
                    <input class='input' v-model='loginPassword' type='password' placeholder='password'>
                    <span class='icon is-small is-left'>
                      <i class='fa fa-key'></i>
                    </span>
                  </p><br>
                  <div style='text-align:right'>
                    <a class='button is-warning' @click='loginManual'>
                        <span>Log In</span>
                      </a>

                  </div>
                </div>
              </div>
              <button class='modal-close' v-on:click='closeModal'></button>
            </div>

          </div>
        </div>

      </nav>
    </div>
    <div class='columns' style='max-width: 1000px; padding-top: 45px;'>
      <div class='column is-two-thirds'>
        <div class='contentnya-ini' style='padding-top: 91px'>

          <div class='content-text' style='width: 80%; text-align: justify'>
            <h2 class='title is-2'>Hacktiv8 100</h2>
            <h6 class='subtitle is-6'>adalah sebuah platform permainan yang di adopsi dari acara family 100, hacktiv8 100 sangat menyenangkan untuk dimainkan bersma keluarga dan teman-teman</h6>
          </div>

          <div class='animasi-logo' style='position: relative; left: 157px; top: 61px; width: 40%;'>
            <img class='animasi satu' src='http://i.imgur.com/klPiXks.png' alt='fox-and-text' style='width: 30vw; position: absolute;'>
            <img class='animasi dua' src='http://i.imgur.com/Mk287jx.png' alt='topi-dan-kacamata' style='width: 30vw; position: absolute; opacity: 0.8'>
            <img class='animasi satu' src='http://i.imgur.com/4XFw7fe.png' alt='hidung' style='width: 30vw; position: absolute;'>
          </div>
        </div>
      </div>
      <div class='column'>
        <br>
        <h1 class='title is-3'>Daftar</h1>
        <h3 class='subtitle is-5'>Gratis. Selama masih berlaku</h3>
        <div class='field'>
          <label class='label'>Name</label>
          <p class='control has-icons-left'>
            <input v-model='user.name' class='input' type='text' placeholder='name'>
            <span class='icon is-small is-left'>
                <i class='fa fa-address-book'></i>
              </span>
          </p><br>
          <label class='label'>Username</label>
          <p class='control has-icons-left'>
            <input v-model='user.username' class='input' type='text' placeholder='username'>
            <span class='icon is-small is-left'>
                <i class='fa fa-user'></i>
              </span>
          </p><br>
          <label class='label'>Password</label>
          <p class='control has-icons-left'>
            <input v-model='user.password' class='input' type='password' placeholder='password'>
            <span class='icon is-small is-left'>
                <i class='fa fa-key'></i>
              </span>
          </p><br>
          <label class='label'>Email</label>
          <p class='control has-icons-left'>
            <input v-model='user.email' class='input' type='email' placeholder='email'>
            <span class='icon is-small is-left'>
                <i class='fa fa-envelope'></i>
              </span>
          </p><br>
          <label class='label'>Phone</label>
          <p class='control has-icons-left'>
            <input v-model='user.phone' class='input' type='email' placeholder='phone'>
            <span class='icon is-small is-left'>
                <i class='fa fa-mobile'></i>
              </span>
          </p><br>
          <span class='control'>
                <a class='button is-warning' v-on:click='daftarbaru'>
                  <span>Sign Up</span>
          </a>
          </span>
          <span style='top: 6px; position: relative; left: 8px;'>
                <span>Or</span>
          </span>
          <div class='is-grouped' style='position: relative; left: 124px; bottom: 34px;'>
            <span class='control'>
                  <a class='button is-primary is-outlined' onclick='alert(`mohon maaf, untuk saat ini login melalui Twiiter masih dalam tahap pengembangan
                    \nWe are sorry, but at the moment login via twitter is still under development
                    \n죄송 합니다만, 트위터를 통한 로그인은 아직 개발 단계에 있습니다.`)'>
                    <span>Sign in </span>
            <span class='icon'>
                      <i class='fa fa-twitter'></i>
                    </span>
            </a>
            </span>
            <!-- <span v-if='isLogin == false' class='control'>
                  <a class='button is-info is-outlined' onclick='loginWithFB()'>
                    <span>Sign in </span>
            <span class='icon'>
                      <i class='fa fa-facebook'></i>
                    </span>
            </a>
            </span>
            <span v-else-if='isLogin == true' class='control'>
                  <a class='button is-info is-outlined' onclick='logoutFromFB()'>
                    <span>Log Out from </span>
            <span class='icon'>
                      <i class='fa fa-facebook'></i>
                    </span>
            </a>
            </span> -->
            <span class='control'>
                  <a class='button is-info is-outlined' onclick='loginWithFB()'>
                    <span>Sign in </span>
            <span class='icon'>
                      <i class='fa fa-facebook'></i>
                    </span>
            </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->

  <div style='width: 100%; margin-top:2rem; padding-top:1rem; padding-bottom:1rem; background: white;'>
    <div class='content has-text-centered'>
      <p>
        <strong>Hackti8100</strong> by <a href='http://www.dafont.com/dk-hexenhammer.font?text=Sidik+Aldi+Zulfikar+Shabrina' target='_blank'>Sial Zubrin</a>. The source code is not licensed . The website content is also not licensed.
      </p>
      <p>
        <a class='icon is-warning' href='https://github.com/ingelieur/hacktiv-feud' target='_blank'>
            <i class='fa fa-github'></i>
          </a>
      </p>
    </div>
  </div>

</div>
</template>

<script>
export default {
  props: ['user', 'isLogin'],
  data () {
    return {
      modalClass: 'modal',
      loginUsername: '',
      loginPassword: ''
    }
  },
  methods: {
    showlogin () {
      this.modalClass = 'modal is-active'
    },
    closeModal () {
      this.modalClass = 'modal'
    },
    daftarbaru () {
      alert(`daftar akun baru dengan`)
    },
    loginManual () {
      alert(`mencoba login dengan\n
        username: ${this.loginUsername}\n
        password: ${this.loginPassword}`)
    }
  }
}

</script>
<!-- <script type='text/javascript' src='../fbLogin'></script> -->

<style>
@keyframes naikturun {
  0% {
    top: 0px;
    /*opacity: 0.5;*/
  }
  50% {
    top: 20px;
    /*opacity: 1;*/
  }
  100% {
    top: 0px;
    /*opacity: 0.5;*/
  }
}

.satu {
  animation-name: naikturun;
  animation-timing-function: linear;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.dua {
  animation-name: naikturun;
  animation-timing-function: linear;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-delay: 0.5s;
}
</style>
