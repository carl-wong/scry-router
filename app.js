const express = require('express');
const proxy = require('http-proxy-middleware');

const { routes } = require('./config.json');

const app = express();

for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            }
        })
    );
}

app.listen(1337, () => {
    console.log('scry-router listening on port 80');
});
