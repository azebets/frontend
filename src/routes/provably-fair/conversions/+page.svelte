<script>
let ress = `
// Convert the hash output from the rng byteGenerator to floats
function generateFloats ({ serverSeed, clientSeed, nonce, cursor, count }) {
  // Random number generator function
  const rng = byteGenerator({ serverSeed, clientSeed, nonce, cursor });
  // Declare bytes as empty array
  const bytes = [];

  // Populate bytes array with sets of 4 from RNG output
  while (bytes.length < count * 4) {
    bytes.push(rng.next().value);
  }

  // Return bytes as floats using lodash reduce function
  return _.chunk(bytes, 4).map(bytesChunk =>
    bytesChunk.reduce((result, value, i) => {
      const divider = 256 ** (i + 1);
      const partialResult = value / divider;
      return result + partialResult;
    }, 0)
  );
};
`
</script>

<div class="sc-hcupDf fkQdDC">
    <div class="item">
        <h2>Bytes to Floats</h2>
        <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">The output of the Random Number Generator (byteGenerator) function is a hexadecimal 32-byte
            hash. As explained under the cursor implementation, we use 4 bytes of data to generate a single
            game result. Each set of 4 bytes are used to generate floats between 0 and 1 (4 bytes are used
            instead of one to ensure a higher level of precision when generating the float.) It is with
            these generated floats that we derive the formal output of the provable fair algorithm before it
            is translated into game events.</p>
            <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua">
                <pre class="pre svelte-amanii">
                    <code class="code svelte-schitm">
                        {ress}
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
                    <a class="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white betterhover:hover:bg-transparent betterhover:hover:text-white focus-visible:outline-none text-sm leading-none [&amp;_svg]:text-grey-200 [&amp;:hover>svg]:text-white" href="https://en.wikipedia.org/wiki/Fisher–Yates_shuffle" data-sveltekit-reload="off" data-sveltekit-preload-data="off" data-sveltekit-noscroll="" target="_blank" rel="external noreferrer noopener"><span>Fisher-Yates shuffle</span> <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon css-oluyn3" style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.823 53.176h42.353V39.941h7.059v20.294H3.765V3.765h20.293v7.058H10.823v42.353Zm28.236-42.353V3.765h21.176V24.94h-7.059v-9.123L27.88 41.115l-4.994-4.995 25.297-25.296H39.06Z"></path></svg></a> algorithm. This procedure influences the conversion process from floats to game
                    events because each time a game event is translated, the amount of possible remaining game event
                    possibilities has been reduced for any remaining steps in the result chain.</p>
                    <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">As an example, in video poker, there is at first 52 cards available in the complete deck, and
                        therefore the first game event is translated by multiplying the float by 52. Once this card has
                        been dealt, there is only 51 remaining cards in the deck, and therefore the second card
                        translation is done by multiplying the second float generated by 51. This continues in the same
                        fashion until all the game events required have been generated.</p>

                        <p class="weight-normal line-height-150pct align-left size-base text-size-base responsive-type-scale variant-subtle with-icon-space svelte-17v69ua" style="">As an example, in video poker, there is at first 52 cards available in the complete deck, and
                            therefore the first game event is translated by multiplying the float by 52. Once this card has
                            been dealt, there is only 51 remaining cards in the deck, and therefore the second card
                            translation is done by multiplying the second float generated by 51. This continues in the same
                            fashion until all the game events required have been generated.</p>

                            
    </div>
</div>

<style>
  .code.svelte-schitm {
        font-family: monospace, monospace;
        font-size: 1em;
    }
</style>
