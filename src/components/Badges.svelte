<script>
  import _ from 'lodash'

  export let locked = false
  export let verified = false
</script>

<section class="mt-10 uppercase text-white font-semibold text-regular">
  {#if verified && locked}
    <div
      class=" bg-green-500 p-2 rounded-md border-2 dark:border-gray-400  shadow-md flex w-min"
    >
      <span class="inline mr-2">🔒</span>
      Final
    </div>
  {/if}
  {#if verified && !locked}
    <div
      class=" bg-yellow-500 p-2 rounded-md border-2 dark:border-gray-400 shadow-md flex w-min"
    >
      <span class="inline mr-2">🔓</span>
      Upgradable
    </div>
  {/if}
  {#if !verified}
    <div
      class=" bg-red-500 p-2 rounded-md border-2 dark:border-gray-400 shadow-md flex w-min"
    >
      <span class="inline mr-2">⚠️</span> Unverified
    </div>
  {/if}
</section>
