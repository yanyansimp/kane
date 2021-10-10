export interface IAmenities {
    id: string | null;
    name: string;
    description: string;
    propertyTypeId: string | null;
}

export interface IAmenitiesFormValues extends Partial<IAmenities> {}

export class AmenityFormValues implements IAmenitiesFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    propertyTypeId?: string = undefined;
}