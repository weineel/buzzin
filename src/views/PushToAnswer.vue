<template>
  <div class="push2answer">
    <div class="name-wrapper">
      队名：<input type="text" v-model="state.name" />
    </div>

    <van-button type="primary" @click="doPush2answer">抢答</van-button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import { showToast } from 'vant'

const props = defineProps({
  name: String
})

const state = reactive({
  name: props.name
})

function doPush2answer() {
  if (!state.name) {
    showToast('请输入队名')
    return
  }
  axios.post('/api/push2answer', { name: state.name }).then((res) => {
    if (res.data.code) {
      showToast(res.data.message)
    }
  })
}

</script>

<style scoped>
.push2answer {
  padding: 2em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.van-button {
  margin: auto 0;
  border-radius: 50%;
  height: 80px;
  width: 80px;
}
</style>
