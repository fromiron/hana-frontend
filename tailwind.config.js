module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: '#6C5DD3',
            secondary: '#805dd3',
            white: '#fff',
            black: '#1c1e21',
            accent: '#FF754C',
            mono: {
                100: '#f6f6f6',
                200: '#808191',
                300: '#808191',
            },
            transparent: 'transparent',
        },
        borderWidth: {
            DEFAULT: '1px',
            '0': '0',
            '2': '2px',
            '3': '3px',
            '4': '4px',
            '6': '6px',
            '8': '8px',
            '16': '16px'
        },
        extend: {},
    },
    plugins: [],
    safelist: []
}
