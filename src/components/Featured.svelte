<script lang="ts">
  const diamonds = [
    {
      name: 'Aavegotchi',
      icon: '/img/aavegotchi-polygon-logo.jpg',
      url:
        '/?address=0x86935F11C86623deC8a25696E1C19a8659CbF95d&network=polygon',
    },
    {
      name: 'Aavegotchi Staking',
      icon: '/img/aavegotchi-mainnet-logo.png',
      url: '/?address=0x93eA6ec350Ace7473f7694D43dEC2726a515E31A',
    },
    {
      name: 'BarnBridge',
      icon: '/img/barnbridge-logo.jpg',
      url: '/?address=0x10e138877df69Ca44Fdc68655f86c88CDe142D7F',
    },
    {
      name: 'PieDAO',
      icon: '/img/piedao-logo.png',
      url: '/?address=0x17525E4f4Af59fbc29551bC4eCe6AB60Ed49CE31',
    },
    {
      name: 'Gelato V2',
      icon: '/img/gelato-logo.png',
      url: '/?address=0x3CACa7b48D0573D793d3b0279b5F0029180E83b6',
    },
  ]
</script>

<section class="body-font">
  <div class="container mx-auto">
    <div class="flex flex-col text-center w-full mb-10">
      <h1 class="sm:text-3xl text-2xl font-medium title-font">
        Featured Diamonds
      </h1>
    </div>

    <div class="flex flex-wrap">
      {#each diamonds as diamond}
        <div
          class="p-4 md:w-1/5 w-full cursor-pointer"
          on:click={() => (window.location.href = diamond.url)}
        >
          <div
            class="flex rounded-lg h-full bg-gray-100 dark:bg-gray-500 p-8 flex-col items-center shadow border"
          >
            <div class="flex-grow">
              <img
                src={diamond.icon}
                alt={diamond.name}
                class="h-32 w-32 rounded-full border-2 border-black shadow-lg mb-2 object-cover"
              />
            </div>
            <div class="flex text-center mt-3">
              <h2 class="text-lg title-font font-medium">
                {diamond.name}
              </h2>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
