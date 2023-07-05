import app from "./app";
import './database/databaseMongo';

app.listen(app.get('port'));
console.log('SERVER ON PORT', app.get('port'));