<script lang="ts">
  export let address: string = ''
  export let network: string = 'mainnet'

</script>

<div
  class="bg-white dark:bg-gray-500 shadow p-2 flex border rounded-md mx-2 mb-5"
>
  <span class="w-auto hidden md:flex justify-start items-center">
    <span class="text-xl font-bold">💎</span>
  </span>
  <input
    class="w-full rounded py-2 focus:outline-none md:text-xl text-gray-500 dark:bg-gray-500 dark:text-gray-200 border-0 hover:outline-none focus:border-none mx-3"
    type="text"
    placeholder="0x..."
    bind:value={address}
  />
  <select
    class="dark:bg-gray-500 dark:text-gray-200 border mx-2 px-2 rounded-md shadow text-regular font-bold appearance-none w-4/12 md:w-auto"
    bind:value={network}
  >
    <option value="mainnet" class="font-semibold">🟢 Mainnet</option>
    <option value="ropsten" class="font-semibold">🧪 Ropsten</option>
    <option value="kovan" class="font-semibold">🧪 Kovan</option><option
      value="rinkeby"
      class="font-semibold"
    >
      🧪 Rinkeby
    </option>
    <option value="goerli" class="font-semibold">🧪 Goerli</option><option
      value="xdai"
      class="font-semibold">🟡 xDAI</option
    >
    <option value="polygon" class="font-semibold">🔵 Polygon (Matic)</option>
    <option value="mumbai" class="font-semibold">🧪 Mumbai</option>
    <option value="binance" class="font-semibold">🟠 Binance (BSC)</option>
  </select>
  <a
    class="bg-gradient-to-r from-green-400 to-blue-500 rounded-md shadow text-white px-3 py-2 border border-black"
    href={`/?address=${address}&network=${network}`}
  >
    <p class="font-semibold text-regular">🔎</p>
  </a>
</div>
