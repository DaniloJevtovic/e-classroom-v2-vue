<template>
  <!--@click.self - event click modifiers-->
  <!-- @click.self -- da ne bi zatvarao modal kad kliknes i na njega vec samo izvan modala-->
  <div class="backdrop" @click.self="closeModal">
    <div class="modal" :class="{ sale: theme === 'sale' }">
      <h1>{{ propsPodaci }}</h1>
      <p>{{ props2 }}</p>
      <p>modal content</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["propsPodaci", "props2", "theme"],
  methods: {
    closeModal() {
      this.$emit("zatvoriModal"); //emituje zatvoriModal u parent componentu
    },
  },
};
</script>

<style>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
}
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(245, 10, 10, 0.3); 
  width: 100%;
  height: 100%;
}
.modal h1 {
  color: aqua;
  border: none;
  padding: 0;
}
.modal.sale {
  background: indigo;
  color: white;
}
.modal.sale h1 {
  color: orange;
}
</style>