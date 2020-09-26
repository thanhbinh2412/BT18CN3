<template>
  <div class="ca-nhan mg-top-15">
      <div class="row">
          <div class="col-md-6">
              <p>Mã Sinh Viên: <span class="cl-red">{{ InfCaNhan.MA_SV }}</span></p>
          </div>
          <div class="col-md-6 d-flex flex-row-reverse">
              <div v-on:click="cancelCaNhan" class="btn btn-danger  mg-left-15">X</div>
              <div class="btn btn-warning">Sửa thông tin</div>
          </div>
      </div>
      <div class="col-md-12">
          <h1 class="text-center tittle">SƠ YẾU LÝ LỊCH SINH VIÊN</h1>
      </div>
      <div class="row">
          <div class="col-md-3">
              <p>Họ và Tên:  <span class="cl-red">{{ InfCaNhan.FULL_NAME }}</span></p>
          </div>
          <div class="col-md-3">
              <p>Ngày sinh: <span>{{ InfCaNhan.NGAY_SINH }}</span></p>
          </div>
          <div class="col-md-3">
              <span class="text-bold fs-14">Giới tính: </span> <span>{{ InfCaNhan.GIOI_TINH }}</span>
          </div>
          <div class="col-md-3">
              <span class="text-bold fs-14">Quốc tịch: </span> <span>{{ InfCaNhan.QUOC_TICH }}</span>
          </div>
      </div>
      <div class="row mg-bt-15">
          <div class="col-md-6">
              <label class="text-bold fs-14" for="quequan">Quê quán: </label>
              <input
                type="text"
                id="quequan"
                class="form-control"
                v-model="InfCaNhan.QUE_QUAN"
              />
          </div>
          <div class="col-md-3">
              <label class="text-bold fs-14" for="dantoc">Dân tộc: </label>
              <input
                type="text"
                id="dantoc"
                class="form-control"
                v-model="InfCaNhan.DAN_TOC"
              />
          </div>
          <div class="col-md-3">
              <label class="text-bold fs-14" for="tongiao">Tôn giáo: </label>
              <input
                type="text"
                id="tongiao"
                class="form-control"
                v-model="InfCaNhan.TON_GIAO"
              />
          </div>
      </div>
      <div class="row mg-bt-15">
          <div class="col-md-3">
              <label class="text-bold fs-14" for="sonha">Số nhà: </label>
              <input
                type="text"
                id="sonha"
                class="form-control"
                v-model="InfCaNhan.SO_NHA"
              />
          </div>
          <div class="col-md-3">
              <label class="text-bold fs-14" for="msbh">Mã số bảo hiểm: </label>
              <input
                type="text"
                id="msbh"
                class="form-control"
                v-model="InfCaNhan.MA_SO_BAO_HIEM"
              />
          </div>
          <div class="col-md-3">
              <label class="text-bold fs-14" for="cmnd">CMND: </label>
              <input
                type="text"
                id="cmnd"
                class="form-control"
                v-model="InfCaNhan.SO_CMND"
              />
          </div>
          <div class="col-md-3">
              <label class="text-bold fs-14" for="email">Email: </label>
              <input
                type="text"
                id="email"
                class="form-control"
                v-model="InfCaNhan.EMAIL"
              />
          </div>
      </div>
      <div class="row mg-bt-15">
          <div class="col-md-3">
              <span class="text-bold fs-14">Hệ đào tạo: </span> <span class="cl-red">{{ InfCaNhan.HE_DAO_TAO }}</span>
          </div>
          <div class="col-md-3">
              <span class="text-bold fs-14">Chuyên ngành: </span> <span class="cl-red">{{ InfCaNhan.CHUYEN_NGANH }}</span>
          </div>
          <div class="col-md-3">
              <span class="text-bold fs-14">Niên khóa: </span> <span class="cl-red">{{ InfCaNhan.NIEN_KHOA }}</span>
          </div>
          <div class="col-md-3">
              <span class="text-bold fs-14">Khóa học: </span> <span class="cl-red">{{ InfCaNhan.KHOA_HOC }}</span>
          </div>
      </div>
      <div class="row mg-bt-15">
          <div class="col-md-3">
              <label class="text-bold fs-14" for="dtnr">ĐT nhà riêng: </label>
              <input
                type="text"
                id="dtnr"
                class="form-control"
                v-model="InfCaNhan.DIEN_THOAI_NHA_RIENG"
              />
          </div>
          <div class="col-md-3">
              <label class="text-bold fs-14" for="dtcn">ĐT cá nhân: </label>
              <input
                type="text"
                id="dtcn"
                class="form-control"
                v-model="InfCaNhan.DIEN_THOAI_CA_NHAN"
              />
          </div>
          <div class="col-md-3">
              <label class="text-bold fs-14" for="quan">Quận/Huyện: </label>
              <input
                type="text"
                id="quan"
                class="form-control"
                v-model="InfCaNhan.QUAN"
              />
          </div>
          <div class="col-md-3">
              <label class="text-bold fs-14" for="tinh">Tỉnh/Thành phố: </label>
              <input
                type="text"
                id="tinh"
                class="form-control"
                v-model="InfCaNhan.TINH"
              />
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ca-nhan',
    props: {
        InfCaNhan: {
            type: Object
        }
    },
    data(){
        return{

        }
    },
    methods: {
        cancelCaNhan(){
            this.$emit('cancelCaNhan');
        }
    }

}
</script>

<style>
@font-face {
  font-family: Montserrat-Bold;
  src: url('../assets/montserrat/Montserrat-Bold.ttf'); 
}
.cl-red{
    color: red;
}
.text-bold{
    font-weight: bold;
}
.fs-14{
    font-size: 13px;
}
.mg-bt-15{
    margin-bottom: 15px;
}
.mg-top-15{
    margin-top: 20px;
}
.mg-left-15{
    margin-left: 15px;
}
.tittle{
    font-size: 16px;
    font-weight: bold;
    font-family: Montserrat-Bold;
    padding: 5px 0px 15px 0px;
}

</style>