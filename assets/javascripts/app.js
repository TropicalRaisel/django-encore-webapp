import '../styles/app.scss'
import 'jquery'
import 'bootstrap' // load bootstrap after jquery to register it as a plugin

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration)
      })
      .catch((registrationError) => {
        console.error('Service Worker registration failed: ', registrationError)
      })
  })
}
