import express from 'express';
console.log('express version:', express.version || 'unknown');
const app = express();
const srv = app.listen(3001, () => {
    console.log('Test server up');
});
console.log('Calling listen');
