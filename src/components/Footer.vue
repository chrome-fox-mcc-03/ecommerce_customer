<template>
  <div class="footer">
    <div class="supported-by">
      <div class="d-flex flex-column align-items-center">
        <p>supported by</p>
        <div class="cc">
          <i class="fab fa-cc-visa fa-3x"></i>
          <i class="fab fa-cc-mastercard fa-3x"></i>
          <i class="fab fa-cc-paypal fa-3x"></i>
          <i class="fab fa-cc-apple-pay fa-3x"></i>
          <i class="fab fa-amazon-pay fa-3x"></i>
          <i class="fab fa-cc-jcb fa-3x"></i>
        </div>
      </div>
      <div></div>
      <small>alvinarkansas <i class="fas fa-copyright"></i> 2020</small>
    </div>
    <div class="ecommerce-info">
      <p>GoWork Millennium Centennial Center - Coworking and Office Space</p>
      <p><b>Address:</b> Millennium Centennial Center, Level 38, Jl. Jend. Sudirman No.Kav. 25, Daerah Khusus Ibukota Jakarta 12920</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
.footer {
  height: 250px;
  background-color: rgb(221, 221, 221);
  padding: 2rem 3vw;
  display: flex;
}
.supported-by {
  display: flex;
  align-items: center;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  small {
    color: rgb(179, 179, 179);
    text-align: center;
  }
}
.cc {
  display: flex;
  i {
    margin: 0 5px;
  }
}
.ecommerce-info {
  width: 40%;
  color: grey;
  padding: 0 2rem;
  border-left: 1px solid grey;
}
</style>
