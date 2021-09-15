<template>
    <div class="survey-navigation-inner">
        <button class="prev nav-button p-2" @click="prevStep()">prev</button>
        <button class="next nav-button p-2" @click="nextStep()">next</button>
    </div>
</template>

<script>
export default {
    name: 'Navigation',
    emits: ['next-step', 'prev-step'],
    setup(props, { emit }) {
        const nextStep = () => {
            console.log('nextStep')
            emit('next-step')
        }
        const prevStep = () => {
            console.log('prevStep')
            emit('prev-step')
        }

        return {
            nextStep,
            prevStep,
        }
    },
}
</script>

<style scoped>
.survey-navigation-inner {
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
}

.nav-button {
    position: absolute;
    background-color: gray;
}

.nav-button.prev {
    left: 0px;
}

.nav-button.next {
    right: 0px;
}
</style>
