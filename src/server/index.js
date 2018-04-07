/**
 * Created by dannyyassine
 */

const app = require('./app');

require('./config/routes')(app);
require('./config/env')(app);

const port = process.env.PORT || 3003;
const server = app.listen(port, function () {
    console.log("*\n*");
    console.log("/****************************************/");
    console.log('server listening on port ' + server.address().port);
    console.log("/****************************************/");
    console.log("*\n*");
});