<template>
  <div class="push2answer">
    <div>
      队名：<input type="text" v-model="state.name" />
    </div>

    <div class="button" @click="doPush2answer">抢答</div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps({
  name: String
})

const state = reactive({
  name: props.name
})

function doPush2answer() {
  console.log('doPush2answer')
}

</script>

<style>
.push2answer {
  padding: 2em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
  cursor: pointer;
  height: 80px;
  width: 80px;
  margin-top: 45%;
}
</style>
