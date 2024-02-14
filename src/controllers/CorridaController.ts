import { Request,Response } from 'express';
import CorridaServices from '../services/CorridaServices';

class CorridaController{

    async createCorrida(req:Request,res: Response):Promise<void>{
        try{
            const {dateCreationHour}= req.body;
            const seatsby = 11;
            const seatLeft = Array.from({length:seatsby},(_,index)=>index+1);
            const seatRight = Array.from({length:seatsby},(_,index)=>index+1);
            
            const corrida = await CorridaServices.createCorridaS(new Date(dateCreationHour),seatLeft,seatRight);
            res.status(201).json(corrida);

        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal  Error'});
        }
    }
    
    async listCorrida(req:Request,res: Response):Promise<void>{
        try{
            const corridas = await CorridaServices.listCorridas();
            res.status(200).json(corridas);
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal  Error'});
        }
    }
    
    async idCorrida(req:Request,res: Response):Promise<void>{
        try{
            const {id} = req.params;
            const corrida = await CorridaServices.idCorrida(id);
            res.status(200).json(corrida);
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal  Error'});
        }
    }
    
    async reservationCorrida(req:Request,res: Response):Promise<void>{
        try{
            const {id} = req.params;
            const {numberSeat, seats}= req.body;
            const success = await CorridaServices.reservationSeat(id,parseInt(numberSeat),seats);
            if(!success){
                res.status(400).json({error: 'Is not reservation your seat'})
                return;
            }
            res.status(200).json({message: 'Your seat has been reserve'});
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal  Error'});
        }
    }
    
    async delateCorrida(req:Request,res: Response):Promise<void>{
        try{
            const {id} = req.params;
            const {numberSeat, seats}= req.body;
            const success = await CorridaServices.delateReservation(id,parseInt(numberSeat),seats);
            if(!success){
                res.status(400).json({error: 'Is not  eliminated  the reservation in your seat'})
                return;
            }
            res.status(200).json({message: 'Your reservation has been delete'});
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Internal  Error'});
        }
    }
}

export default new CorridaController();