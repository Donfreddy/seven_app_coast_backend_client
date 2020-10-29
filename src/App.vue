<template>
  <v-app> <router-view></router-view> </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>

<style >
.trashIcon{
  cursor: pointer;
   transition: transform 0.2s;
  color: red;
}
.close {
  cursor: pointer;
}
.eyesIcon{
  cursor: pointer;
   transition: transform 0.2s;
}
.trashIcon:hover{
   transform: scale(
    1.2
  );
}
.eyesIcon:hover{
   transform: scale(
    1.2
  );
}
.v-data-table-header{
  background: #05ab9f;
  color: white;
}
.v-data-table-header span{
  color: white;
}
</style>
