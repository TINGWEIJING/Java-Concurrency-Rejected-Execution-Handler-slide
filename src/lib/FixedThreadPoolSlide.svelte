<script lang="ts">
  import { onMount } from 'svelte'
  import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import TaskQueueBox from './TaskQueueBox.svelte'
  import ThreadPoolBox from './ThreadPoolBox.svelte'
  import { wait } from './util'

  let taskQueueBox: TaskQueueBox
  let threadPoolBox: ThreadPoolBox
  let stage: 'code' | 'oom' = $state('code')
</script>

<Slide
  class="slide-container"
  in={() => {
    taskQueueBox.initTasks(8)
    threadPoolBox.initThreads(2)
    stage = 'code'
  }}
>
  <p class="title-top">Fixed Thread Pool</p>
  <div class="top-left-container column-layout">
    {#if stage === 'code'}
      <div in:fade>
        <Code
          class="large-code"
          lang="java"
          theme="poimandres"
          code={`@Bean
public Executor fixedThreadPool() {
  return Executors.newFixedThreadPool(2);
}`}
          options={{ duration: 600, stagger: 0.3, containerStyle: false }}
        />
      </div>
      <p in:fade class="normal-01">Task queue capacity is Integer.MAX_VALUE (2,147,483,647)</p>
    {/if}
    <Transition order={3}>
      <p in:fade class="normal-01">
        What if there aren't enough threads to handle the tasks quickly?
      </p>
    </Transition>
    <Transition order={5}>
      <p in:fade class="normal-02">
        An increase in the number of tasks can potentially raise a java.lang.OutOfMemoryError
        exception.
      </p></Transition
    >
  </div>
  <TaskQueueBox bind:this={taskQueueBox} initialTaskCount={8} />
  <ThreadPoolBox bind:this={threadPoolBox} initialThreadCount={2} />

  <Action
    order={1}
    do={async () => {
      let taskId: number | undefined
      for (let index = 0; index < 2; index++) {
        taskId = taskQueueBox.submitTask()
        if (taskId !== undefined) {
          threadPoolBox.addTask(taskId)
        }
      }
      await wait(800)
      for (let index = 0; index < 2; index++) {
        taskQueueBox.addTask()
      }
      await wait(800)
      threadPoolBox.completeTask(1)
      await wait(800)
      taskId = taskQueueBox.submitTask()
      if (taskId !== undefined) {
        threadPoolBox.addTask(taskId)
      }
    }}
  />
  <Action
    order={2}
    do={async () => {
      stage = 'oom'
    }}
  />
  <Action
    order={4}
    do={async () => {
      for (let index = 0; index < 10; index++) {
        taskQueueBox.addTask()
      }
    }}
  />
</Slide>
