export type Ranking = {
  name: string
  // 毫秒数
  time: number
  // 点击次数
  count: number
}

const ranking: Ranking[] = []

const config = {
  isStart: false,
  startTime: 0,
}

export function start() {
  config.isStart = true
  config.startTime = Date.now()
}

export function reset() {
  config.isStart = false
  ranking.splice(0, ranking.length)
}

export function push2answer(name: string) {
  if (!config.isStart) {
    throw new Error('抢答还未开始')
  }
  let r = ranking.find((item) => item.name === name)
  if (!r) {
    r = { name, time: Date.now() - config.startTime, count: 1 }
    ranking.push(r)
  } else {
    r.count += 1
  }
  return r
}

export function getRanking() {
  return ranking
}
