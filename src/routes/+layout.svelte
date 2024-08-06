<script lang="ts">
  import '../styles/app.css'

  let { children } = $props()
</script>

<svelte:head>
  <title>Java Concurrency: Rejected Execution Handler</title>
</svelte:head>

{@render children()}
