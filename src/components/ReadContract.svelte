<script lang="ts">
  import _ from 'lodash'
  import { fade } from 'svelte/transition'
  import Loading from './Loading.svelte'
  import type { Facet, Method } from '../../types/entities'
  import ContractReader from '../services/contractReader'

  export let address: string
  export let network: string
  export let showModal: boolean = false
  export let facet: Facet | undefined = undefined

  let selectedMethod: Method | null = null
  let readResult: Promise<object> | string = ''
  let args: any[] = []

  const reader = new ContractReader(address, network)
</script>

{#if showModal && facet}
  <div
    transition:fade={{ duration: 250 }}
    class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center w-full h-full px-5 bg-black bg-opacity-75"
  >
    <!-- A basic modal dialog with title, body and one button to close -->
    <div
      class="h-auto text-left bg-white dark:bg-gray-700 rounded shadow-xl min-w-full p-8 mx-0"
    >
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-2xl font-medium leading-6 mb-5">
          Read {facet.name}
        </h3>
        <label for="selectMethod" class="text-lg font-semibold"
          >Choose a Method to Interact With</label
        >
        <!-- svelte-ignore a11y-no-onchange -->
        <select
          name="selectMethod"
          class="border px-2 py-1 rounded-md shadow text-regular font-bold appearance-none w-auto block dark:bg-gray-500 mt-2"
          bind:value={selectedMethod}
          on:change={() => {
            args = []
            readResult = ''
          }}
        >
          <option value={null}> Select a method </option>
          {#each _.filter(facet.methods, (m) => m.fragment.constant) as method}
            <option value={method} class="font-semibold">
              {method.fragment.name}
            </option>
          {/each}
        </select>
        {#if selectedMethod}
          <form
            on:submit|preventDefault={() =>
              (readResult = reader.read(selectedMethod.fragment, args))}
            class="py-3"
          >
            <h3 class="text-lg font-semibold">
              {selectedMethod.fragment.name}
            </h3>
            {#each selectedMethod.fragment.inputs as input, i}
              <div class="ml-2 inline-block mr-2">
                <label for={input.name}>{input.name}</label>
                <input
                  type="text"
                  name={input.name}
                  bind:value={args[i]}
                  class="border-2 rounded m-2"
                />
              </div>
            {/each}
            <button
              type="submit"
              class="inline-flex text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded m-2"
            >
              Read
            </button>
          </form>

          <h2 class="text-lg font-semibold mt-5">Result</h2>
          <div class="mt-2 flex justify-center h-72">
            <p
              class="leading-5 text-gray-500 text-xl bg-gray-200 w-full p-5 rounded border border-dashed border-black overflow-auto"
            >
              {#await readResult}
                <div class="self-center">
                  <Loading />
                </div>
              {:then res}
                {#if res}
                  <pre
                    class="text-xs md:text-base">
                  {JSON.stringify(res.data, undefined, 2)}
                </pre>
                {/if}
              {:catch error}
                Whoops! Something went wrong...
              {/await}
            </p>
          </div>
        {/if}
      </div>

      <!-- One big close button.  --->
      <div class="mt-5 sm:mt-6">
        <span class="flex rounded-md shadow-sm w-full justify-center">
          <button
            class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
            on:click={() => {
              showModal = false
              selectedMethod = null
              readResult = ''
              args = []
            }}
          >
            Close
          </button>
        </span>
      </div>
    </div>
  </div>
{/if}
