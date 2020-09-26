<template>
  <div class="home">
    <div class="d-flex" id="wrapper">
      <!-- Sidebar -->
      <div
        v-if="IsSlideBar === true"
        class="bg-light border-right fix"
        id="sidebar-wrapper"
      >
        <div class="sidebar-heading">HAU</div>
        <div class="list-group list-group-flush">
          <a
            @click="danhsachnguoidung"
            class="list-group-item list-group-item-action bg-light"
            v-if="dataUser.PERMISSION == 3"
            >Danh sách người dùng</a
          >
          <a
            @click="danhsachcauhoi"
            class="list-group-item list-group-item-action bg-light"
            v-if="dataUser.PERMISSION == 0"
            >Danh sách câu hỏi</a
          >
          <a
            @click="danhsachphongthi"
            class="list-group-item list-group-item-action bg-light"
            v-if="dataUser.PERMISSION == 1 || dataUser.PERMISSION == 0"
            >Danh sách phòng thi</a
          >
          <a
            @click="danhsachbailam"
            class="list-group-item list-group-item-action bg-light"
            v-if="dataUser.PERMISSION == 1 || dataUser.PERMISSION == 0"
            >Danh sách điểm thi</a
          >
          <a
            @click="danhsachsinhvien"
            class="list-group-item list-group-item-action bg-light"
            v-if="dataUser.PERMISSION == 3 || dataUser.PERMISSION == 0"
            >Danh sách sinh viên</a
          >
          <a
            @click="danhsachnguoidung"
            class="list-group-item list-group-item-action bg-light"
            v-if="dataUser.PERMISSION == 3"
            >Danh sách môn học</a
          >
          <a
            @click="cauhinhlophoc"
            class="list-group-item list-group-item-action bg-light"
            v-if="dataUser.PERMISSION == 3"
            >Cấu hình lớp học</a
          >
        </div>
      </div>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <nav
          class="navbar navbar-expand-lg navbar-light bg-light border-bottom bg-cus"
        >
          <button @click="slideBar" class="btn btn-primary" id="menu-toggle">
            <i class="fas fa-bars"></i>
          </button>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle cl-txt-cus"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    class="fas fa-user cl-txt-cus pd-cus"
                    v-if="dataUser.PERMISSION == 1"
                  ></i>
                  <i
                    class="fas fa-user-tie"
                    v-if="dataUser.PERMISSION == 0"
                  ></i>
                  <i
                    class="fas fa-user-shield"
                    v-if="dataUser.PERMISSION == 3"
                  ></i>
                  {{
                    dataUser.FIRST_NAME +
                      " " +
                      dataUser.LAST_NAME +
                      ` (${dataUser.CLASS}) `
                  }}
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <a
                    v-on:click.prevent="caNhan"
                    class="dropdown-item"
                    href
                    v-if="dataUser.PERMISSION == 1"
                    >Cá Nhân</a
                  >
                  <div
                    class="dropdown-divider"
                    v-if="dataUser.PERMISSION == 1"
                  ></div>
                  <a class="dropdown-item" href="#">Cài đặt</a>
                  <div class="dropdown-divider"></div>
                  <a v-on:click="changePassword" class="dropdown-item"
                    >Đổi mật khẩu</a
                  >
                  <div class="dropdown-divider"></div>
                  <a v-on:click="logout" class="dropdown-item">Đăng xuất</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <!-- CONTENT -->
        <div class="container-fluid">
          <div class="gv-sv container">
            <listUser
              v-if="this.flag_list_user === 1"
              v-bind:IsSv="IsSv.toString()"
              v-bind:classs="dataUser.CLASS.toString()"
              v-bind:per="dataUser.PERMISSION.toString()"
            ></listUser>
            <listPhongThi
              v-if="this.flag_list_phongthi === 1"
              v-bind:per="dataUser.PERMISSION.toString()"
            ></listPhongThi>
            <listCauHoi v-if="this.flag_list_cauhoi === 1"></listCauHoi>
            <caNhan
              :InfCaNhan="dataUser"
              v-if="this.IsCaNhan == true"
              v-on:cancelCaNhan="cancelCaNhan"
            ></caNhan>
            <changePass
              v-if="this.IsChangePass == true"
              @cancelChangePass="cancelChangePass"
              :password="dataUser.PASSWORD"
            ></changePass>
            <cauHinhLop v-if="this.IsCauHinhLop == true"></cauHinhLop>
          </div>
        </div>
      </div>
      <!-- /#page-content-wrapper -->
    </div>
  </div>
</template>

<script>
import listUser from "@/components/listCauHoi";
import listPhongThi from "@/components/listphongthi";
import listCauHoi from "@/components/cauHoi";
import caNhan from "@/components/caNhan";
import changePass from "@/components/changePassword";
import cauHinhLop from "@/components/class";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      dataUser: {},
      flag_list_user: 0,
      flag_list_phongthi: 0,
      flag_list_cauhoi: 0,
      IsSlideBar: true,
      IsSv: 0,
      IsCaNhan: false,
      IsChangePass: false,
      IsCauHinhLop: false
    };
  },
  mounted() {},
  methods: {
    slideBar() {
      if (this.IsSlideBar) {
        this.IsSlideBar = false;
      } else {
        this.IsSlideBar = true;
      }
    },
    //teacher
    danhsachnguoidung() {
      this.IsSv = 0;
      if (this.flag_list_user == 0) {
        this.flag_list_phongthi = 0;
        this.flag_list_user = 1;
      } else {
        this.flag_list_user = 0;
      }
    },
    //sinhvien
    danhsachsinhvien() {
      this.IsSv = 1;
      if (this.flag_list_user == 0) {
        this.flag_list_phongthi = 0;
        this.flag_list_user = 1;
      } else {
        this.flag_list_user = 0;
      }
    },
    danhsachcauhoi() {
      if (this.flag_list_cauhoi == 0) {
        this.flag_list_cauhoi = 1;
      } else {
        this.flag_list_cauhoi = 0;
      }
    },
    danhsachphongthi() {
      if (this.flag_list_phongthi == 0) {
        this.flag_list_phongthi = 1;
        this.flag_list_user = 0;
      } else {
        this.flag_list_phongthi = 0;
      }
    },
    danhsachbailam() {},
    logout() {
      this.$router.push({
        path: "/",
      });
      sessionStorage.clear();
    },

    //ca Nhan
    caNhan() {
      if (this.IsCaNhan == false) {
        this.IsCaNhan = true;
      }
    },
    cancelCaNhan() {
      this.IsCaNhan = false;
    },

    //chage password
    changePassword() {
      if (this.IsChangePass == false) {
        this.IsChangePass = true;
      }
    },
    cancelChangePass() {
      this.IsChangePass = false;
    },

    //cau hinh lop hoc
    cauhinhlophoc(){
      var me = this;
      console.log("click");
      if(!me.IsCauHinhLop){
        me.IsCauHinhLop = true
      }else{
        me.IsCauHinhLop = false
      }
    }
  },
  beforeCreate() {
    var me = this;
    if (sessionStorage.length == 0) {
      me.$router.push({
        path: "/",
      });
    }
  },
  created: function() {
    let me = this;
    axios
      .post(`${window.api_url}/getuser`, {
        ID: sessionStorage.ID,
      })
      .then(function(response) {
        me.dataUser = response.data.data[0];
      })
      .catch(function() {});
  },
  components: {
    listCauHoi,
    listUser,
    listPhongThi,
    caNhan,
    changePass,
    cauHinhLop
  },
};
</script>

<style scoped>
.paddingComp {
  margin: 10px 20px;
}
.nav-color {
  background-color: #0193de;
  margin-top: 200px;
}

/* chung */
a {
  text-decoration: none;
  cursor: pointer;
}

.navbar-inverse {
  background-color: #0193de;
}
.navbar-inverse .navbar-branch {
  color: #ffffff;
}
.navbar-inverse .navbar-branch:hover {
  color: #000000;
}

.dropdown-menu {
  position: absolute;
  color: #000000;
}

#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }

  .bg-cus {
    background-color: #2a2a72;
    background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);
    width: 100%;
    position: fixed;
  }
  .cl-txt-cus {
    color: #ffffff !important;
  }
  .pd-cus {
    padding: 0 5px !important;
  }

  .fix{
    min-height: 100vh;
    position: fixed;
  }
  .gv-sv{
    margin-left: 225px;
    margin-top: 60px;
  }
}
</style>
