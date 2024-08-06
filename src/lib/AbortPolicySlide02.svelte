<script lang="ts">
  import { onMount } from 'svelte'
  import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
  import { tween } from '@animotion/motion'
  import { fade, fly } from 'svelte/transition'
  import TaskQueueBox from './TaskQueueBox.svelte'
  import ThreadPoolBox from './ThreadPoolBox.svelte'

  let code: Code
</script>

<Slide
  class="slide-container"
  in={async () => {
    code.update`Executor abortPolicyExecutor = getAbortPolicyExecutor();
CompletableFuture.supplyAsync(this::asyncTask, abortPolicyExecutor)
        .exceptionally(throwable -> {
            // TaskRejectedException will NOT be caught here
            logger.error("Error occurred while executing task", throwable);
            return null;
        });`
  }}
>
  <p class="title-top">Abort Policy</p>
  <div class="title-layout column-layout">
    <div>
      <Code
        bind:this={code}
        class="medium-code"
        lang="java"
        theme="poimandres"
        code={`Executor abortPolicyExecutor = getAbortPolicyExecutor();
CompletableFuture.supplyAsync(this::asyncTask, abortPolicyExecutor)
        .exceptionally(throwable -> {
            // TaskRejectedException will NOT be caught here
            logger.error("Error occurred while executing task", throwable);
            return null;
        });`}
        options={{ duration: 600, stagger: 0.3, containerStyle: false }}
      />
    </div>
  </div>
  <Action
    do={async () => {
      // update code
      code.update`Executor abortPolicyExecutor = getAbortPolicyExecutor();
try {
    CompletableFuture.supplyAsync(this::asyncTask, abortPolicyExecutor)
            .exceptionally(throwable -> {
                // TaskRejectedException will NOT be caught here
                logger.error("Error occurred while executing task", throwable);
                return null;
            });
} catch (TaskRejectedException e) {
    logger.error("Error occurred while submitting task", e);
}`
    }}
  />
</Slide>
