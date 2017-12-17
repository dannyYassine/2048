/**
 * Created by dannyyassine
 */

const path = require('path');

module.exports = app => {


    //TODO: feed results of unit tests
    app.get('/tests', (request, response) => {

    });

    /**
     * Front-end application
     */
    app.get('/*', (request, response) => {
        response.render('index.html');
    });

    app.use((request, response, err) => {
        response.render('404.html');
    });


};