const { config } = require('dotenv');
config({ path: 'C:\\Users\\bnutt\\OneDrive\\Desktop\\proxy\\.env' });
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('./src/models/User');
require('./src/models/Profile');
const { set, connect, connection } = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');
const {
	refreshVideoCache,
	scheduleVideoCache,
} = require('./src/util/videoCache');
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const assetRoutes = require('./src/routes/assetRoutes');
const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const videoRoutes = require('./src/routes/videoRoutes');

const app = express();

set('strictQuery', false);
connect(process.env.MONGODB_URL);
connection.on('connected', async () => {
	console.log('Connected to DB.');

	try {
		await refreshVideoCache(); // warm cache immediately on boot
		scheduleVideoCache(); // then schedule daily 2am refreshes
	} catch (err) {
		console.log('Failed to initialize video cache:', err.message);
	}
});
connection.on('error', (err) => {
	console.log('Error connecting to DB.', err);
});

// Api Routes go here
app.use(cors(), express.json(), assetRoutes);
app.use(cors(), express.json(), userRoutes);
app.use(cors(), express.json(), profileRoutes);
app.use(cors(), express.json(), videoRoutes);

// Proxy to JellyFin
const wsProxy = createProxyMiddleware({
	target: 'http://localhost:8096',
	changeOrigin: true,
	ws: true,
	on: {
		proxyReq: (proxyReq, req) => {
			proxyReq.setHeader('X-Forwarded-Proto', 'https');
			proxyReq.setHeader('X-Forwarded-Host', 'server.nutzflix.net');
			proxyReq.setHeader('X-Real-IP', req.socket.remoteAddress || '');
		},
	},
});

app.use('/', wsProxy);

const server = http.createServer(app);
server.on('upgrade', wsProxy.upgrade);

const port = 3005;

server.listen(port, '0.0.0.0', () => {
	console.log(`Listening on port ${port}`);
});
