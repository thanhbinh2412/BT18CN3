<template>
  <div class="changePass">
    <div class="row mg-top-15">
      <div class="col-md-6 d-flex flex-row-reverse">
        <p>THAY ĐỔI MẬT KHẨU</p>
      </div>
      <div class="col-md-6 d-flex flex-row-reverse">
        <div @click="cancelChangePass" class="btn btn-danger">X</div>
      </div>
    </div>
    <div class="col text-center">
      <div class="col-md-4 mg-top-15">
        <label for="mk-cu">Mật khẩu cũ: </label>
        <input
          type="password"
          id="mk-cu"
          class="form-control"
          v-model="oldPass"
        />
      </div>
      <div class="col-md-4 mg-top-15">
        <label for="mk-moi">Mật khẩu mới: </label>
        <input
          type="password"
          id="mk-moi"
          class="form-control"
          v-model="newPass"
        />
      </div>
      <div class="col-md-4 mg-top-15">
        <label for="mk-moi-cf">Nhập lại mật khẩu mới: </label>
        <input
          type="password"
          id="mk-moi-cf"
          class="form-control"
          v-model="cfPass"
        />
      </div>
      <div class="col-md-4 mg-top-15">
        <div class="row">
          <div class="col-md-6">
            <div @click="cancelChangePass" class="btn btn-danger btn-block">
              Thoát
            </div>
          </div>
          <div class="col-md-6">
            <div @click="changePass" class="btn btn-success btn-block">
              Thay đổi
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "change-pass",
  props: {
    password: {
      type: String,
    },
  },
  data() {
    return {
      oldPass: "",
      newPass: "",
      cfPass: "",
    };
  },
  methods: {
    cancelChangePass() {
      this.$emit("cancelChangePass");
    },
    validateForm() {
      var me = this;
      if (me.oldPass != this.password) {
        return false;
      }

      if (me.newPass != me.cfPass) {
        return false;
      }

      return true;
    },
    changePass() {
      var me = this;
      if (this.validateForm() == true) {
        axios
          .post(`${window.api_url}/chagepassword`, {
            NEW_PASS: this.newPass,
            ID: sessionStorage.ID,
          })
          .then(function(response) {
            if (response.data.code == 1) {
              me.$router.push({
                path: "/",
              });
            }
          });
      }else{
        alert("Mat Khau Cu khong Chinh xac hoac mat khau cf k khop");
      }
    },
  },
};
</script>

<style>
.mg-top-15 {
  margin-top: 15px;
}
.mg-auto {
  margin: auto;
}
</style>
