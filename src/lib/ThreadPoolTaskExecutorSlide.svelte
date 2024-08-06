<script lang="ts">
  import { onMount } from 'svelte'
  import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
  import { tween } from '@animotion/motion'
  import TaskQueueBox from './TaskQueueBox.svelte'
  import ThreadPoolBox from './ThreadPoolBox.svelte'

  const initialTaskNumber = 6
  let taskQueueBox: TaskQueueBox
  let threadPoolBox: ThreadPoolBox
  let code: Code
  let stage: 'code' | 'question' = $state('code')
  let queueSizeTracking = tween(initialTaskNumber, { duration: 500 })
</script>

<Slide
  class="slide-container"
  in={async () => {
    taskQueueBox.initTasks(initialTaskNumber)
    threadPoolBox.initThreads(2)
    stage = 'code'
    if (code !== undefined) {
      await code.selectLines`*`
    }
    await queueSizeTracking.to(taskQueueBox.getTaskCount())
  }}
>
  <p class="title-top">Thread Pool Task Executor</p>
  <div class="top-left-container column-layout">
    {#if stage === 'code'}
      <div>
        <Code
          bind:this={code}
          class="small-code"
          lang="java"
          theme="poimandres"
          code={`@Bean
public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = 
        new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(2);
    executor.setMaxPoolSize(4);
    executor.setQueueCapacity(8);
    executor.initialize();
    return executor;
}`}
          options={{ duration: 600, stagger: 0.3, containerStyle: false }}
        />
      </div>
    {:else if stage === 'question'}
      <p class="normal-01">
        What if the task queue hits its capacity again after the pool size is expanded?
      </p>
    {/if}
  </div>
  <p class="normal-03" style={'position: absolute; bottom: 24%; left: 14%'}>
    {`Task Num: ${$queueSizeTracking.toFixed(0)} | Queue Capacity: 8`}
  </p>
  <TaskQueueBox bind:this={taskQueueBox} initialTaskCount={initialTaskNumber} />
  <ThreadPoolBox bind:this={threadPoolBox} initialThreadCount={2} />

  <Action
    do={async () => {
      if (code !== undefined) {
        await code.selectLines`5-7'`
      }
    }}
  />

  <Action
    do={async () => {
      // submit 2 tasks to thread pool
      let taskId: number | undefined
      for (let index = 0; index < 2; index++) {
        taskId = taskQueueBox.submitTask()
        if (taskId !== undefined) {
          threadPoolBox.addTask(taskId)
        }
      }
      await queueSizeTracking.to(taskQueueBox.getTaskCount())
    }}
  />
  <Action
    do={async () => {
      // add 4 tasks to task queue
      for (let index = 0; index < 4; index++) {
        taskQueueBox.addTask()
      }
      await queueSizeTracking.to(taskQueueBox.getTaskCount())
    }}
  />
  <Action
    do={async () => {
      // reach queue capacity, add 2 more threads
      for (let index = 0; index < 2; index++) {
        threadPoolBox.spawnThread()
      }
    }}
  />
  <Action
    do={async () => {
      // submit 2 tasks to thread pool
      let taskId: number | undefined
      for (let index = 0; index < 2; index++) {
        taskId = taskQueueBox.submitTask()
        if (taskId !== undefined) {
          threadPoolBox.addTask(taskId)
        }
      }
      await queueSizeTracking.to(taskQueueBox.getTaskCount())
    }}
  />
  <Action
    do={async () => {
      // add 2 tasks to task queue
      for (let index = 0; index < 2; index++) {
        taskQueueBox.addTask()
      }
      await queueSizeTracking.to(taskQueueBox.getTaskCount())
      stage = 'question'
    }}
  />
</Slide>
