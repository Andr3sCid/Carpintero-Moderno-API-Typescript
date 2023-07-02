import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routers/auth.routes';
import normalRoutes from './routers/normal.routes';
import passport from 'passport';
import passportMiddleware from './middleware/passportMiddleWare';


const app = express();

//configurations
app.set('port', process.env.PORT || 8080);

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.get('/',(req, res)=>{
    res.send('Stas dentro');
});

app.use(authRoutes);
app.use(normalRoutes);

export default app;