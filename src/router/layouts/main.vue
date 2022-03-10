<script>

import Vertical from './vertical';
import Horizontal from './horizontal';

export default {
  components: {Vertical, Horizontal},
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    }
  },
  data() {
    return {};
  },
  mounted() {
    if(this.$route.path !== '/admin')
      document.body.style.paddingLeft = '0px';
  }
};
</script>

<template>
  <div>
    <vertical v-if="mode === 'vertical'">
      <slot/>
    </vertical>

    <Horizontal v-if="mode === 'horizontal'">
      <slot/>
    </Horizontal>
  </div>
</template>

