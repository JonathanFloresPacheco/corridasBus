import { CorridaModel,ICorrida } from "../models/Corrida";

class CorridaService{
    async createCorridaS(dateCreationHour: Date, seatLeft: number[], seatRight: number[]): Promise<ICorrida>{
        const stateSeats ={};
        const corrida = new CorridaModel({dateCreationHour,stateSeats,seatLeft,seatRight});
        return await corrida.save();
    }

    async listCorridas(): Promise<ICorrida[]>{
        return await CorridaModel.find();
    }
    
    async idCorrida(id: string): Promise<ICorrida | null>{
        return await CorridaModel.findById(id);
    }

    async reservationSeat(corridaId: string, numberSeat:number, sides:string ):Promise<boolean>{
        let corrida = await CorridaModel.findById(corridaId);
        if(!corrida){
            return false;
        }
        const sideSeats = sides === 'right'  ? 'seatLeft': 'seatRight';
        if(corrida.stateSeats[`${numberSeat}-${sideSeats}`] &&  
        (corrida.stateSeats[`${numberSeat}-${sideSeats}`].busy == true)){
            return false;
        }
        corrida.stateSeats[`${numberSeat}-${sides}`] = {
            busy: true,
            sides
        };
        await corrida.markModified('stateSeats');
        await corrida.save();
        return true;
    }

    async delateReservation(corridaId: string, numberSeat:number, sides:string ):Promise<boolean>{
        let corrida = await CorridaModel.findById(corridaId);
        if(!corrida){
            return false;
        }
        const seatKey = `${numberSeat}-${sides}`;
        if(corrida.stateSeats[seatKey] &&  
        (corrida.stateSeats[seatKey].busy)){
            corrida.stateSeats[seatKey].busy = false;
            await corrida.markModified('stateSeats');
            await corrida.save();
            return true;
        }
        return false;
    }
    
    

}

export default new CorridaService();