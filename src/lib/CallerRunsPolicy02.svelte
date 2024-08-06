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
    code.update`@GetMapping("/top-10-ranking")
public ResponseEntity<List<String>> listTop10() {
    Executor callerRunsPolicyExecutor = getCallerRunsPolicyExecutor();
    List<String> result = IntStream.rangeClosed(1, 10)
            .boxed()
            // Submit task for async processing
            .map(rank -> CompletableFuture.supplyAsync(() -> getNameByRank(rank),
                    callerRunsPolicyExecutor))
            .map(CompletableFuture::join)
            .toList();
    return ResponseEntity.ok(result);
}`
  }}
>
  <p class="title-top">Caller Runs Policy</p>
  <div class="title-layout column-layout">
    <div>
      <Code
        bind:this={code}
        class="medium-code"
        lang="java"
        theme="poimandres"
        code={`@GetMapping("/top-10-ranking")
public ResponseEntity<List<String>> listTop10() {
    Executor callerRunsPolicyExecutor = getCallerRunsPolicyExecutor();
    List<String> result = IntStream.rangeClosed(1, 10)
            .boxed()
            // Submit task for async processing
            .map(rank -> CompletableFuture.supplyAsync(() -> getNameByRank(rank),
                    callerRunsPolicyExecutor))
            .map(CompletableFuture::join)
            .toList();
    return ResponseEntity.ok(result);
}`}
        options={{ duration: 600, stagger: 0.3, containerStyle: false }}
      />
    </div>
  </div>
  <Action
    do={async () => {
      // update code
      code.update`@GetMapping("/top-10-ranking")
public ResponseEntity<List<String>> listTop10() {
    Executor callerRunsPolicyExecutor = getCallerRunsPolicyExecutor();
    List<String> result = IntStream.rangeClosed(1, 10)
            .boxed()
            // When the task queue is full...
            // it will run in the caller thread,
            // running in sequence instead of parallel
            .map(rank -> getNameByRank(rank))
            .toList();
    return ResponseEntity.ok(result);
}`
    }}
  />
</Slide>
