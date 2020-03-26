<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body{
    background-color: white;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
}
.main-section {
    margin:0 auto;
    margin-top: 150px;
    padding: 0;
}

.bg-costum{
    padding: 20px;
    background-color: #ce848f09;
    position: relative;
}

.navbar{
    font-family: 'Bellota', cursive;
}

.navbar-brand{
    font-size: 45px;
    font-weight: 800;
}

.title-app{
    font-family: 'Lora', serif;
}

.products{
    font-family: 'Montserrat', sans-serif;
}

.position-login{
    padding-top: 50x ;
}

.login-text{
    font-family: 'Monserrat', serif;
}

.modal-content {
    background-color: #efbac063;
    opacity: .85;
    margin: 0;
    border-radius: 20px;
    padding: 20px;
    /* padding-top: 100px ; */
    height: 565px;
    border: none;
}

.form-group{
    margin-bottom: 25px;
}

.form-group input{
    border-radius: 8px;
    height: 70px;
    font-size: 21px;
    padding-left: 54px;
    border: 0px;
    margin-top: 60px;
}

.form-input button{
    width: 50%;
    background-color: #996888;
    border: none;
    padding: 15px;
    font-size: 20px;
    font-weight: 700;
    align-content: flex-end;
    margin-top: 20px;
}

.button{
    width: 50%;
    background-color: #996888;
    border: none;
    padding: 15px;
    font-size: 20px;
    font-weight: 700;
    align-content: flex-end;
}

.form-input h1{
    /* padding: 20px; */
    font-weight: 800;
    font-family: 'Amiri', serif;
    padding-top: 50px ;
}

.main-board{
    /* background-color: #e9e1cc6b; */
    /* padding-top: 10px; */
    width: 1800px;
    max-width: 100%;
    height: 100%;
    border-radius: 10px;
    background-size: cover;
}

.main-board .category{
    padding-top: 10px;
    width: 400px;
    border-radius: 10px;
    border: none;
    margin: 0 auto;
    text-align: center;
    color: antiquewhite;
    max-height: 100%;
}

.main-board .option{
    /* background-color: thistle; */
    height: 256px;
    font-size: 40px;
    text-decoration: none;
    width: 800px;
}

.main-board .option-text{
    color: white;
    font-size: 74px;
    text-decoration: none;
    font-family: 'Amiri', serif;
}

.main-board .image-left{
    width: 400px;
    height: auto;
    border-radius: 1000px;
    border-color: #996888;
    /* border-style: inset; */
}

.main-board .image-right{
    width: 386px;
    height: auto;
    border-radius: 1000px;
    border-color:  #CE848F;
    /* border-style: outset; */
}

.card-product{
    border: none;
    border-radius: 19px;
    background-color: #ce848f6e;
    height: 621px;
}
/*
.card-text{
    color: #46000085;
    font-weight: bold;
    text-align: center;
    font-size: 24px;
    font-family: 'Amiri', serif;
} */
.detail-board{
    padding-top: 47px;
    width: 1654px;
    max-width: 100%;
    height: 100%;
    border-radius: 10px;
    background-size: cover;
}

.modal-edit{
    background-color: #efbac063;
    opacity: .85;
    margin: 0;
    border-radius: 20px;
    padding: 20px;
    /* padding-top: 100px; */
    height: 800px;
    border: none;
}

.card-delete{
    background-color: #efbac063;
    opacity: .85;
    margin: 10px;
    border-radius: 20px;
    padding: 20px;
    height: 150px;
    border: none;
}

</style>
