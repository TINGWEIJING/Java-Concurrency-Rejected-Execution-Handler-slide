<script lang="ts">
  import { onMount } from 'svelte'
  import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
  import { tween } from '@animotion/motion'
  import { fade, fly } from 'svelte/transition'
  import TaskQueueBox from './TaskQueueBox.svelte'
  import ThreadPoolBox from './ThreadPoolBox.svelte'

  const initialTaskNumber = 6
  const queueCapacity = 8
  let taskQueueBox: TaskQueueBox
  let queueSizeTracking = tween(initialTaskNumber, { duration: 500 })
</script>

<Slide
  class="slide-container"
  in={async () => {
    taskQueueBox.initTasks(initialTaskNumber)
  }}
>
  <p class="title-top">Abort Policy</p>
  <!-- <p class="normal-03" style={'position: absolute; bottom: 24%; left: 30%'}>
    {`Task Num: ${$queueSizeTracking.toFixed(0)} | Queue Capacity: ${queueCapacity}`}
  </p>
  <TaskQueueBox
    bind:this={taskQueueBox}
    div_class={'task-queue-box-alt'}
    initialTaskCount={initialTaskNumber}
  /> -->
  <div class="title-layout column-layout">
    <Transition enter="fade">
      <p class="normal-03">
        When a new task comes in but the task queue is full and the thread pool has reached its
        maximum...
      </p>
    </Transition>
    <Transition enter="fade">
      <p class="normal-02">Throws a java.util.concurrent.RejectedExecutionException</p>
    </Transition>
  </div>
  <!-- TODO (WJ): animate task coming and reject -->
</Slide>
