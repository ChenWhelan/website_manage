<template>
  <div class="userInfo">
    <div class="btitle">个人信息</div>
    <div class="box">
<p>
    用户邮箱:{{this.$store.getters.email}}
</p>
    </div>
    <div class="box2">
<p>
    用户密码:{{this.$store.getters.password}}
</p>
    </div>
    <button class="bbutton1" @click="login()"> 
        退出登录 
    </button>
   
  </div>
  
</template>

<script>
export default {
  name: "MyInfo",
  methods: {
      login() {
        this.show = !this.show;
        document.cookie = "user_no=0";
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 500);
      },
    },

  };

</script>

<style>
.userInfo{
    width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
  color: rgb(57, 167, 176);
  text-align: center;
}
.box {
    margin-top: 20px;
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 60px; 
  color: rgb(35, 103, 109);
  font-size: 1.2em;
  font-family: SimHei;
  text-align: center;
}
.box2{
  margin-top: 20px;
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 60px; 
  color: rgb(35, 103, 109);
  font-size: 1.2em;
  font-family: SimHei;
  text-align: center;
}
.bbutton1{
    margin-top: 50px;
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(216, 0, 0);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
</style>