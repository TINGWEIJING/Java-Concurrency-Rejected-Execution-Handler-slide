<script lang="ts">
  import { onMount } from 'svelte'
  import type { Thread } from './type'
  import { slide } from 'svelte/transition'
  import { send, receive } from './transition'

  interface ThreadPoolBoxProps {
    initialThreadCount?: number
  }
  let { initialThreadCount }: ThreadPoolBoxProps = $props()
  let threads: Thread[] = $state([])
  let threadCounter: number = $state(0)

  onMount(() => {
    console.log('Mount thread box')
    if (initialThreadCount !== undefined) {
      initThreads(initialThreadCount)
    }
  })

  const initThreads = (numOfThreads: number) => {
    threads = []
    threadCounter = 0
    for (let i = 0; i < numOfThreads; i++) {
      threads.push({
        id: threadCounter
      })
      threadCounter += 1
    }
  }

  const spawnThread = () => {
    threads.push({
      id: threadCounter
    })
    threadCounter += 1
  }

  const killThread = (id?: number) => {
    if (id === undefined) {
      let selectedThreadIndex: number | undefined = undefined
      for (let index = 0; index < threads.length; index++) {
        const selectedThread = threads[index]
        if (selectedThread.taskId === undefined) {
          selectedThreadIndex = index
          break
        }
      }
      if (selectedThreadIndex !== undefined) {
        threads.splice(selectedThreadIndex, 1)
      }
    }
  }

  const addTask = (taskId: number) => {
    let selectedThreadIndex: number | undefined = undefined
    for (let index = 0; index < threads.length; index++) {
      const selectedThread = threads[index]
      if (selectedThread.taskId === undefined) {
        selectedThreadIndex = index
        break
      }
    }
    if (selectedThreadIndex !== undefined) {
      threads[selectedThreadIndex].taskId = taskId
    }
  }

  const completeTask = (threadId: number) => {
    let selectedThreadIndex: number | undefined = undefined
    for (let index = 0; index < threads.length; index++) {
      const selectedThread = threads[index]
      if (selectedThread.id === threadId) {
        selectedThreadIndex = index
        break
      }
    }
    if (selectedThreadIndex !== undefined) {
      threads[selectedThreadIndex].taskId = undefined
    }
  }

  export { initThreads, spawnThread, killThread, addTask, completeTask }
</script>

<div class="thread-pool-box">
  {#each threads as thread (thread.id)}
    <div class="thread-box" transition:slide>
      <div class="task-container-box">
        {#if thread.taskId !== undefined}
          <div
            class="task-circle"
            in:receive={{ key: thread.taskId }}
            out:send={{ key: thread.taskId }}
          >
            {`${thread.taskId + 1}`}
          </div>
        {/if}
      </div>
      <div class="thread-label">{`thread-${thread.id + 1}`}</div>
    </div>
  {/each}
</div>

<style>
</style>
