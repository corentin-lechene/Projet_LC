
<script>


export default {
  name: "users"
}
</script>


<template>
  <div>
    <div class="row">
      <div v-for="user in users" :key="user.id" class="col-xl-4 col-sm-6">
        <div class="card">
          <div class="row">
            <div class="col-xl-5">
              <div class="text-center p-4 border-right">
                <div class="avatar-sm mx-auto mb-4">
                  <span
                      :class="`avatar-title rounded-circle font-size-16`"
                  >img</span>
                </div>
                <h5 class="text-truncate">{{user.name}}</h5>
              </div>
            </div>

            <div class="col-xl-7">
              <div class="p-4 text-center text-xl-left">
                <div class="row">
                  <div class="col-md-6">
                    <div>
                      <p class="text-muted mb-2 text-truncate">Products</p>
                      <h5>{{user.products}}</h5>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div>
                      <p class="text-muted mb-2 text-truncate">Wallet Balance</p>
                      <h5>{{user.balance}}</h5>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <a href="#">See profile</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>