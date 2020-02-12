import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

const validateHeader = async (req, res) => {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader.split(' ');

    try {
        return await promisify(jwt.verify)(token, authConfig.secret);
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};

const authMiddleware = async (req, res, next) => {
    const { id } = await validateHeader(req, res);

    req.userId = id;

    return next();
};

const providerMiddleware = async (req, res, next) => {
    const { provider } = await validateHeader(req, res);

    return provider
        ? next()
        : res.status(401).json({ error: 'Only for admins' });
};

export default { authMiddleware, providerMiddleware };
