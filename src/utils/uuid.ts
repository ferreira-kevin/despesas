import crypto from 'crypto';

export default () => crypto.randomUUID({disableEntropyCache : true});