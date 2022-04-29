<template>
  <Layout>
  <div class="container-fluid" id="container-aide">
    <h1>Vous avez une question ? </h1>
    <div class="container-fluid" id="container-gestion">
      <div class="container-fluid" id="container-gestion4">
        <p>Vous pouvez nous contacter à l'adresse email suivante:  loyaltycard@gmail.com</p>
        <p>Nous essaierons de vous répondre le plus vite possible</p>
      </div>
    </div>
  </div>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Help",
  },
  components: {
    Layout,
  },
  data() {
    return {

    };
  },
};
</script>


<style>
#container-gestion4 > p{
text-align: center;
padding-top: 10%;
font-size: 1.5em;
}
#container-gestion4{
border: 1px solid #C0C0C0;
height:400px;
background-color: white;
}
#container-aide{
height: 600px;
width: 100%;
background-color: #FFFAFA;
}
#container-aide > h1{
color: black;
font-size: 2.2em;
text-align:center;
padding-top: 2%;
padding-bottom: 2%;
}
</style>
