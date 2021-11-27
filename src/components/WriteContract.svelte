<script lang="ts">
  import _ from 'lodash'
  import { fade } from 'svelte/transition'
  import Loading from './Loading.svelte'
  import type { Facet, Method } from '../../types/entities'
  import WalletStores from 'web3w'
  import { WalletConnectModuleLoader } from 'web3w-walletconnect-loader'
  import { getExplorerAddressUrl } from '../utils'

  export let address: string
  export let network: string
  export let showModal: boolean = false
  export let facet: Facet | undefined = undefined
  export let allFacets: Facet[] = []

  const CHAIN_IDS: Record<string, string> = {
    mainnet: '1',
    ropsten: '3',
    rinkeby: '4',
    kovan: '42',
    goerli: '420',
    xdai: '100',
    polygon: '137',
    mumbai: '80001',
  }

  let abi: any[] = []

  allFacets.forEach((f) => {
    f.methods.forEach((m: Method) => {
      abi.push(m.fragment)
    })
  })

  const { wallet, builtin, chain, flow, transactions } = WalletStores({
    builtin: { autoProbe: true },
    chainConfigs: {
      contracts: {
        facet: {
          address: address,
          abi: abi,
        },
      },
      chainId: CHAIN_IDS[network],
    },
    options: [
      'builtin',
      new WalletConnectModuleLoader({
        chainId: CHAIN_IDS[network],
        infuraId: 'bc0bdd4eaac640278cdebc3aa91fabe4',
      }),
    ],
  })

  let selectedMethod: Method | null = null
  let readResult: Promise<object> | string = ''
  let args: any[] = []

  const connect = async (option: string = 'builtin') => {
    try {
      await wallet.connect(option)
    } catch (e) {
      wallet.acknowledgeError()
      await wallet.disconnect()
      alert(`Please make sure your wallet is connected to ${network}`)
    }
  }

  let error: any = null

  $: if ($flow.executionError) {
    error = $flow.executionError
    flow.cancel()
    wallet.acknowledgeError()
  }
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
          Write {facet.name}
        </h3>
        {#if $wallet.state !== 'Ready'}
          {#if $builtin.available}
            <button
              class="bg-blue-500 text-white inline-block rounded px-2 py-1"
              on:click={() => connect()}
            >
              Connect
            </button>
          {/if}
          <button
            class="bg-blue-500 text-white inline-block rounded px-2 py-1"
            on:click={() => connect('walletconnect')}
          >
            Connect w/ WalletConnect
          </button>
        {/if}

        {#if $wallet.state === 'Ready'}
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
              error = null
              readResult = ''
            }}
          >
            <option value={null}> Select a method </option>
            {#each _.filter(facet.methods, (m) => !m.fragment.constant) as method}
              <option value={method} class="font-semibold">
                {method.fragment.name}
              </option>
            {/each}
          </select>
        {/if}
        {#if selectedMethod}
          <form
            on:submit|preventDefault={() => {
              error = null
              flow.execute((contracts) =>
                contracts.facet[selectedMethod.fragment.name](...args)
              )
            }}
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
              Execute
            </button>
          </form>

          <h2 class="text-lg font-semibold mt-5">Result</h2>
          <div class="mt-2 flex justify-center h-72">
            <p
              class="leading-5 text-gray-500 text-xl bg-gray-200 w-full p-5 rounded border border-dashed border-black overflow-auto"
            >
              {#if $wallet.pendingUserConfirmation}
                Please check and approve the transaction in your wallet.
              {/if}

              {#if $flow.inProgress}
                <div class="self-center">
                  <Loading />
                </div>
              {/if}

              {#if error}
                <div class="self-center">
                  <p class="text-red-500 font-semibold">
                    {error.message}
                  </p>
                </div>
              {/if}
              {#each $transactions as transaction}
                TX Hash: <a
                  class="text-blue-500"
                  href={getExplorerAddressUrl(transaction.hash, network)}
                  target="_blank"
                >
                  {transaction.hash}
                </a>
                <span class="uppercase font-semibold">
                  {transaction.status}
                </span>
              {/each}
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
              wallet.disconnect()
              error = null
            }}
          >
            Close
          </button>
        </span>
      </div>
    </div>
  </div>
{/if}
