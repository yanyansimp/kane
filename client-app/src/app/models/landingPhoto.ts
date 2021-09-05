
export interface ILandingPhoto {
    id: string;
    name: string;
    description: string;
    url: string;
    isMain: string;
}

export interface ILandingPhotoFormValues extends Partial<ILandingPhoto> {}

export class LandingPhotosFormValues implements ILandingPhotoFormValues {
  id?: string = undefined;
  name: string = '';
  description: string = '';
  url: string = '';
  isMain: string = '';
}

