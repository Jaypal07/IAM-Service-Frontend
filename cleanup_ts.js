
const fs = require('fs');
const path = require('path');

const dirs = ['api/oauth-proxy', 'api/proxy'];

dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            if (file.endsWith('.ts')) {
                const fullPath = path.join(dir, file);
                console.log(`Deleting: ${fullPath}`);
                fs.unlinkSync(fullPath);
            }
        });
    }
});
console.log('Cleanup complete');
