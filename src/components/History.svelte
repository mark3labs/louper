<script lang="ts">
  import _ from 'lodash'
  import moment from 'moment'
  import type { LouperEvent } from '../../types/entities'
  import { getExplorerAddressUrl, getExplorerTxUrl } from '../utils'

  export let events: LouperEvent[]
  export let network: string
  export let facetsToName: Record<string, string>
</script>

<section class="body-font overflow-hidden mx-2">
  <div class="container py-5">
    <div class="flex flex-col text-center w-full mb-10">
      <h1 class="sm:text-4xl text-2xl font-medium title-font">History</h1>
    </div>
    <div class="-my-8 divide-y-2 divide-gray-100">
      {#each _.orderBy(events, 'timestamp', 'desc') as event}
        <div class="py-8 flex flex-wrap md:flex-nowrap">
          <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span class="font-semibold title-font">{event.event} 💎</span>
            <span class="mt-1 text-gray-500 text-sm">
              {moment.unix(event.timestamp).startOf('days').fromNow()}
            </span>
          </div>
          <div class="md:flex-grow">
            <span class="font-semibold">Transaction Hash:</span>
            <span
              class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 dark:bg-indigo-200 dark:text-indigo-700 text-xs font-medium tracking-widest cursor-pointer"
              on:click={() =>
                window.open(getExplorerTxUrl(event.transactionHash, network))}
            >
              {event.transactionHash}
              <svg
                class="w-3 h-3 md:w-4 md:h-4 hidden md:inline"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                /><path
                  d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                /></svg
              >
            </span>
            <h2 class="font-semibold title-font mb-2">Modified Facets</h2>
            {#if event.args}
              <ul>
                {#each event.args[0] as arg}
                  <li>
                    <span
                      class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 dark:bg-indigo-200 dark:text-indigo-700 text-xs font-medium tracking-widest my-1 cursor-pointer"
                      on:click={() =>
                        window.open(getExplorerAddressUrl(arg[0], network))}
                    >
                      {facetsToName[arg[0]] || arg[0]}
                      <svg
                        class="w-3 h-3 md:w-4 md:h-4 inline"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                          d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                        /><path
                          d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                        /></svg
                      >
                    </span>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
