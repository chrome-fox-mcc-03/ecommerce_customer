<template>
    <section>
        <b-tabs vertical v-model="activeTab">
            <b-tab-item label="All Products">
                <AllProducts />
            </b-tab-item>

            <b-tab-item label="Local">
                <Local />
            </b-tab-item>

            <b-tab-item label="Import">
                <Import />
            </b-tab-item>

            <b-tab-item label="Other" >
                <OtherProducts />
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
import AllProducts from '../components/AllProducts'
import OtherProducts from '../components/OtherProducts'
import Local from '../components/Local'
import Import from '../components/Import'
export default {
  components: {
    AllProducts, OtherProducts, Local, Import
  },
  data () {
    return {
      activeTab: 0,
      showBooks: false
    }
  }
}
</script>
