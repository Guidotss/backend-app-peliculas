import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
    @Prop({
        required: true,
    })
    name:string; 

    @Prop({
        required: true,
        unique: true,
    })
    email: string; 

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        default: [],
        required: false,
    })
    filmsIds?: string[];
}

export const userSchema = SchemaFactory.createForClass(User);
