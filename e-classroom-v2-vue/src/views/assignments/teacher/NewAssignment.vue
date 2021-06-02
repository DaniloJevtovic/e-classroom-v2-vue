<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h2>New Assignment</h2>
      <input type="text" placeholder="name" />
      <textarea rows="5" placeholder="instructions"></textarea>
      <button>Save</button>
      <button @click.prevent="$router.go(-1)">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
</style>