<script>
  let clicks = 0

  const handleClick = () => (clicks += 1)
</script>

<button
  class="border-none px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
  on:click={handleClick}>
  Clicked {clicks} {clicks === 1 ? 'time' : 'times'}
</button>
