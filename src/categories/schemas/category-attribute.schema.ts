import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryAttributeDocument = CategoryAttribute & Document;

@Schema({ timestamps: true })
export class CategoryAttribute {

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ required: true })
  fieldName: string;  // brand, fuel_type, year

  @Prop({ type: [String], required: true })
  options: string[];
}

export const CategoryAttributeSchema =
  SchemaFactory.createForClass(CategoryAttribute);
