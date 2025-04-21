<script>
export let size
let image = new URL('../lib/images/Empty list image.png', import.meta.url).href


</script>

<div class="empty-container">
    <img src="{image}" alt="" style="width: {size}px">
    <p>Oops! There is no data yet!</p>
</div>

<style>
.empty-container{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.empty-container p{
    margin-top: 10px;
}
.empty-container img {
    width: 100px;
}

</style>