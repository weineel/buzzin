<template>
  <div class="ranking">
    <div v-if="isStart" class="list">
      <table>
        <tr v-for="(item, index) in rankingList" :key="item.name">
          <td>{{ index + 1}}.</td>
          <td>{{ item.name }}</td>
          <td>{{ item.time / 1000 }}秒</td>
          <td>点击 {{ item.count }} 次</td>
        </tr>
      </table>
    </div>
    <div v-else class="start">
      <van-button type="primary" @click="start"> 开始抢答 </van-button>
    </div>
    <van-overlay :show="loading">
      <div class="loading-wrapper" @click.stop>
        <van-loading type="spinner" color="#1989fa" />
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import socketIOClient from 'socket.io-client'
import confetti from 'canvas-confetti'

type Ranking = {
  name: string
  // 毫秒数
  time: number
  // 点击次数
  count: number
}

const loading = ref(false)

const isStart = ref(false)

/** 开始抢答 */
function start() {
  axios.post('/api/start').then(({ data }) => {
    if (data.code === 0) {
      isStart.value = true
      loading.value = true
      initSocket()
    }
  })
}

/** 重置抢答数据 */
function reset() {
  axios.post('/api/reset')
}
// 刷新页面就重置
reset()

const rankingList = ref<Ranking[]>([])

/** 建立 socket 连接实时显示 排行榜数据 */
function initSocket() {
  const socket = socketIOClient()
  socket.on('update-ranking', function (message) {
    rankingList.value = message.data
    loading.value = false
    confettiFire()
  })
}

// fire
const count = 200
const defaults = {
  origin: { y: 0.7 }
}

function fire(particleRatio: number, opts: any) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }))
}

/** 生成一个有调用次数限制的函数 */
function invokeLimit<T extends Function>(fn: T, limit: number = 1): T {
  let count = 0
  return function (...args: any[]) {
    if (count < limit) {
      count++
      return fn(...args)
    }
  } as any

}

/** 第一名产生撒花, 只有第一次调用才有效果 */
const confettiFire = invokeLimit(() => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
})
</script>

<style scoped>
.ranking {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 10%;
}

.list table td {
  padding: 8px 12px;
}

.list table tr:first-child {
  font-size: 24px;
  color: gold;
}

.van-button {
  border-radius: 50%;
  height: 100px;
  width: 100px;
}
.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.van-overlay {
  background: rgba(0, 0, 0, .12);
}
</style>
