const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoDatabase = require('./util/database').mongoConnect

//Routes
const profileRoutes = require("./routes/profile_routes");
const registerRoutes = require("./routes/register_routes");
const loginRoutes = require("./routes/login_routes");

//Body parser
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Load css
app.use(express.static(__dirname + '/public'));

//Template engine
app.set('view engine', 'pug');
app.set('views', 'views')

// app.use('/', (req, res) => {
//     res.send("Heyyy");
// });
app.use(registerRoutes);
app.use(loginRoutes);
app.use(profileRoutes);

// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// })

//Server
// app.listen(3000);


mongoDatabase(() => {
    app.listen(3000);
});