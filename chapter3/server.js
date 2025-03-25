// import express from 'express';

// const app = express();

// // Set static folder
// app.use(express.static('public'));

// // Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({ extended: true }));

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());

// let currentPrice = 60;

// app.get('/get-price', (req, res) => {
//     currentPrice = currentPrice + Math.random() * 2 - 1;
//     res.send('$' + currentPrice.toFixed(1))
// });

// // Start the server
// app.listen(3000, () => {
//     console.log('Server listening on port 3000');
// });


// import express from 'express';
// // import fetch from 'node-fetch';

// const app = express();

// // Set static folder
// app.use(express.static('public'));

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const getBitcoinPrice = async () => {
//     try {
//         const response = await fetch(
//             'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
//         );
//         const data = await response.json();
//         return data.bitcoin.usd;
//     } catch (error) {
//         console.error('Error fetching Bitcoin price:', error);
//         return null;
//     }
// };

// app.get('/get-price', async (req, res) => {
//     const price = await getBitcoinPrice();
//     res.send(price ? `$${price.toFixed(1)}` : 'Error fetching price');
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


import express from 'express';

const app = express();
app.use(express.static('public'));

let currentPrice = 60;
let lastPrice = currentPrice;
let priceHistory = [currentPrice];

app.get('/get-price', (req, res) => {
    const delta = Math.random() * 2 - 1;
    lastPrice = currentPrice;
    currentPrice = currentPrice + delta;

    priceHistory.push(currentPrice);
    if (priceHistory.length > 30) {
        priceHistory.shift();
    }

    const direction = currentPrice > lastPrice ? 'up' : 'down';
    const arrow = direction === 'up' ? '↑' : '↓';
    const className = direction === 'up' ? 'price-change-up' : 'price-change-down';

    // Mocking global stats
    const marketCap = currentPrice * 180000000; // Example calculation
    const volume = currentPrice * 5000000000; // Example calculation

    res.send(`
        <h2 id="price" class="${className}" 
            hx-get="/get-price" 
            hx-trigger="every 5s" 
            hx-swap="outerHTML">
            ${arrow} $${currentPrice.toFixed(2)}
        </h2>
    
        <script>
            const priceHistory = ${JSON.stringify(priceHistory)};
            const chart = window.chart;
            
            // Update the chart with new data
            chart.data.datasets[0].data = priceHistory;
            chart.update();
            
            // Update market statistics
            document.getElementById('marketCap').textContent = '$${marketCap.toFixed(2)} B';
            document.getElementById('volume').textContent = '$${volume.toFixed(2)} B';
        </script>
    `);
    });

app.listen(3000, () => {
    console.log('🚀 Server listening on http://localhost:3000');
});
