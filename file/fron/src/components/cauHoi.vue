<template>
  <div class="administration">
    <button @click="register" class="btn btn-success">Tao Cau Hoi</button>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cau Hoi</th>
          <th>A</th>
          <th>B</th>
          <th>C</th>
          <th>D</th>
          <th>Is trac nghiem</th>
          <th>Dap an</th>
          <th>Result</th>
          <th>Mon</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="index" v-for="(item, index) in this.lstCauHoi">
          <td>{{ item.ID }}</td>
          <td>{{ item.CAUHOI }}</td>
          <td>{{ item.DAPAN_A }}</td>
          <td>{{ item.DAPAN_B }}</td>
          <td>{{ item.DAPAN_C }}</td>
          <td>{{ item.DAPAN_D }}</td>
          <td>{{ item.IS_TRAC_NGHIEM }}</td>
          <td>{{ item.DAPAN }}</td>
          <td>{{ item.RESULT }}</td>
          <td>{{ item.MON }}</td>
          <td>
            <button @click="DeleteData(index, item)" class="btn btn-danger">Delete</button>
            <button class="btn btn-primary">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "lst-cauhoi",
  props: {},
  data() {
    return {
        lstCauHoi: [],
        IsRegister: 3
    };
  },
  methods: {
      getData() {
      axios
        .post(`${window.window.api_url}/danhsachcauhoi`)
        .then(async (response) => {
          var code = response.data.data;
          this.lstCauHoi = code;
        });
    },
    DeleteData(index, item){
        console.log(index);
        console.log(item);
    },
    register(){
      console.log("1");
      this.$router.push({
          path: "register",
          query: {
            param: this.IsRegister,
          },
      })
    }
  },
  created(){
      this.getData()
  }
};
</script>

<style></style>
