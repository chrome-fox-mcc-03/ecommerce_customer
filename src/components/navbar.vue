<template>
  <nav>
    <at-menu mode="horizontal">
      <at-menu-item name="1" :to="{path: '/'}" ><i class="icon icon-home"></i>Home</at-menu-item>
      <at-menu-item name="3" style="float:right">
        <at-button @click.prevent="logout" v-if="logins"><i class="icon icon-log-out"></i>Logout</at-button>
        <at-button @click.prevent="logout" v-else><i class="icon icon-log-out"></i>Login</at-button>
      </at-menu-item>
      <at-menu-item name="4" style="float:right" :to="{path: '/cart'}">
        <at-badge :value=cartQty.length :max-num="90" style="color:red top:0px" >
          <i class="icon icon-shopping-cart"></i>
        </at-badge>
        Cart
      </at-menu-item>
      <at-submenu style="float:right" >
        <template slot="title"><i class="icon icon-life-buoy"></i>Category</template>
        <div v-for="category in categorys" :key="category.id">
          <at-menu-item name="3-1" :to="{path: `/${category.name}`}">{{category.name}}</at-menu-item>
        </div>
      </at-submenu>
      <at-menu-item name="2" style="float:right">
        <at-input v-model="inputValue5" placeholder="Please input" append-button>
          <template slot="append">
            <i class="icon icon-search"></i>
          </template>
        </at-input>
      </at-menu-item>
    </at-menu>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      inputValue4: ''
    }
  },
  computed: {
    cartQty () {
      return this.$store.state.itemsCart
    },
    categorys () {
      return this.$store.state.category
    },
    logins () {
      return this.$store.state.login
    },
    inputValue5: {
      get () {
        return this.$store.state.filter
      },
      set (value) {
        this.$store.commit('SET_FILTER', value)
      }
    }
  },
  methods: {
    category () {
      this.$store.dispatch('category')
    },
    test () {
      this.$store.dispatch('test', this.fetchItem)
    },
    logout () {
      localStorage.clear()
      this.$router.push('/login')
      this.$store.commit('SET_LOGIN', false)
    }
  },
  created () {
    this.category()
    this.test()
  }
}
</script>

<style>
.at-badge--corner {
    position: absolute;
    top: 0px !important;
    right: 0;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
}
</style>
