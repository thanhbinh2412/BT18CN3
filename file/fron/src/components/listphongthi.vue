<template>
  <div class="giangvien">
    <div class="administration"  v-if="per == 1">
      <button @click="taophongthi" class="btn btn-primary paddingComp">
        tao phong thi
      </button>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Môn học</th>
            <th>Giáo Viên</th>
            <th>Lớp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="index" v-for="(item, index) in this.lstPhongThi">
            <td>{{ item.ID }}</td>
            <td>{{ item.MON }}</td>
            <td>{{ item.GIAOVIEN }}</td>
            <td>{{ item.CLASS }}</td>
            <td>
              <button @click="DeleteData" class="btn btn-danger">Delete</button>
              <button class="btn btn-primary">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="sinhvien" v-if="per == 0">
    <h1>Sinh vien</h1>
  </div>
  </div>

  
</template>

<script>
import axios from "axios";
export default {
  name: "phong-thi",
  props: {
    per: {
      type: String,
    },
  },
  data() {
    return {
      lstPhongThi: [],
      IsRegister: 2,
    };
  },
  methods: {
    getData() {
      axios
        .post(`${window.window.api_url}/phongthi-list`)
        .then(async (response) => {
          var code = response.data.data;
          this.lstPhongThi = code;
        });
    },
    DeleteData(e) {
      console.log(e);
    },
    taophongthi() {
      console.log("1");
      this.$router.push({
        path: "register",
        query: {
          param: this.IsRegister,
        },
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style></style>
