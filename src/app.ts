import express,{Router} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import CorridaController from './controllers/CorridaController';

const PORT = 3000;
const router = Router();
const app = express();

console.log('CorridasBus','mongodb://localhost:27017/corridasBus');
mongoose.connect('mongodb://localhost:27017/corridasBus');

app.use(bodyParser.json());


router.post('/create-corrida',CorridaController.createCorrida);

router.get('/list-corrida',CorridaController.listCorrida);

router.get('/list-corrida/:id',CorridaController.idCorrida);

router.post('/reservationCorrida/:id',CorridaController.reservationCorrida);

router.delete('/delateCorrida/:id',CorridaController.delateCorrida);


app.use(router);

app.listen(PORT, ()=>{
    console.log(
        `Server is running at http://localhost:${PORT}`
    );
});

export default router;