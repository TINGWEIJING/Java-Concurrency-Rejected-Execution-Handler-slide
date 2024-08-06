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

  let topCode: Code
  let bottomCode: Code
</script>

<Slide class="slide-container" in={async () => {}}>
  <p class="title-top">@Async</p>
  <div class="max-width-flex-container center-highlight-container column-layout-small">
    <div>
      <Code
        bind:this={topCode}
        class="large-code"
        lang="java"
        theme="poimandres"
        code={`@Configuration
@EnableAsync
public class SpringAsyncConfig { ... }`}
        options={{ duration: 600, stagger: 0.3, containerStyle: false }}
      />
    </div>
    <div>
      <Code
        bind:this={bottomCode}
        class="large-code"
        lang="java"
        theme="poimandres"
        code={`@Async
public CompletableFuture<String> asyncGetNameByRank(int rank) {
    // endpoint calling logic
}`}
        options={{ duration: 600, stagger: 0.3, containerStyle: false }}
      />
    </div>
  </div>
</Slide>
