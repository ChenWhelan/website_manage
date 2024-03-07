<template>
    <el-collapse-transition>
      <div v-show="show">
        <el-row type="flex" justify="center" align="middle">
          <el-col type="flex" justify="center">
            <section class="showcase">
                <video src="../assets/1.mp4" muted loop autoplay></video>
              <div class="overlay"></div>
              <div class="text">
                <h2>Utopia</h2>
                <h1 style="display: inline-block">广州南方学院</h1>
                &nbsp;
                <p style="display: inline-block">电气与计算机工程学院网站管理平台</p>
                <br /><br />
                <p>
                    电气与计算机工程学院（School of Electrical and Computer Engineering，简写SECE），其前身为电子通信与软件工程系，始建于2006年，是广州南方学院（原中山大学南方学院）唯一的理工学院。学院依托中山大学优质教育资源，以及广东珠江投资集团雄厚的社会经济实力，在广州南方学院“高起点、有特色、更开放”的办学理念和“宽口径、厚基础、强能力、以就业为导向”的人才培养模式指导下，以培养创新应用型IT工程人才为培养目标，注重学生实践能力的提升， 尤其在学科建设、应用型人才培养模式、校企融合等方面进行了深入探索和实践，经过10多年努力奋斗，取得了一系列成果。
                </p>
                <button class="bbutton" @click=login()> 登录 / 注册 </button>

              </div>
            </section>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
  </template>
  
  <script>
  // fade/zoom 等
  import "element-ui/lib/theme-chalk/base.css";
  // collapse 展开折叠
  import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
  import Vue from "vue";
  Vue.component(CollapseTransition.name, CollapseTransition);
  export default {
    data: () => ({
      show: true,
    }),
  
    methods: {
/*       getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i].trim();
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
      },
  
      checkuserno() {
        var userno = this.getCookie("user_no");
        if (userno != "") {
          if (userno == 0) {
            console.log("管理员已登录");
          } else {
            this.$router.push({ path: "/Wtbhome" });
          }
        }
      }, */
  
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
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .button {

background-color: #4CAF50;

border: none;

color: white;

padding: 15px 32px;

text-align: center;

font-size: 16px;

cursor: pointer;

}
  .showcase {
    position: absolute;
    right: 0;
    width: 100%;
    min-height: 100vh;
    padding: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    color: #fff;
    z-index: 2;
    transition: 0.5s;
  }
  .text {
    position: relative;
    z-index: 10;
  }
  
  .text h1 {
    font-size: 5em;
    font-weight: 800;
    line-height: 1em;
    text-transform: uppercase;
  }
  
  .text h2 {
    font-size: 4em;
    font-weight: 700;
    line-height: 1em;
    text-transform: uppercase;
  }
  
  .text p {
    font-size: 1.1em;
    margin: 20px 0;
    font-weight: 400;
    max-width: 700px;
  }
  @media (max-width: 991px) {
    .showcase {
      padding: 40px;
    }
  
    .text h1 {
      font-size: 3em;
    }
  
    .text h2 {
      font-size: 2em;
    }
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: darkkhaki;
    /* background: gold; */
    mix-blend-mode: overlay;
  }
  
  .showcase video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    object-fit: cover;
  }

  .bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57,167,176);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
  </style>