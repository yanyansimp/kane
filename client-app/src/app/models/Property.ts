export interface IProperty {
    id: string | null;
    name: string;
    description: string;
    location: string;
    image?: Image;
    status: string;
    propertyTypeId: string | null;
}

export interface IPropertyFormValues extends Partial<IProperty> {
}

export class PropertyFormValues implements IPropertyFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    location: string = '';
    status: string = '';
    propertyTypeId?: string = undefined;
   
}

export interface Image {
    id: string;
    url: string;
    isMain: boolean;
} 