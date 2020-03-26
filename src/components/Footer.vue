<template>
    <div class="container-fluid footer p-3" id="footer">
      <div class="container">
          <div class="row mt-4">
              <div class="col-md-8">
                  <p class="text-dark mt-2">Copyright &copy; 2020 by Ulfa Hasanah, Book Den E-Commerce. All Rights Reserved.</p>
              </div>
              <div class="col-md-4">
                  <a class="img-fluid px-3" href="http://twitter.com/ulfahasanah_" target="_blank" rel="noopener noreferrer"><i class="fa fa-twitter-square"></i></a>
                  <a class="img-fluid px-3 text-dark" href="http://github.com/ulfahasanah" target="_blank" rel="noopener noreferrer"><i class="fa fa-github-square"></i></a>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
a {
  font-size: 20pt;
}

.container-fluid.footer > *:last-child {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5rem;
}
</style>
