<template>
    <div :class="getColor" class="px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">{{ title }}</strong>
        <span class="block">
            {{ description }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'CustomAlert',
    props: {
        color: {
            type: String,
            default: 'red',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
    },
    computed: {
        getColor() {
            return (
                'bg-' +
                this.color +
                '-100 border border-' +
                this.color +
                '-400 text-' +
                this.color +
                '-700'
            )
        },
    },
}
</script>

<style scoped></style>
