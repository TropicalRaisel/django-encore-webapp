import '../styles/app.scss';
import 'bootstrap';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((registrationError) => {
        console.error('Service Worker registration failed: ', registrationError);
      });
  });
}

console.log('Hello from app!');
