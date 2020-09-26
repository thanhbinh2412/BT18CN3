<template>
  <div class="edit">
    <div class="card">
      <div class="card-body">
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Ho"
                v-model="user.FIRST_NAME"
              />
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Ten"
                v-model="user.LAST_NAME"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Ten dang Nhap"
                v-model="user.USERNAME"
              />
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                id="password"
                placeholder="Mat khau"
                v-model="user.PASSWORD"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <select
                class="form-control"
                v-model="user.CLASS"
              >
                <option v-bind:value="item.CLASS_NAME" v-bind:key="index" v-for="(item, index) in this.lstClass">{{ item.CLASS_NAME }}</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                id="ngaySinh"
                placeholder="Ngay sinh"
                v-model="user.BIRTHDAY"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <button v-on:click="cancelEdit" class="btn btn-danger btn-block">
                Cancel
              </button>
            </div>
            <div class="col-md-6">
              <button v-on:click.prevent="edit" class="btn btn-primary btn-block">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "editInf",
  props: {
    inf: {},
  },
  data() {
    return {
      user: {
        FIRST_NAME: this.inf.FIRST_NAME,
        LAST_NAME: this.inf.LAST_NAME,
        USERNAME: this.inf.USERNAME,
        PASSWORD: this.inf.PASSWORD,
        CLASS: this.inf.CLASS,
        BIRTHDAY: this.inf.BIRTHDAY,
        ID: this.inf.ID
      },
      lstClass: [],
    };
  },
  methods: {
    edit() {
      var me = this;
      axios
        .post(`${window.api_url}/edit/nguoidung`, {
          FIRST_NAME: me.user.FIRST_NAME,
          LAST_NAME: me.user.LAST_NAME,
          USERNAME: me.user.USERNAME,
          PASSWORD: me.user.PASSWORD,
          CLASS: me.user.CLASS,
          BIRTHDAY: me.user.BIRTHDAY,
          ID: me.user.ID
        })
        .then(function(response) {
          console.log(response);
          me.cancelEdit();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cancelEdit(){
      this.$emit('cancelToParent');
    },
    apiClass(){
     axios.post(`${window.api_url}/lop`)
     .then(async (response) => {
          var code = response.data.data;
          this.lstClass = code;
        });
   }
  },
  created(){
    this.apiClass();
  }
};
</script>

<style></style>
