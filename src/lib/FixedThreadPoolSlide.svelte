<script lang="ts">
  import { onMount } from 'svelte'
  import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
  import TaskQueueBox from './TaskQueueBox.svelte'
  import ThreadPoolBox from './ThreadPoolBox.svelte'

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
  <p class="title-top">FixedThreadPool</p>
  <div class="top-left-container">
    {#if stage === 'code'}
      <div>
        <Code
          lang="java"
          theme="poimandres"
          code={`@Bean
public ExecutorService fixedThreadPool() {
  return Executors.newFixedThreadPool(2);
}`}
          options={{ duration: 600, stagger: 0.3, containerStyle: false }}
        />
      </div>
      <p class="normal-01">Task queue size is unbounded (Integer.MAX_VALUE)</p>
    {:else if stage === 'oom'}
      <p class="normal-01">What if threads are not enough to handle the tasks quickly?</p>
      <p class="normal-02">
        Number of task increases which potentially raise java.lang.OutOfMemoryError exception.
      </p>{/if}
  </div>
  <TaskQueueBox bind:this={taskQueueBox} initialTaskCount={8} />
  <ThreadPoolBox bind:this={threadPoolBox} initialThreadCount={2} />

  <Action
    do={async () => {
      let taskId: number | undefined
      for (let index = 0; index < 2; index++) {
        taskId = taskQueueBox.submitTask()
        if (taskId !== undefined) {
          threadPoolBox.addTask(taskId)
        }
      }
    }}
  />
  <Action
    do={async () => {
      stage = 'oom'
    }}
  />
  <Action
    do={async () => {
      for (let index = 0; index < 10; index++) {
        taskQueueBox.addTask()
      }
    }}
  />
</Slide>
