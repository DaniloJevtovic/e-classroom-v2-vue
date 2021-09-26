<template>
  <div class="container">
    <div class="container-header">
      <h3>Welcome admin</h3>
    </div>
    <div class="container-body">
      <router-link :to="{ name: 'Users' }">
        <h1>Users</h1>
      </router-link>
      <router-link :to="{ name: 'AllCourses' }">
       <h1>Courses</h1>
      </router-link>
      <router-link :to="{ name: 'AllScClasses' }">
        <h1>School Classes</h1>
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
  padding: 40px;
}

</style>