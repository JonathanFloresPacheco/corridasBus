import {Schema, Document, model} from 'mongoose'

export interface ICorrida extends Document{
    dateCreationHour:Date;
    seatLeft:number[];
    seatRight:number[];
    stateSeats:{[key:string]:{busy:boolean; sides:string}};
}

const CorridaSchema = new Schema<ICorrida>(
    {
        dateCreationHour: { type:Date, required: true},
        seatLeft: { type:[Number], required: true},
        seatRight: { type:[Number], required: true},
        stateSeats: { type: Schema.Types.Mixed,default:{}},
    },
    {
        timestamps:true,
        toJSON:{
            transform:(doc,ret)=>{
                ret.id= ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

export const CorridaModel = model<ICorrida>('Corrida', CorridaSchema);