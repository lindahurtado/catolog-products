export default {
    server: {
        port: 5173,
        proxy: {
            '/api': 'http://localhost:3000'
        },
        watch: {
            usePolling: true
        },
        host: true
    }
}