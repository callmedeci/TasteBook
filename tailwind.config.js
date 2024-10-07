/** @type {import('tailwindcss').Config} */
export default {
    content: ['**/**/*.html', './src/js/**/*.js'],
    theme: {
        extend: {
            fontFamily: {
                'open-sans-light': 'open-sans-light',
                'open-sans-medium': 'open-sans-medium',
                'open-sans-regular': 'open-sans-regular',
                'open-sans-semibold': 'open-sans-semibold',
                lobster: 'lobster',
                dancing: 'dancing',
                julius: 'julius',
            },
            fill: {
                'dark-blue': '#0a66c2',
                'light-blue': '#209cd8',
            },
        },
    },
    plugins: [],
};
