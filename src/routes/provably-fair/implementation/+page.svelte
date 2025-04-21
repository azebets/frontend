<script>

  let serverSeed = "serverSeed"
  let clientSeed = "clientSeed"
  let currentRound = "currentRound"
  let nonce = "nonce"
  let cursor = "cursor"

   let jus = `
// Random number generation based on following inputs: 
// serverSeed, clientSeed, nonce and cursor
function byteGenerator({ serverSeed, clientSeed, nonce, cursor }) {
  // Setup curser variables
  let currentRound = Math.floor(cursor / 32);
  let currentRoundCursor = cursor;
  currentRoundCursor -= currentRound * 32;

  // Generate outputs until cursor requirement fullfilled
  while (true) {
    // HMAC function used to output provided inputs into bytes
    const hmac = createHmac('sha256', serverSeed);
    hmac.update('${clientSeed}:${nonce}:${currentRound}');
    const buffer = hmac.digest();

    // Update curser for next iteration of loop
    while (currentRoundCursor && 32) {
      Number(buffer[currentRoundCursor]);
      currentRoundCursor += 1;
    }
    currentRoundCursor = 0;
    currentRound += 1;
  }
}
      `
</script>

<div class="sc-hcupDf fkQdDC">
   <div class="item">
      <h2>Random Number Generation</h2>
      <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">For each verifiable bet, a client
        seed, a server seed, a nonce and a cursor are used as the input parameters for the
        <a class="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white betterhover:hover:bg-transparent betterhover:hover:text-white focus-visible:outline-none text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover>svg]:text-white" href="https://en.wikipedia.org/wiki/Random_number_generation" data-sveltekit-reload="off" data-sveltekit-preload-data="off" data-sveltekit-noscroll="" target="_blank" rel="external noreferrer noopener">
          <span>random number generation</span> 
          <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon css-oluyn3" style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.823 53.176h42.353V39.941h7.059v20.294H3.765V3.765h20.293v7.058H10.823v42.353Zm28.236-42.353V3.765h21.176V24.94h-7.059v-9.123L27.88 41.115l-4.994-4.995 25.297-25.296H39.06Z"></path></svg></a> function. This function utilises the cryptographic hash function
        <a class="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white betterhover:hover:bg-transparent betterhover:hover:text-white focus-visible:outline-none text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover>svg]:text-white" href="https://en.wikipedia.org/wiki/HMAC" data-sveltekit-reload="off" data-sveltekit-preload-data="off" data-sveltekit-noscroll="" target="_blank" rel="external noreferrer noopener"><span>HMAC_SHA256</span> 
          <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon css-oluyn3" style=""> <title></title> 
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.823 53.176h42.353V39.941h7.059v20.294H3.765V3.765h20.293v7.058H10.823v42.353Zm28.236-42.353V3.765h21.176V24.94h-7.059v-9.123L27.88 41.115l-4.994-4.995 25.297-25.296H39.06Z"></path>
          </svg>
        </a> to generate bytes which are then used as the foundation for how we generate
        provably fair random outcomes on our platform.
      </p>

      <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">
        <pre class="pre svelte-amanii">      
        <code class="code svelte-amanii">
          {jus}
        </code>
      </pre>

    
      <h2>Floats to Game Events</h2>
      <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">Where the process of generating random outputs is universal for all our games, it's at this
        point in the game outcome generation where a unique procedure is implemented to determine the
        translation from floats to game events.</p>
        <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">The randomly float generated is multiplied by the possible remaining outcomes of the particular
          game being played. For example: In a game that uses a 52 card deck, this would simply be done by
          multiplying the float by 52. The result of this equation is then translated into a corresponding
          game event. For games where multiple game events are required, this process continues through
          each corresponding 4 bytes in the result chain that was generated using the described
          byteGenerator function.</p>
    
      <h2>Shuffle of Game Events</h2>
      <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">For games such as Keno, Mines and Video Poker, where outcomes cannot be duplicated, we then
        utilise the
        <a class="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white betterhover:hover:bg-transparent betterhover:hover:text-white focus-visible:outline-none text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover>svg]:text-white" href="https://en.wikipedia.org/wiki/Fisher–Yates_shuffle" data-sveltekit-reload="off" data-sveltekit-preload-data="off" data-sveltekit-noscroll="" target="_blank" rel="external noreferrer noopener"><span>Fisher-Yates shuffle</span> <svg fill="currentColor"  viewBox="0 0 64 64" class="svg-icon css-oluyn3" style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.823 53.176h42.353V39.941h7.059v20.294H3.765V3.765h20.293v7.058H10.823v42.353Zm28.236-42.353V3.765h21.176V24.94h-7.059v-9.123L27.88 41.115l-4.994-4.995 25.297-25.296H39.06Z"></path></svg></a> algorithm. This procedure influences the conversion process from floats to game
        events because each time a game event is translated, the amount of possible remaining game event
        possibilities has been reduced for any remaining steps in the result chain.
      </p>
      <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">As an example, in video poker, there is at first 52 cards available in the complete deck, and
        therefore the first game event is translated by multiplying the float by 52. Once this card has
        been dealt, there is only 51 remaining cards in the deck, and therefore the second card
        translation is done by multiplying the second float generated by 51. This continues in the same
        fashion until all the game events required have been generated.</p>
        <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">With regards to Mines and Keno, this is simply a matter of implementing the same process as
          explained with video poker but changing that to tiles or locations on the board or grid,
          ensuring that each game event generated, hasn’t already been done so beforehand in the chain of
          results.</p>
    </div>
</div>

<style>



</style>