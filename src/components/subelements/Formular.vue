<template>
    <ContentSlider v-if="1 < 0"></ContentSlider>

    <div class="mt-5 md:mt-0 md:col-span-2 absolute">
        <form action="#" method="POST">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-12 sm:col-span-12">
                            Verrate uns noch ein paar Dinge über Dich!
                        </div>
                        <div class="col-span-6 sm:col-span-6">
                            <label
                                for="first-name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                First name
                            </label>
                            <input
                                id="first-name"
                                type="text"
                                name="first-name"
                                autocomplete="given-name"
                                class="
                                    mt-1
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    border-gray-800
                                    rounded-md
                                "
                            />
                        </div>

                        <div class="col-span-12 sm:col-span-12">
                            <label
                                for="last-name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Last name
                            </label>
                            <input
                                id="last-name"
                                type="text"
                                name="last-name"
                                autocomplete="family-name"
                                class="
                                    mt-1
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    border-1
                                    2xl:border-gray-80000
                                    rounded-md
                                "
                            />
                        </div>

                        <div class="col-span-6 sm:col-span-6">
                            <label
                                for="email-address"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                id="email-address"
                                type="text"
                                name="email-address"
                                autocomplete="email"
                                class="
                                    mt-1
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    border-gray-300
                                    rounded-md
                                "
                            />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Country / Region
                            </label>
                            <select
                                id="country"
                                name="country"
                                autocomplete="country"
                                class="
                                    mt-1
                                    block
                                    w-full
                                    py-2
                                    px-3
                                    border border-gray-300
                                    bg-white
                                    rounded-md
                                    shadow-sm
                                    focus:outline-none
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    sm:text-sm
                                "
                            >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </select>
                        </div>

                        <div class="col-span-6">
                            <label
                                for="street-address"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Street address
                            </label>
                            <input
                                id="street-address"
                                type="text"
                                name="street-address"
                                autocomplete="street-address"
                                class="
                                    mt-1
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    border-gray-300
                                    rounded-md
                                "
                            />
                        </div>

                        <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                            <label
                                for="city"
                                class="block text-sm font-medium text-gray-700"
                            >
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                class="
                                    mt-1
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    border-gray-300
                                    rounded-md
                                "
                            />
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                                for="state"
                                class="block text-sm font-medium text-gray-700"
                            >
                                State / Province
                            </label>
                            <input
                                id="state"
                                type="text"
                                name="state"
                                class="
                                    mt-1
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    border-gray-300
                                    rounded-md
                                "
                            />
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label
                                for="postal-code"
                                class="block text-sm font-medium text-gray-700"
                            >
                                ZIP / Postal
                            </label>
                            <input
                                id="postal-code"
                                type="text"
                                name="postal-code"
                                autocomplete="postal-code"
                                class="
                                    mt-1
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm
                                    sm:text-sm
                                    border-gray-300
                                    rounded-md
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        class="
                            inline-flex
                            justify-center
                            py-2
                            px-4
                            border border-transparent
                            shadow-sm
                            text-sm
                            font-medium
                            rounded-md
                            text-white
                            bg-indigo-600
                            hover:bg-indigo-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-offset-2
                            focus:ring-indigo-500
                        "
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import ContentSlider from './Contentslider.vue'

export default {
    name: 'Formular',
    components: { ContentSlider },
}
</script>

<style scoped></style>
