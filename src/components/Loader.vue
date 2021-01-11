<template>
	<b-overlay
        :show="busy"
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
        class="d-inline-block"
      >
      	<slot></slot>
        
      </b-overlay>
</template>

<script>
	export default {
		props: ['busy']
	}
</script>