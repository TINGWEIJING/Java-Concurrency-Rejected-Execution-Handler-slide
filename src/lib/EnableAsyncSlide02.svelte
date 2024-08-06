<script lang="ts">
  import ThreadPoolBox from '$lib/ThreadPoolBox.svelte'
  import TaskQueueBox from '$lib/TaskQueueBox.svelte'
  import FixedThreadPoolSlide from '$lib/FixedThreadPoolSlide.svelte'
  import ThreadPoolTaskExecutorSlide from '$lib/ThreadPoolTaskExecutorSlide.svelte'
  import RejectedExecutionHandlerSlide from '$lib/RejectedExecutionHandlerSlide.svelte'
  import AbortPolicySlide from '$lib/AbortPolicySlide.svelte'
  import AbortPolicySlide02 from '$lib/AbortPolicySlide02.svelte'
  import CallerRunsPolicy from '$lib/CallerRunsPolicy.svelte'
  import CallerRunsPolicy02 from '$lib/CallerRunsPolicy02.svelte'
  import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
  import { tween } from '@animotion/motion'

  let code: Code
</script>

<Slide
  class="slide-container"
  in={async () => {
    code.update`@GetMapping("/top-10-ranking")
public ResponseEntity<List<String>> listTop10() {
    List<String> result = IntStream.rangeClosed(1, 10)
            .boxed()
            .map(rank -> CompletableFuture.supplyAsync(() -> getNameByRank(rank)))
            .map(CompletableFuture::join)
            .toList();
    return ResponseEntity.ok(result);
}`.then(() => {
      code.selectLines`*`
    })
  }}
>
  <p class="title-top">@Async</p>
  <div class="max-width-flex-container center-highlight-container column-layout-small">
    <div>
      <Code
        bind:this={code}
        class="medium-code"
        lang="java"
        theme="poimandres"
        code={`@GetMapping("/top-10-ranking")
public ResponseEntity<List<String>> listTop10() {
    List<String> result = IntStream.rangeClosed(1, 10)
            .boxed()
            .map(rank -> CompletableFuture.supplyAsync(() -> getNameByRank(rank)))
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
      // select lines
      code.selectLines`5`
    }}
  />
  <Action
    do={async () => {
      // update code
      code.update`@GetMapping("/top-10-ranking")
public ResponseEntity<List<String>> listTop10() {
    List<String> result = IntStream.rangeClosed(1, 10)
            .boxed()
            .map(rank -> asyncService.asyncGetNameByRank(rank))
            .map(CompletableFuture::join)
            .toList();
    return ResponseEntity.ok(result);
}`
    }}
  />
</Slide>
