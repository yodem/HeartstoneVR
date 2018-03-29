const bodyParser = require('body-parser');

module.exports = function (app, passport) {

 
   
    app.use(cors({
        origin: true,
        methods: ['POST'],
        credentials: true,
        maxAge: 3600
    }));

    // support json encoded bodies
    app.use(bodyParser.json()); 

    // support encoded bodies
    app.use(bodyParser.urlencoded({
        extended: true
    })); 

    // set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
  
    // expose package.json to views
    app.use(function (req, res, next) {
      res.locals.pkg = pkg;
      res.locals.env = env;
      next();
    });
  
    // bodyParser should be above methodOverride
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(upload.single('image'));
    app.use(methodOverride(function (req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));
  
    // CookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({ secret: 'secret' }));
    app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: pkg.name,
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));
  
    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());
  
    // connect flash for flash messages - should be declared after sessions
    app.use(flash());
  
    // should be declared after session and flash
    app.use(helpers(pkg.name));
  
    if (env !== 'test') {
      app.use(csrf());
  
      // This could be moved to view-helpers :-)
      app.use(function (req, res, next) {
        res.locals.csrf_token = req.csrfToken();
        next();
      });
    }
  
    if (env === 'development') {
      app.locals.pretty = true;
    }
  };