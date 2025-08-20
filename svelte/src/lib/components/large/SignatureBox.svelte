<script>
    import SignaturePad from "signature_pad";
    import { onMount } from "svelte";
    let { id, value = $bindable() } = $props()

    let signaturePad = $state()
    onMount(()=> {
        let canvas = document.getElementById(id)
        signaturePad = new SignaturePad(canvas, {backgroundColor: "rgba(35, 35, 35", penColor: "rgba(255, 255, 255)"});
        signaturePad.addEventListener("endStroke", () => {
            value = signaturePad.toDataURL("image/svg+xml", { includeBackgroundColor: true });
        })
    })
</script>

<canvas {id} class="w-full"></canvas>