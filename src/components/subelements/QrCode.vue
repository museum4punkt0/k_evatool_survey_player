<template>
    <qrcode-vue :value="url" :size="size" />
</template>
<script>
import QrcodeVue from 'qrcode.vue'

export default {
    name: 'QrCode',
    components: { QrcodeVue },
    props: {
        url: { type: String, required: true },
        size: { type: Number, default: 100 },
    },
}
</script>
