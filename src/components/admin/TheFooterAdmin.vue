<template>
  <footer class="admin-footer">
    <div class="container-copy">
      <p>Copyright © 2025 Smash Burgers</p>

      <div class="developer-info">
        <p>Web Developer | Lucas E. Dickmann</p>
        <a href="https://github.com/ldickmann" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']" />
        </a>
        <a href="https://linkedin.com/in/lucas-dickmann" target="_blank">
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/footer-admin";
</style>
