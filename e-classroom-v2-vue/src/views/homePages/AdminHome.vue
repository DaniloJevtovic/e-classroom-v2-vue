<template>
  <div class="container">
    <div class="container-header">
      <h2>Welcome admin</h2>
    </div>
    <div class="container-body">
      <router-link :to="{ name: 'Users' }">
        <button>All Users</button>
      </router-link>
      <router-link :to="{ name: 'AllCourses' }">
        <button>All Courses</button>
      </router-link>
      <router-link :to="{ name: 'AllScClasses' }">
        <button>All School Classes</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
button {
  font-size: 15px;
  width: 30%;
  display: inline;
  padding: 50px;
}

</style>