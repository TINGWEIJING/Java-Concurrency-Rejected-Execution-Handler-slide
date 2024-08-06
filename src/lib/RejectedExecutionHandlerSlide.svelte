<script lang="ts">
  import { onMount } from 'svelte'
  import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
  import { tween } from '@animotion/motion'
  import TaskQueueBox from './TaskQueueBox.svelte'
  import ThreadPoolBox from './ThreadPoolBox.svelte'

  let code: Code
</script>

<Slide
  class="slide-container"
  in={async () => {
    await code.update`@Bean
public ThreadPoolTaskExecutor taskExecutor() {
  ThreadPoolTaskExecutor executor = 
      new ThreadPoolTaskExecutor();
  executor.setCorePoolSize(2);
  executor.setMaxPoolSize(4);
  executor.setQueueCapacity(8);
  executor.initialize();
  return executor;
}`.then(() => {
      code.selectLines`*`
    })
  }}
>
  <p class="title-top">Rejected Execution Handler</p>
  <div class="max-width-flex-container center-highlight-container column-layout-small">
    <div>
      <Code
        class="large-code"
        bind:this={code}
        lang="java"
        theme="poimandres"
        code={`@Bean
public ThreadPoolTaskExecutor taskExecutor() {
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
    <Transition order={5}>
      <div class="column-layout-small">
        <p class="normal-01">Policies:</p>
        <ol>
          <li class="normal-02">AbortPolicy</li>
          <li class="normal-02">CallerRunsPolicy</li>
          <li class="normal-02">DiscardPolicy</li>
          <li class="normal-02">DiscardOldestPolicy</li>
        </ol>
      </div>
    </Transition>
  </div>

  <Action
    order={2}
    do={async () => {
      // show setRejectedExecutionHandler
      await code.update`@Bean
public ThreadPoolTaskExecutor taskExecutor() {
  ThreadPoolTaskExecutor executor = 
      new ThreadPoolTaskExecutor();
  executor.setRejectedExecutionHandler(
      new ThreadPoolExecutor.AbortPolicy());
  executor.setCorePoolSize(2);
  executor.setMaxPoolSize(4);
  executor.setQueueCapacity(8);
  executor.initialize();
  return executor;
}`
      await code.selectLines`5-6`
    }}
  />
  <Action
    order={3}
    do={async () => {
      // show default RejectedExecutionHandler
      await code.update`ThreadPoolTaskExecutor executor = 
      new ThreadPoolTaskExecutor();
// default to AbortPolicy if not specified
executor.setRejectedExecutionHandler(...);`.then(() => {
        code.selectLines`*`
      })
    }}
  />
</Slide>
