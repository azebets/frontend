<script>
	export let color 
	
	$: loadingColor = color === "btn" ? "rgba(15, 17, 26, 0.55)" : "#f10fff"
</script>

<div class="sc-gKclnd sc-furwcr keuypW hTWjOR loading">
	<svg viewBox="0 0 84 24" fill={loadingColor}
		><circle cx="18" cy="12" r="6"></circle>
		<circle cx="18" cy="12" r="6"></circle>
		<circle cx="42" cy="12" r="6"></circle>
		<circle cx="66" cy="12" r="6"></circle>
	</svg>
</div>



