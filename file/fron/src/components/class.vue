<template>
  <div class="class">
    <div class="col">
      <div class="row mg-top-15">
        <div class="col-md-6">
            <p class="float-right">Danh Sách Lớp học</p>
        </div>
        <div class="col-md-6">
          <button @click="register" class="btn btn-success float-right mg-l-10">
            <i class="fas fa-user-plus"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <addLop v-if="this.view.IsAddClass == true"></addLop>
      </div>
      <div class="col-md-12 mg-top-15">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Lớp</th>
              <th>Mã Lớp</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-bind:key="index" v-for="(item, index) in this.lstClass">
              <td>{{ index + 1 }}</td>
              <td>{{ item.CLASS_NAME }}</td>
              <td>{{ item.CLASS_NAME }}</td>
              <td>
                <button @click="DeleteData(index, item)" class="btn btn-danger">
                  <i class="fas fa-user-minus"></i>
                </button>
                <button
                  @click="EditData(index, item)"
                  class="btn btn-primary  mg-l-10"
                >
                  <i class="fas fa-user-edit"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import addLop from '@/components/register/addLop';
export default {
  name: "class",
  data() {
    return {
      lstClass: [],
      view: {
        IsAddClass: false
      }
    };
  },
  methods: {
    //api lay danh sach lop
    apiClass() {
      axios.post(`${window.api_url}/lop`).then(async (response) => {
        var code = response.data.data;
        this.lstClass = code;
      });
    },
    DeleteData(item, index) {
      this.lstClass.splice(index, 1);
    },
    register(){
      if(!this.view.IsAddClass){
        this.view.IsAddClass = true
      }else{
        this.view.IsAddClass = false
      }
    }
  },
  created() {
    this.apiClass();
  },
  components: {
    addLop
  }
};
</script>

<style>
.mg-top-15{
    margin-top: 20px;
}
</style>
