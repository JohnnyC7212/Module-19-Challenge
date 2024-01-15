const { registerRoute } = require('workbox-routing');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');

// Register a route for asset caching
registerRoute(
  // Define a custom function to match asset requests
  ({ request }) => {
    // Customize this condition based on your asset URL patterns
    return request.destination === 'style' || request.destination === 'script';
  },
  // Use the CacheFirst strategy for assets
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      // CacheableResponsePlugin to handle cacheable responses
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // ExpirationPlugin to control the cache duration
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache assets for 7 days
      }),
    ],
  })
);
