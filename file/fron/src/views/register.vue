<template>
  <div class="register">
    <h1 class="text-center">register</h1>
    <div v-if="this.IsRegister == 1" class="card">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <input
            type="file"
            name=""
            id="input"
            accept=".xls, .xlsx"
            v-on:change="file"
          />
        </div>
        <div class="col-md-4">
          <button class="btn btn-primary" @click="convert">Convert</button>
        </div>
      </div>
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
                type="password"
                class="form-control"
                id="password"
                placeholder="Mat khau"
                v-model="user.PASSWORD"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-3">
              <select
                id="permission"
                class="form-control"
                v-model="user.PERMISSION"
              >
                <option value="1">Sinh vien</option>
                <option value="0">Giang vien</option>
                <option value="3">admin</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <input
                type="text"
                class="form-control"
                id="msv"
                placeholder="Ma SV"
                v-model="user.MSV"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-3">
              <select class="form-control" v-model="user.CLASS">
                <option
                  v-bind:value="item.CLASS_NAME"
                  v-bind:key="index"
                  v-for="(item, index) in this.lstClass"
                  >{{ item.CLASS_NAME }}</option
                >
              </select>
            </div>
          </div>
          <button
            v-on:click.prevent="register"
            class="btn btn-success btn-block"
          >
            Register
          </button>
        </form>
      </div>
    </div>

    <div v-if="this.IsRegister == 2" class="card">
      <div class="card-body">
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Mon Hoc"
                v-model="phongThi.MON"
              />
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Giao vien"
                v-model="phongThi.GIAOVIEN"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Lop"
                v-model="phongThi.CLASS"
              />
            </div>
            <div class="form-group col-md-6"></div>
          </div>
          <button
            v-on:click="registerPhongThi"
            class="btn btn-success btn-block"
          >
            Register
          </button>
        </form>
      </div>
    </div>

    <div v-if="this.IsRegister == 3" class="card">
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="cauhoi">Cau Hoi:</label>
            <textarea
              v-model="cauhoi.CAUHOI"
              class="form-control"
              name=""
              id="cauhoi"
              rows="3"
              placeholder="Cau Hoi"
            ></textarea>
          </div>
          <div class="form-row align-items-center">
            <div class="form-group">
              <label for="mon">Mon:</label>
              <input
                type="text"
                id="mon"
                class="form-control"
                placeholder="Mon"
                v-model="cauhoi.MON"
              />
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="defaultCheck1"
                v-model="isTN"
              />
              <label class="form-check-label" for="defaultCheck1">
                Trac nghiem
              </label>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="A">Đáp Án A:</label>
              <textarea
                v-model="cauhoi.DAPAN_A"
                class="form-control"
                name=""
                id="A"
                rows="1"
                placeholder="Dap An A"
              ></textarea>
            </div>
            <div class="form-group col-md-6">
              <label for="B">Đáp Án B:</label>
              <textarea
                v-model="cauhoi.DAPAN_B"
                class="form-control"
                name=""
                id="B"
                rows="1"
                placeholder="Dap An B"
              ></textarea>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="C">Đáp Án C:</label>
              <textarea
                v-model="cauhoi.DAPAN_C"
                class="form-control"
                name=""
                id="C"
                rows="1"
                placeholder="Dap An C"
              ></textarea>
            </div>
            <div class="form-group col-md-6">
              <label for="D">Đáp Án D:</label>
              <textarea
                v-model="cauhoi.DAPAN_D"
                class="form-control"
                name=""
                id="D"
                rows="1"
                placeholder="Dap An D"
              ></textarea>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="dapan">Dap An</label>
              <textarea
                v-model="cauhoi.DAPAN"
                class="form-control"
                name=""
                id="dapan"
                rows="1"
                placeholder="Dap an"
              ></textarea>
            </div>
            <div class="form-group col-md-6">
              <label for="dapan">Dap An</label>
              <textarea
                v-model="cauhoi.RESULT"
                class="form-control"
                name=""
                id="dapan"
                rows="1"
                placeholder="Dap an"
              ></textarea>
            </div>
          </div>
        </form>
        <button
          @click="addCauHoi"
          type="button"
          class="btn btn-success btn-block"
        >
          Hoan Tat
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      user: {
        PERMISSION: "",
        FIRST_NAME: "",
        LAST_NAME: "",
        USERNAME: "",
        PASSWORD: "",
        CLASS: "",
        MSV: "",
      },
      phongThi: {
        MON: "",
        GIAOVIEN: "",
        CLASS: "",
      },
      cauhoi: {
        CAUHOI: "",
        DAPAN_A: "",
        DAPAN_B: "",
        DAPAN_C: "",
        DAPAN_D: "",
        IS_TRAC_NGHIEM: 0,
        DAPAN: "",
        RESULT: "",
        MON: "",
      },
      isTN: true,
      res: {},
      IsRegister: this.$route.query.param,
      lstClass: [],
      selectedFile: [],
    };
  },
  methods: {
    addCauHoi() {
      console.log("hah");
      if (this.isTN == true) {
        this.cauhoi.IS_TRAC_NGHIEM = 0;
        this.apithemcauhoi();
        this.cauhoi = {
          CAUHOI: "",
          DAPAN_A: "",
          DAPAN_B: "",
          DAPAN_C: "",
          DAPAN_D: "",
          IS_TRAC_NGHIEM: 0,
          DAPAN: "",
          RESULT: "",
          MON: "",
        };
      } else {
        this.cauhoi.IS_TRAC_NGHIEM = 1;
        this.apithemcauhoi();
      }
    },
    converData(string) {
      return "'" + string + "'";
    },
    register() {
      this.apiNguoiDung();

      this.user.FIRST_NAME = "";
      this.user.LAST_NAME = "";
      this.user.USERNAME = "";
      this.user.MSV = "";

      // this.$router.push({
      //   path: "Home",
      // });
    },
    registerPhongThi() {
      this.apiPhongThi();
      this.$router.push({
        path: "Login",
      });
    },

    //api them cau hoi
    apithemcauhoi() {
      axios
        .post(`${window.api_url}/register/cauhoi`, {
          CAUHOI: this.converData(this.cauhoi.CAUHOI),
          DAPAN_A: this.converData(this.cauhoi.DAPAN_A),
          DAPAN_B: parseInt(this.cauhoi.DAPAN_B),
          DAPAN_C: this.converData(this.cauhoi.DAPAN_C),
          DAPAN_D: this.converData(this.cauhoi.DAPAN_D),
          IS_TRAC_NGHIEM: this.converData(this.cauhoi.IS_TRAC_NGHIEM),
          DAPAN: this.converData(this.cauhoi.DAPAN),
          RESULT: this.converData(this.cauhoi.RESULT),
          MON: this.converData(this.cauhoi.MON),
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //api
    apiNguoiDung() {
      axios
        .post(`${window.api_url}/register/nguoidung`, {
          FIRST_NAME: this.user.FIRST_NAME,
          LAST_NAME: this.user.LAST_NAME,
          PERMISSION: parseInt(this.user.PERMISSION),
          USERNAME: this.user.USERNAME,
          PASSWORD: this.user.PASSWORD,
          CLASS: this.user.CLASS,
          MA_SV: this.user.MSV,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    apiPhongThi() {
      axios
        .post(`${window.api_url}/register/phongthi`, {
          MON: this.converData(this.phongThi.MON),
          GIAOVIEN: this.converData(this.phongThi.GIAOVIEN),
          CLASS: this.converData(this.phongThi.CLASS),
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //api list class
    apiClass() {
      axios.post(`${window.api_url}/lop`).then(async (response) => {
        var code = response.data.data;
        this.lstClass = code;
      });
    },
    file(e) {
      console.log(e.target.files);
      var me = this;
      me.selectedFile = e.target.files[0];
    },
    convert(Event) {
      var me = this;
      var f = me.selectedFile;
      console.log(Event.target.files);
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = window.XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        /* DO SOMETHING WITH workbook HERE */
        console.log(workbook);
        let worksheet = workbook.Sheets[sheetName];

        console.log(window.XLSX.utils.sheet_to_json(worksheet).length);

        for (
          var i = 0;
          i < window.XLSX.utils.sheet_to_json(worksheet).length;
          i++
        ) {
          console.log(window.XLSX.utils.sheet_to_json(worksheet)[i]);
          axios
            .post(`${window.api_url}/register/nguoidung`, {
              FIRST_NAME: window.XLSX.utils.sheet_to_json(worksheet)[i].FIRST_NAME,
              LAST_NAME: window.XLSX.utils.sheet_to_json(worksheet)[i].LAST_NAME,
              PERMISSION: parseInt(window.XLSX.utils.sheet_to_json(worksheet)[i].PERMISSION),
              USERNAME: window.XLSX.utils.sheet_to_json(worksheet)[i].USERNAME,
              PASSWORD: window.XLSX.utils.sheet_to_json(worksheet)[i].PASSWORD,
              CLASS: window.XLSX.utils.sheet_to_json(worksheet)[i].CLASS,
              MA_SV: window.XLSX.utils.sheet_to_json(worksheet)[i].MA_SV,
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      };
      reader.readAsArrayBuffer(f);
    },
  },
  created() {
    this.apiClass();
  },
  components: {},
};
</script>

<style></style>
