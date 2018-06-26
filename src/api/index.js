import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});
	
	// expose /status API
	api.get('/status', (req, res) => {
		const ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
		res.json({ 
			ip,
			'x-forwarded-for': req.headers['x-forwarded-for'] || null , 
			'req.connection.remoteAddress': req.connection.remoteAddress,
			'req.socket.remoteAddress': req.socket.remoteAddress,
			'req.connection.socket.remoteAddress': (req.connection.socket ? req.connection.socket.remoteAddress : null),
		});
	});

	return api;
}
