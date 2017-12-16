/**
 * Created by dannyyassine
 */

const express       = require('express');
let app             = express();
let bodyParser      = require('body-parser');
let path            = require('path');
let nunjucks        = require('nunjucks');
/**
 * App Configuration
 */
app.use(express.static(path.join(__dirname, '../..', '/website/public')));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

/**
 * Nunjucks for serving html containers
 */
nunjucks.configure(path.join(__dirname, '../..', '/core/views'), {
    autoescape: true,
    express: app
});

module.exports = app;
