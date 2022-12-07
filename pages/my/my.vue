<template>
  <view>
    <my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
	import setBadge from '@/mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
  export default {
		mixins:[setBadge],
    data() {
      return {
        
      }
    },
		computed:{
			...mapState('m_user',['token'])
		}
  }
</script>

<style lang="scss">

</style>
