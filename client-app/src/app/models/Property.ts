export interface IProperty {
    id: string;
    name: string;
    description: string;
    location: string;
    image?: Image;
    status: string;
   
}

export interface IPropertyFormValues extends Partial<IProperty> {

}

export class PropertyFormValues implements IPropertyFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    location: string = '';
    status: string = '';
   
}

export interface Image {
    id: string;
    url: string;
    isMain: boolean;
} 