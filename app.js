/* app.js */

var express = require('express')
  , handlebars = require('express3-handlebars')
  , app = express();

app.use(express.cookieParser());
app.use(express.session({secret: "abcde"}));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.render('home', {
    title: "Pingly"
  });
  req.session.lastPage ='/';
  console.log('last page was:', req.session.lastPage);
});


app.get('*', function (req, res) {
  console.log('user requested', req.params[0]);
  res.redirect(req.session.lastPage || '/')
});


app.listen();
console.log('Pingly is running on port:', app.get('port'));
