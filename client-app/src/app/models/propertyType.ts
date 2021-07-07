export interface IPropertyType {
    id: string;
    name: string;
    description: string;
    location: string;
    image?: Image;
}

export interface IPropertyTypeFormValues extends Partial<IPropertyType> {

}

export class PropertyTypeFormValues implements IPropertyTypeFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    location: string = '';
}

export interface Image {
    id: string;
    url: string;
    isMain: boolean;
} 