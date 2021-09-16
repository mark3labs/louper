<script lang="ts">
  import ReadContract from './ReadContract.svelte'
  import WriteContract from './WriteContract.svelte'
  import type { Facet } from '../../types/entities'
  import { getExplorerAddressUrl } from '../utils'
  import _ from 'lodash'

  export let diamondName: string
  export let address: string
  export let network: string
  export let facets: Facet[] = []

  let showReadContract = false
  let showWriteContract = false
  let activeFacet: Facet
</script>

<section class="body-font overflow-hidden mx-2">
  <div class="container py-5">
    <div class="flex flex-col text-center w-full mb-10">
      <h1 class="sm:text-4xl text-2xl font-medium title-font">
        {diamondName}
      </h1>
    </div>
    <div class="flex flex-wrap -m-12 mt-5">
      {#each facets as facet}
        <div class="px-12 py-5 md:w-1/2 flex flex-col items-start">
          <h2 class="sm:text-3xl text-2xl title-font font-medium mb-2">
            {facet.name || 'Unverified'}
          </h2>
          <span
            class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 dark:bg-indigo-200 dark:text-indigo-700 text-xs font-medium tracking-widest cursor-pointer"
            on:click={() =>
              window.open(getExplorerAddressUrl(facet.address, network))}
          >
            {facet.address}
            <svg
              class="w-3 h-3 md:w-4 md:h-4 inline"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
              />
              <path
                d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
              />
            </svg>
          </span>
          <ul class="mt-2 text-left pt-3 overflow-ellipsis text-sm mb-5">
            {#each facet.methods as method}
              <li class="font-semibold">{method.signature}</li>
            {/each}
            <!---->
          </ul>
          <div
            class="flex items-center flex-wrap pb-4 mb-4 border-b-2 dark:border-gray-400 mt-auto w-full"
          >
            {#if facet.name && facet.methods.length}
              <span
                class="mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 dark:border-gray-400 cursor-pointer"
                on:click={() => {
                  showReadContract = true
                  showWriteContract = false
                  activeFacet = facet
                }}
              >
                <svg
                  class="w-4 h-4 mr-1"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>Read
              </span>
              <span
                class="inline-flex items-center leading-none text-sm cursor-pointer"
                on:click={() => {
                  showWriteContract = true
                  showReadContract = false
                  activeFacet = facet
                }}
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clip-rule="evenodd"
                  />
                </svg>
                Write
              </span>
            {/if}
          </div>
        </div>
      {/each}
      <ReadContract
        {address}
        {network}
        bind:showModal={showReadContract}
        bind:facet={activeFacet}
      />
      <WriteContract
        {address}
        {network}
        allFacets={facets}
        bind:showModal={showWriteContract}
        bind:facet={activeFacet}
      />
    </div>
  </div>
</section>
