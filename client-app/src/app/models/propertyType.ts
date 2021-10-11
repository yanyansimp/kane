import { IProperty } from "./Property";
import { IAmenities } from "./amenities";

export interface IPropertyType {
    id: string;
    name: string;
    description: string;
    location: string;
    image?: Image;
    properties?: IProperty[] | null;
    amenities?: IAmenities[] | null;
}

export interface IPropertyTypeFormValues extends Partial<IPropertyType> {}

export class PropertyTypeFormValues implements IPropertyTypeFormValues {
  id?: string = undefined;
  name: string = '';
  description: string = '';
  location: string = '';
  properties?: IProperty[] = undefined;
  amenities?: IAmenities[] = undefined;
}

export interface Image {
    id: string;
    url: string;
    isMain: boolean;
} 