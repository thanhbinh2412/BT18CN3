<template>
  <div class="body">
    <div class="login">
      <p>ĐĂNG NHẬP</p>
      <div class="form-group pd-20">
        <input
          type="text"
          placeholder="USERNAME"
          class="form-control cus"
          v-model="username"
        />
      </div>
      <div class="form-group pd-10">
        <input
          type="password"
          placeholder="PASSWORD"
          class="form-control cus"
          v-model="password"
        />
      </div>
      <div class="btn-wrapp pd-20">
      <button @click="login()" type="button" class="btn btn-success cus-btn">
        Login
      </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      users: [],
      user: [],
      username: "",
      password: "",
    };
  },
  methods: {
    // 1: teacher 2:student
    login() {
      if (this.validateLogin()) {
        console.log("dawng nhap thanh cong");
        this.$router.push({
          path: "Home"
        });

        sessionStorage.ID = this.user.ID
      } else {
        console.log("sai mat khau");
        alert("sai mat khau r");
      }
    },
    validateLogin() {
      for (let i in this.users) {
        if (
          (this.username === this.users[i].USERNAME &&
          this.password === this.users[i].PASSWORD) 
          || (this.username === this.users[i].MA_SV &&
          this.password === this.users[i].PASSWORD)
        ) {
          this.user = this.users[i];
          return true;
        }
      }
    },
    getData() {
      axios
        .post(`${window.api_url}/login-list`, {
          body: {
            username: this.username,
            password: this.password,
          },
        })
        .then(async (response) => {
          var code = response.data.data;
          this.users = code;
        });
    },
  },
  beforeCreate(){
    sessionStorage.clear();
  },
  created: function() {
    this.getData();
  },
  components: {},
};
</script>

<style>

@font-face {
  font-family: Montserrat-Regular;
  src: url('../assets/montserrat/Montserrat-ExtraBold.ttf'); 
}

@font-face {
  font-family: Montserrat-Bold;
  src: url('../assets/montserrat/Montserrat-Bold.ttf'); 
}

.body{
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  /* background-image: url('../assets/dh-kien-truc-hn.jpg'); */
  background: transparent url('../assets/dh-kien-truc-hn.jpg') 0% 0% no-repeat padding-box;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.body::before{
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #21D4FD;
/* background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%); */
background: transparent linear-gradient(26deg, #F15E84 0%, #F15E84 20%, #6575F1 72%, #4A5EF3 100%) 0% 0% no-repeat padding-box;
opacity: 0.9;
}

.login {
  width: 600px;
  padding: 100px;
}
.login p{
  text-align: center;
  padding: 20px;
  font-family: Montserrat-Bold!important;
  font-size: 30px;
  color: #fff;
  line-height: 1.2;
  font-weight: bold;
}
.pd-20{
  padding: 10px 20px;
}
.pd-10{
  padding: 0px 20px;
}

.cus{
  width: 100%;
  height: 40px;
  border-radius: 20px;
  padding: 0 20px;
  font-family: Montserrat-Bold;
  font-size: 14px;
}
.btn-wrapp{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
}

.cus-btn{
  width: 130px;
  height: 40px;
  border-radius: 20px;
  font-family: Montserrat-Bold;
  background-color: #FBDA61;
background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
border: none;
transition: 0.6s ease-in;
}
.cus-btn:hover{
  background-color: #FBDA61;
background-image: linear-gradient(-45deg, #FBDA61 0%, #FF5ACD 100%);
}

/* ::-webkit-input-placeholder {
   text-align: center;
} */


</style>
