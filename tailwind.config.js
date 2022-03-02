module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: {
                    900: '#1c1cbe',
                },
            },
        },
    },
    plugins: [],
    mode: process.env.NODE_ENV && 'jit',
}
