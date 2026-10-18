// Offline cache for the PharmaSyn paper search. build_pwa.ps1 fills in VERSION and FILES.
const CACHE = 'pharmasyn-20261019-0005';
const FILES = ["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","icons/apple-touch-icon.png","toc/1.jpg","toc/2.jpg","toc/3.jpg","toc/4.jpg","toc/5.jpg","toc/6.jpg","toc/7.jpg","toc/8.jpg","toc/9.jpg","toc/10.jpg","toc/11.jpg","toc/12.jpg","toc/13.jpg","toc/14.jpg","toc/15.jpg","toc/16.jpg","toc/17.jpg","toc/18.jpg","toc/19.jpg","toc/20.jpg","toc/21.jpg","toc/22.jpg","toc/23.jpg","toc/24.jpg","toc/25.jpg","toc/26.jpg","toc/27.jpg","toc/28.jpg","toc/29.jpg","toc/30.jpg","toc/31.gif","toc/32.jpg","toc/33.jpg","toc/34.jpg","toc/35.jpg","toc/36.jpg","toc/37.jpg","toc/38.jpg","toc/39.jpg","toc/40.jpg","toc/41.jpg","toc/42.jpg","toc/43.gif","toc/44.jpg","toc/45.jpg","toc/46.jpg","toc/47.jpg","toc/48.jpg","toc/49.jpg","toc/50.jpg","toc/51.jpg","toc/52.jpg","toc/53.jpg","toc/54.jpg","toc/55.jpg","toc/56.jpg","toc/57.jpg","toc/58.jpg","toc/59.jpg","toc/60.jpg","toc/61.jpg","toc/62.jpg","toc/63.jpg","toc/64.jpg","toc/65.jpg","toc/66.jpg","toc/67.jpg","toc/68.png","toc/69.jpg","toc/70.jpg","toc/71.jpg","toc/72.jpg","toc/73.png","toc/74.jpg","toc/75.jpg","toc/76.jpg","toc/77.jpg","toc/78.jpg","toc/79.jpg","toc/80.jpg","toc/81.jpg","toc/82.jpg","toc/83.jpg","toc/84.jpg","toc/85.jpg","toc/86.png","toc/87.jpg","toc/88.jpg","toc/89.jpg","toc/90.png","toc/91.jpg","toc/92.jpg","toc/93.jpg","toc/94.jpg","toc/95.jpg","toc/96.jpg","toc/97.jpg","toc/98.jpg","toc/99.png","toc/100.png","toc/101.jpg","toc/102.jpg","toc/103.png","toc/104.png","toc/105.jpg","toc/106.jpg","toc/107.png","toc/108.png","toc/109.jpg","toc/110.jpg","toc/111.png","toc/112.png","toc/113.jpg","toc/114.jpg","toc/115.jpg","toc/116.jpg","toc/117.jpg","toc/118.jpg","toc/119.jpg","toc/120.jpg","toc/121.png","toc/122.png","toc/123.jpg","toc/124.jpg","toc/125.png","toc/126.png","toc/127.jpg","toc/128.png","toc/129.jpg","toc/130.jpg","toc/131.jpg","toc/132.jpg","toc/133.jpg","toc/134.jpg","toc/135.jpg","toc/136.jpg","toc/137.jpg","toc/138.jpg","toc/139.jpg","toc/140.jpg","toc/141.jpg","toc/142.jpg","toc/143.jpg","toc/144.jpg","toc/145.jpg","toc/146.jpg","toc/147.gif","toc/148.jpg","toc/149.jpg","toc/150.jpg","toc/151.png","toc/152.gif","toc/153.jpg","toc/154.jpg","toc/155.jpg","toc/156.jpg","toc/157.jpg","toc/158.jpg","toc/159.jpg","toc/160.jpg","toc/161.jpg","toc/162.jpg","toc/163.jpg","toc/164.jpg","toc/165.jpg","toc/166.jpg","toc/167.jpg","toc/168.jpg","toc/169.jpg","toc/170.jpg","toc/171.jpg","toc/172.jpg","toc/173.jpg","toc/174.jpg","toc/175.png","toc/176.png","toc/177.png","toc/178.png","toc/179.png","toc/180.png","toc/181.png","toc/182.png","toc/183.png","toc/184.png","toc/185.png","toc/186.png","toc/187.png","toc/188.png","toc/189.png","toc/190.png","toc/191.png","toc/192.png","toc/193.png","toc/194.png","toc/195.png","toc/196.png","toc/197.png","toc/198.png","toc/199.png","toc/200.png","toc/201.png","toc/202.png","toc/203.png","toc/204.png","toc/205.jpg","toc/206.jpg","toc/207.jpg","toc/208.png","toc/209.png","toc/210.png","toc/211.png","toc/212.png","toc/213.jpg","toc/214.jpg","toc/215.jpg","toc/216.jpg","toc/217.png","toc/218.png","toc/219.png","toc/220.png","toc/221.png","toc/222.jpg","toc/223.jpg","toc/224.jpg","toc/225.jpg","toc/226.jpg","toc/227.jpg","toc/228.jpg","toc/229.jpg","toc/230.jpg"];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first, so the app opens with no connection. External links (paper pages) still need the network.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(hit => hit || fetch(event.request))
  );
});
