<script>
    export let respose
$: showData = false
$: history =  [...respose].reverse()


function formatDateTime(rs) {
  const date = new Date(rs);

  // Array of month names
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Extract date components
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  // Format hours and minutes
  hours = hours.toString().padStart(2, '0');  // Ensure 2-digit format
  minutes = minutes.toString().padStart(2, '0');  // Ensure 2-digit format
  
  // Return formatted date and time string
  return `${month} ${day} ${year}, ${hours}:${minutes}`;
}

</script>

<div class="css-t60dms">
    <div class="css-1sg2lsz">
        <h3 class="css-qgoclk" style="margin: 0px auto 0px 0px;">Login History</h3>
        <button on:click={()=> showData =! showData} class="{showData ? "css-1umvd96": "css-vmbe4r"}">{showData ? "Hide" : "Show"}</button>
    </div>
    {#if showData}
    <div style="margin-top: 24px;">
        <div class="css-1mwdm11">
            <table class="css-wcq858">
                <thead class="css-oe1okv">
                    <tr>
                        <th class="css-1d17pqc">
                            <div>Date</div>
                        </th>
                        <th class="css-1d17pqc">
                            <div>Login Method</div>
                        </th>
                        <th class="css-1d17pqc">
                            <div>Country</div>
                        </th>
                        <th class="css-1d17pqc">
                            <div>IP</div>
                        </th>
                    </tr>
                </thead>
                <tbody class="css-13107in">
                    {#each history.slice(0, 12) as his}
                        <tr class="css-1k5q1yl">
                            <td class="css-l6q4iv">
                                <div>{formatDateTime(his?.Login_time)}</div>
                            </td>
                            <td class="css-l6q4iv">
                                <div>{his.type}</div>
                            </td>
                            <td class="css-l6q4iv">
                                <div>{his?.country}</div>
                            </td>
                            <td class="css-l6q4iv">
                                <div>{his.ip}</div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    {/if}

</div>


<style>
.css-1umvd96 {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    white-space: nowrap;
    transition: all 0.1s ease 0s;
    appearance: none;
    border: none;
    letter-spacing: 0.5px;
    cursor: pointer;
    user-select: none;
    height: 30px;
    padding: 0px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-family: "Geogrotesque Wide", sans-serif;
    font-weight: 500;
    font-style: normal;
    text-transform: none;
    color: rgb(177, 182, 198);
    background: rgba(203, 215, 255, 0.075);
}
.css-1mwdm11 {
    position: relative;
    overflow: auto hidden;
}
.css-wcq858 {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 4px;
}
.css-oe1okv {
    height: 28px;
    background: rgba(203, 215, 255, 0.03);
}
.css-1d17pqc:not(:last-of-type) {
    padding-right: 16px;
}
.css-1d17pqc:first-of-type {
    padding-left: 24px;
    border-radius: 4px 0px 0px 4px;
}
.css-1d17pqc {
    text-transform: uppercase;
    color: rgb(103, 109, 124);
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    font-family: "Geogrotesque Wide", sans-serif;
    font-weight: 700;
    font-style: normal;
}
.css-1d17pqc:not(:last-of-type) {
    padding-right: 16px;
}
.css-13107in > :nth-of-type(1) {
    animation-delay: 0s;
}
.css-1k5q1yl {
    height: 40px;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    background: rgba(203, 215, 255, 0.03);
}
.css-13107in > * {
    animation: 0.2s ease-out 0s 1 normal both running animation-1xy0ntl;
}
.css-l6q4iv:not(:last-of-type) {
    padding-right: 16px;
}
.css-l6q4iv:first-of-type {
    padding-left: 24px;
    border-radius: 4px 0px 0px 4px;
}
.css-l6q4iv > div {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    min-height: 28px;
    font-variant-numeric: tabular-nums;
}
</style>