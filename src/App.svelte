<script lang="ts">
  import { fade } from 'svelte/transition'
  import Header from './components/Header.svelte'
  import Footer from './components/Footer.svelte'
  import Featured from './components/Featured.svelte'
  import Facets from './components/Facets.svelte'
  import History from './components/History.svelte'
  import Search from './components/Search.svelte'
  import Loading from './components/Loading.svelte'
  import Feedback from './components/Feedback.svelte'
  import Badges from './components/Badges.svelte'

  import DiamondContract from './services/diamond'

  const urlParams = new URLSearchParams(window.location.search)
  const diamondAddress: string = urlParams.get('address') || ''
  const diamondNetork: string = urlParams.get('network') || 'mainnet'

  let diamondContract: DiamondContract

  if (diamondAddress) {
    diamondContract = new DiamondContract(diamondAddress, diamondNetork)
  }
</script>

<div
  class="flex flex-col h-screen font-nunito text-gray-700 dark:text-gray-400"
>
  <Header />

  <div class="container flex-grow self-center mt-10">
    <Search address={diamondAddress} network={diamondNetork} />

    {#if diamondContract}
      {#await diamondContract.fetchContractDetails()}
        <Loading />
      {:then diamond}
        <div transition:fade={{ duration: 500 }}>
          <Badges 
            locked={diamond.isFinal} 
            verified={diamond.isVerified} 
          />
          <Facets
            diamondName={diamond.name}
            facets={diamond.facets}
            address={diamondAddress}
            network={diamondNetork}
          />
          <History
            events={diamond.events}
            network={diamondNetork}
            facetsToName={diamond.facetsToName}
          />
        </div>
      {:catch error}
        <div class="flex flex-col items-center text-gray-500 p-10">
          <div class="text-4xl font-semibold">
            Whoops! Something went wrong...
          </div>
          <svg
            class="h-48 w-48"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      {/await}
    {:else}
      <Featured />
    {/if}
  </div>

  <Footer />
  <Feedback />
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
