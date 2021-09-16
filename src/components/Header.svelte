<script lang="ts">
  const toggleDarkMode = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      localStorage.setItem('dark', 'false')
    } else {
      html.classList.add('dark')
      localStorage.setItem('dark', 'true')
    }
    checked = !checked
  }

  const dark = localStorage.getItem('dark')
  let checked = dark === 'true' ? true : false
  if (checked) {
    const html = document.documentElement
    html.classList.add('dark')
  }
</script>

<header class="body-font border-b dark:border-gray-500">
  <div
    class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
  >
    <a class="flex title-font font-medium items-center mb-4 md:mb-0" href="/">
      <span class="text-3xl font-bold">💎</span>
      <span class="ml-3 text-xl">Louper - The Ethereum Diamond Inspector</span>
    </a>
    <nav
      class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"
    >
      <a class="mr-5 hover:text-gray-900" href="/">Home</a>
      <a
        class="mr-5 hover:text-gray-900"
        href="https://eips.ethereum.org/EIPS/eip-2535"
        target="_blank"
      >
        Diamond Standard (EIP-2535)
      </a>
      <a
        class="mr-5 hover:text-gray-900" 
        href="https://github.com/mark3labs/louper"
        target="_blank"
      >
        Github
      </a>
    </nav>
    <div class="flex mt-1 items-center">
      <svg
        class="w-6 h-6 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clip-rule="evenodd"
        /></svg
      >
      <!-- toggle -->
      <div class="relative">
        <!-- input -->
        <input type="checkbox" class="sr-only" {checked} />
        <!-- line -->
        <div
          class="block bg-gray-600 w-14 h-8 rounded-full"
          on:click={toggleDarkMode}
        />
        <!-- dot -->
        <div
          class="dot absolute left-1 top-1 bg-white dark:bg-gray-700 w-6 h-6 rounded-full transition"
          on:click={toggleDarkMode}
        />
      </div>
      <svg
        class="w-6 h-6 ml-2 inline"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>
    </div>
  </div>
</header>

<style>
  input:checked ~ .dot {
    @apply transform translate-x-6;
  }
</style>
