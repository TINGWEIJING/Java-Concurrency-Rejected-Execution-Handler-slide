<script lang="ts">
  import { onMount } from 'svelte'
  import type { Task } from './type'
  import { fly } from 'svelte/transition'
  import { send, receive } from './transition'
  import { flip } from 'svelte/animate'

  interface TaskQueueBoxProps {
    initialTaskCount?: number
    div_class?: string
  }
  let { initialTaskCount, div_class = 'task-queue-box' }: TaskQueueBoxProps = $props()
  let tasks: Task[] = $state([])
  let taskCounter: number = $state(0)

  onMount(() => {
    if (initialTaskCount !== undefined) {
      initTasks(initialTaskCount)
    }
  })

  const initTasks = (numOfTasks: number) => {
    tasks = []
    taskCounter = 0
    for (let i = 0; i < numOfTasks; i++) {
      tasks.push({
        id: taskCounter
      })
      taskCounter += 1
    }
  }

  const addTask = () => {
    tasks.push({
      id: taskCounter
    })
    taskCounter += 1
  }

  const submitTask = () => {
    const selectedTask = tasks.shift()
    return selectedTask?.id
  }

  const getTaskCount = () => {
    return tasks.length
  }

  export { initTasks, addTask, submitTask, getTaskCount }
</script>

<div class={div_class}>
  {#each tasks as task (task.id)}
    <div
      class="task-circle"
      animate:flip
      style={`z-index: ${100 - task.id}`}
      in:receive={{ key: task.id }}
      out:send={{ key: task.id }}
    >
      {`${task.id + 1}`}
    </div>
  {/each}
</div>
