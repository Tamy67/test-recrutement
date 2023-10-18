const config = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.js$': 'babel-jest',
    },

    setupFiles: ['./test/setupTests.js'],

};

export default config;