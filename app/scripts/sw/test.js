'use strict';
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    
    var serviceWorker;
    if (registration.installing) {
      serviceWorker = registration.installing;
    } else if (registration.waiting) {
      serviceWorker = registration.waiting;
    } else if (registration.active) {
      serviceWorker = registration.active;
    }

    if (serviceWorker) {
      console.log('ServiceWorker phase:', serviceWorker.state);

      serviceWorker.addEventListener('statechange', function (e) {
        console.log('ServiceWorker phase:', e.target.state);
      });
    }
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}