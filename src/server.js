//Separando app para testes no futuro
import app from './app';
import cors from 'cors';

app.use(cors());
app.listen(3000);
