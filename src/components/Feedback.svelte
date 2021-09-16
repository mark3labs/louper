<script lang="ts">
  import { fade } from 'svelte/transition'
  import sendFeedback from '../services/feedback'
  import Loading from './Loading.svelte'

  let showForm = false
  let feedback: string = ''
  let awaitFeedback: Promise<void> | undefined = undefined
</script>

{#if showForm}
  <div
    class="fixed bottom-0 right-0 z-10 bg-gray-200 dark:bg-gray-700 border rounded m-4 w-11/12 md:w-1/3 lg:w-3/12 md:mr-5 p-3"
    transition:fade={{ duration: 250 }}
  >
    {#if awaitFeedback}
      {#await awaitFeedback}
        <Loading />
      {:then}
        <div class="w-full text-center text-xl font-semibold p-24">
          Feedback sent!
        </div>
      {:catch}
        Error sending feedback!
      {/await}
    {:else}
      <div class="py-5 font-semibold">
        If you find a bug, or have feedback, leave it here.
      </div>
      <textarea
        name="feedback"
        cols="30"
        rows="5"
        placeholder="Your feedback..."
        class="p-3 w-full rounded-md dark:bg-gray-500"
        bind:value={feedback}
      />
    {/if}
    <div class="flex justify-between">
      <button
        class="bg-indigo-500 px-3 py-2 text-white font-semibold border border-black rounded w-full my-2 mr-2"
        on:click={() => {
          showForm = false
          feedback = ''
          awaitFeedback = undefined
        }}
      >
        {#if awaitFeedback}
          Close
        {:else}
          Cancel
        {/if}
      </button>
      {#if !awaitFeedback}
        <button
          class="bg-blue-500 px-3 py-2 text-white font-semibold border border-black rounded w-full my-2 ml-1-2"
          class:opacity-50={!feedback}
          class:cursor-not-allowed={!feedback}
          on:click={() => (awaitFeedback = sendFeedback(feedback))}
          disabled={!feedback}
        >
          Send Feedback
        </button>
      {/if}
    </div>
  </div>
{:else}
  <button
    class="border border-black float-right bottom-0 right-0 fixed z-10 bg-blue-500 focus:outline-none rounded py-1 px-2 text-white font-semibold shadow-lg hover:bg-blue-400 m-3"
    on:click={() => (showForm = true)}
    transition:fade={{ duration: 250 }}
  >
    Feedback?
  </button>
{/if}
