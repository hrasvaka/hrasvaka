import App from './App.svelte'
import './assets/styles/global.sass'

// create an instance of the app we imported above
const app = new App({
    target: document.body,
    props: {
        app: require('../../package.json'),
    },
})

window.app = app

export default app
