<script lang="ts">
  import ThreadPoolBox from '$lib/ThreadPoolBox.svelte'
  import TaskQueueBox from '$lib/TaskQueueBox.svelte'
  import SupplyAsyncSlide from '$lib/SupplyAsyncSlide.svelte'
  import EnableAsyncSlide from '$lib/EnableAsyncSlide.svelte'
  import EnableAsyncSlide02 from '$lib/EnableAsyncSlide02.svelte'
  import FixedThreadPoolSlide from '$lib/FixedThreadPoolSlide.svelte'
  import ThreadPoolTaskExecutorSlide from '$lib/ThreadPoolTaskExecutorSlide.svelte'
  import RejectedExecutionHandlerSlide from '$lib/RejectedExecutionHandlerSlide.svelte'
  import AbortPolicySlide from '$lib/AbortPolicySlide.svelte'
  import AbortPolicySlide02 from '$lib/AbortPolicySlide02.svelte'
  import CallerRunsPolicy from '$lib/CallerRunsPolicy.svelte'
  import CallerRunsPolicy02 from '$lib/CallerRunsPolicy02.svelte'
  import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
  import { tween } from '@animotion/motion'
</script>

<Presentation
  options={{
    history: true,
    transition: 'slide',
    controls: true,
    progress: true,
    slideNumber: true
  }}
>
  <Slide class="slide-container">
    <div class="title-layout column-layout">
      <p class="normal-03">Java Concurrency:</p>
      <p class="title">Rejected Execution Handler</p>
      <p class="normal-02">
        Behavior for handling tasks that are rejected by a ThreadPoolExecutor when it has reached
        its capacity limits.
      </p>
    </div>
  </Slide>

  <SupplyAsyncSlide />
  <EnableAsyncSlide />
  <EnableAsyncSlide02 />

  <Slide class="slide-container">
    <div class="title-layout column-layout">
      <p class="title">Executor</p>
      <p class="normal-03">
        Java interface that provides methods for managing the execution of asynchronous tasks in a
        concurrent environment.
      </p>
    </div>
  </Slide>

  <Slide class="slide-container">
    <div class="title-layout column-layout">
      <p class="title">Executor</p>
      <p class="normal-03">Common use:</p>
      <div>
        <ol>
          <li class="normal-02">Executors.newFixedThreadPool()</li>
          <li class="normal-02">new ThreadPoolTaskExecutor()</li>
        </ol>
      </div>
    </div>
  </Slide>
  <FixedThreadPoolSlide />
  <ThreadPoolTaskExecutorSlide />
  <RejectedExecutionHandlerSlide />

  <AbortPolicySlide />
  <AbortPolicySlide02 />
  <CallerRunsPolicy />
  <CallerRunsPolicy02 />

  <Slide class="slide-container">
    <p class="title-top">Other Policies</p>
    <div class="point-form-flex-container center-highlight-container">
      <ol start="3">
        <li class="normal-01">
          Discard Policy
          <ul style="list-style-type:disc;">
            <li class="normal-02">Similar to Abort Policy, but without throwing exception</li>
          </ul>
        </li>
        <li class="normal-01">
          Discard Oldest Policy <ul style="list-style-type:disc;">
            <li class="normal-02">Discard oldest task to make space for new task</li>
          </ul>
        </li>
      </ol>
    </div>
  </Slide>

  <Slide class="slide-container">
    <p class="title-top">Key Takeaway</p>
    <div class="point-form-flex-container center-highlight-container">
      <ol>
        <li class="normal-01">
          <b>Executors.newFixedThreadPool()</b>
          <ul style="list-style-type:disc;">
            <li class="normal-03">Short-lived tasks or IO tasks with a timeout only</li>
            <li class="normal-03">Potentially causing OOM error</li>
          </ul>
        </li>
        <li class="normal-01">
          <b>new ThreadPoolTaskExecutor()</b>
          <ul style="list-style-type:disc;">
            <li class="normal-03">
              Abort Policy (default) -> Ensure try-catch TaskRejectedException
            </li>
            <li class="normal-03">
              Caller Runs Policy -> Guarantees execution but may slow down the request thread
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </Slide>

  <Slide class="slide-container">
    <p class="title-top">Future Exploration</p>
    <div class="point-form-flex-container center-highlight-container">
      <ol>
        <li class="normal-01">
          <b>Observability & Tuning</b>
          <ul style="list-style-type:disc;">
            <li class="normal-03">Custom RejectedExecutionHandler</li>
            <li class="normal-03">Surface values via Java Management Extensions (JMX)</li>
          </ul>
        </li>
        <li class="normal-01">
          <b>Explore how Tomcat/Jetty handle IO request</b>
        </li>
        <li class="normal-01">
          <b>Dynamically update ThreadPoolTaskExecutor</b>
        </li>
      </ol>
    </div>
  </Slide>
</Presentation>
