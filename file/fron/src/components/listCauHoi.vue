<template>
  <div class="giangvien">
    <div class="administration" v-if="IsSv == 0">
      <div class="top-content">
        <button @click="register" class="btn btn-success float-right mg-l-10">
          <i class="fas fa-user-plus"></i>
        </button>
        <button @click="excel" class="btn btn-success float-right">
          <i class="fas fa-file-download"></i>
        </button>
        <edit-inf @cancelToParent="cancelFromChild" :inf="this.editUser" v-if="this.show == true"></edit-inf>
        <h2 class="text-center">Danh sách người dùng</h2>
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
            <th>MSV</th>
            <th>Permission</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="index" v-for="(item, index) in this.lstUser">
            <td>{{ index + 1 }}</td>
            <td>{{ item.FIRST_NAME +
                      " " +
                      item.LAST_NAME }}</td>
            <td>{{ item.PASSWORD }}</td>
            <td>{{ item.MA_SV }}</td>
            <td>
              {{
                item.PERMISSION == 3
                  ? item.PERMISSION + " admin"
                  : item.PERMISSION == 0
                  ? item.PERMISSION + " Giang vien"
                  : item.PERMISSION + " sinh vien"
              }}
            </td>
            <td>{{ item.CLASS }}</td>
            <td>
              <button @click="DeleteData(index, item)" class="btn btn-danger">
                <i class="fas fa-user-minus"></i>
              </button>
              <button @click="EditData(index, item)" class="btn btn-primary  mg-l-10">
                <i class="fas fa-user-edit"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="sinhvien" v-if="IsSv == 1">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Class</th>
            <th>Birth</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="index" v-for="(item, index) in this.lstSvv">
            <td>{{ index + 1 }}</td>
            <td>{{ item.FIRST_NAME + " " + item.LAST_NAME }}</td>
            <td>{{ item.CLASS }}</td>
            <td>{{ item.BIRTHDAY }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import save from '../commom/FileSaver';
import axios from "axios";
import editInf from "@/components/editInfStudent";
export default {
  name: "table-list",
  props: {
    IsSv: {
      type: String,
    },
    classs: {
      type: String
    },
    per: {
      type: String
    }
  },
  data() {
    return {
      lstUser: [],
      lstSvv: [],
      IsRegister: 1,
      editUser: [],
      show: false,
      EXCEL_TYPE: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      EXCEL_EXTENSION: '.xlsx'
    };
  },
  methods: {
    converData(string) {
      return "'" + string + "'";
    },
    getData() {
      var me = this;
      axios.post(`${window.api_url}/login-list`).then((response) => {
        var code = response.data.data;
        me.lstUser = code;
      });
    },

    apiSinhVien() {
      var me = this;
      axios
        .post(`${window.api_url}/sinhvien-list`
        , {
          CLASS: this.classs
        }
        )
        .then(function(response) {
          var code = response.data.data;
          me.lstSvv = code;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    DeleteData(index, item) {
      this.lstUser.splice(index, 1);

      axios
        .post(`${window.window.api_url}/delete/nguoidung`, {
          ID: item.ID,
        })
        .then(function(response) {
          if (response.status == 200) {
            console.log("thanh cong");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    EditData(index, item){
      console.log(item);
      this.show = true;
      this.editUser = [];
      this.editUser = item
    },
    cancelFromChild(){
      this.show = false;
      this.editUser = []
      this.getData();
    },
    register() {
      console.log("1");
      this.$router.push({
        path: "register",
        query: {
          param: this.IsRegister,
        },
      });
    },
    excel(){
      const workSheet = window.XLSX.utils.json_to_sheet(this.lstUser);
      console.log("workSheet");
      console.log(workSheet);
      const workBook = {
        Sheets: {
          'haha': workSheet
        },
        SheetNames: ['haha']
      };

      const excelBuffer = window.XLSX.write(workBook, {bookType: 'xlsx', type: 'array'});
      console.log(excelBuffer);
      this.saveAsExcel(excelBuffer, "danh_sach_nguoi_dung");

    },
    saveAsExcel(buffer, fileName){
      const data = new Blob([buffer], {type: this.EXCEL_TYPE});
      save.saveAs(data, `${fileName}`);
    },
  },
  created() {
    this.apiSinhVien();
    this.getData();
  },
  components: {
    editInf
  }
};
</script>

<style>
.top-content {
  padding: 20px 0px;
}
.mg-l-10 {
  margin-left: 10px;
}
</style>
