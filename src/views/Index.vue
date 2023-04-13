<template>
 <div class="common-layout">
  <el-container>
   <el-header>
    <div class="headword">在线考试系统</div>
   </el-header>
   <el-container>
    <el-aside width="200px">
     <el-menu background-color="#304156" text-color="#bfcbd9" router :default-active="activeIndex"
      class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item index="/home">
       <el-icon>
        <HomeFilled />
       </el-icon>
       <span>答题统计</span>
      </el-menu-item>
      <el-sub-menu index="/home">
       <template #title>
        <el-icon>
         <Ticket />
        </el-icon>
        <span>考试管理</span>
       </template>
       <el-menu-item index="/tiku/guanli">题库管理</el-menu-item>
       <el-menu-item index="/shiti/guanli">试题管理</el-menu-item>
       <el-menu-item index="/kaoshi/guanli">考试管理</el-menu-item>
      </el-sub-menu>
     </el-menu>
     <el-menu background-color="#304156" text-color="#bfcbd9" router :default-active="activeIndex"
      class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
     <el-sub-menu index="/home">
       <template #title>
        <el-icon>
         <Ticket />
        </el-icon>
        <span>系统设置</span>
       </template>
       <el-menu-item index="/sys/config">系统配置</el-menu-item>
       <el-menu-item index="/sys/depart">部门管理</el-menu-item>
      </el-sub-menu>
     </el-menu>
     <el-menu background-color="#304156" text-color="#bfcbd9" router :default-active="activeIndex"
      class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
     <el-sub-menu index="/home">
       <template #title>
        <el-icon>
         <Ticket />
        </el-icon>
        <span>用户管理</span>
       </template>
       <el-menu-item index="/sys/role">角色管理</el-menu-item>
       <el-menu-item index="/sys/user">用户管理</el-menu-item>
      </el-sub-menu>
     </el-menu>
    </el-aside>
    <el-main>
     <RouterView />
    </el-main>
   </el-container>
  </el-container>
 </div>
</template>

<script>
export default {
 data() {
  return {

  }
 }
}
</script>

<style lang="scss" scoped>
.el-header {
 display: flex;
 padding: 0;
 height: 60px;
 text-align: center;

 .headword {
  background: #2b2f3a;
  width: 200px;
  color: white;
  line-height: 60px;
  font-size: 15px;
  font-weight: bold;
 }
}

.el-aside {
 background: #304156;
 width: 200px;
 height: 100vh;
}

.el-main {
 background: #f8f8f8;
}
</style>