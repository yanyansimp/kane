import { action, computed, observable, runInAction, reaction } from 'mobx';
import agent from '../api/agent';
import { IPropertyType } from '../models/propertyType';
import { IProperty } from '../models/Property';
import { RootStore } from './rootStore';
import { history } from '../..';
import { toast } from 'react-toastify';
const LIMIT = 3;

export default class PropertyTypeStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    // reaction(
    //   () => this.predicate.keys(),
    //   () => {
    //     this.page = 0;
    //     this.propertyRegistry.clear();
    //     this.loadPropertyTypes();
    //   }
    // );
  }

  @observable propertyRegistry: any = [];
  @observable propertyType: IPropertyType | null = null;
  @observable property: IProperty | null = null;
  @observable loadingInitial = false;
  @observable loading = false;
  @observable propertiesCount = 0;
  @observable propertyTypeRegistry: any = [];
  @observable submitting = false;
  @observable target = '';
  @observable status = '';
  @observable page = 0;
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
  };

  /// Image Upload
  @observable image: Blob | null = null;
  @observable files: any[] = [];
  @observable uploadingPhoto = false;

  @action setFiles = (files: object[]) => {
    this.files = files;
  };

  @action setImage = (file: Blob) => {
    this.image = file;
  };

  @computed get totalPages() {
    return Math.ceil(this.propertiesCount / LIMIT);
  }
  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed get propertyTypesByName() {
    return Array.from(this.propertyTypeRegistry.values()).sort();
  }
  @observable propertyTyCount: any = [];

  @action displayPropertyTypes = async (callback: any) => {
    this.loadingInitial = true;
    try {
      const propertyTypes = await agent.PropertyTypes.list();
      runInAction('loading Property TYpe', () => {
        this.loadingInitial = false;
        callback(propertyTypes);
      });
    } catch (error) {
      runInAction('load  Property TYpe error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
  @action getpPropertyTypes = async (callback: any) => {
    try {
      const propertyTypes = await agent.PropertyTypes.list();
      runInAction('loading property types', () => {
        var propertyName;
        var propertyDescription;
        var propertyLocation;
        var arrayCount;
        var AvailableCount;
        var OccupiedCount;
        var ReservedCount;
        var propertyTypeCounts = new Array(0);
        var i = 0;

        propertyTypes.forEach((propertyType) => {
          var count: number = 0;
          var Available: number = 0;
          var Occupied: number = 0;
          var Reserved: number = 0;
          i++;
          propertyType.properties?.forEach((property) => {
            count++;
            if (property.status === 'Available') {
              Available++;
            } else if (property.status === 'Occupied') {
              Occupied++;
            } else if (property.status === 'Reserved') {
              Reserved++;
            }
          });

          propertyName = propertyType.name;
          propertyDescription = propertyType.description;
          propertyLocation = propertyType.location;
          arrayCount = count.toString();
          AvailableCount = Available.toString();
          OccupiedCount = Occupied.toString();
          ReservedCount = Reserved.toString();

          propertyTypeCounts[i] = new Array(
            propertyName, // 0
            propertyDescription, // 1
            arrayCount, // 2
            AvailableCount, // 3
            ReservedCount, // 4
            OccupiedCount, // 5
            propertyType.id, // 6
            propertyLocation // 7
          );
        });
        callback(propertyTypeCounts);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action countProperties = async () => {
    try {
      const propertyTypes = await agent.PropertyTypes.list();
      const properties = await agent.Properties.list();

      runInAction('loading property types', () => {
        propertyTypes.forEach((propertyType) => {
          var count: number = 0;
          properties.forEach((property) => {
            if (propertyType.id === property.propertyTypeId) {
              count += 1;
              // console.log(property.name);
            }
          });
          console.log(count);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // PROPERTYTYPE DROPDOWN
  @action loadPropertyTypes = async () => {
    try {
      this.propertyTypeRegistry = [];
      const propertyTypes = await agent.PropertyTypes.list();

      runInAction('loading property types', () => {
        propertyTypes.forEach((propertyType) => {
          this.propertyTypeRegistry.push({
            key: propertyType.id,
            text: propertyType.name,
            value: propertyType.id,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action createPropertyType = async (propertyType: IPropertyType) => {
    this.submitting = true;
    try {
      runInAction(() => {
        this.status = 'Uploading Details ...';
      });
      if (this.image !== null) {
        var returnimage = await agent.PropertyTypes.uploadPhoto(this.image!);
        let newImage = {
          id: returnimage.id,
          url: returnimage.url,
          isMain: true,
          propertyTypeId: propertyType.id,
        };
        propertyType.image = newImage;
        await agent.PropertyTypes.create(propertyType);
      } else {
        await agent.PropertyTypes.create(propertyType);
      }
      runInAction(() => {
        this.status = 'Uploading Image ...';
      });
      toast.success('Property Type Successfully Added');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  @action EditPropertyType = async (propertyType: IPropertyType) => {
    this.loading = true;
    try {
      if (this.image != null) {
        var returnimage = await agent.PropertyTypes.uploadPhoto(this.image!);
        let newImage = {
          id: returnimage.id,
          url: returnimage.url,
          isMain: true,
        };
        propertyType.image = newImage;
        await agent.PropertyTypes.update(propertyType);
      } else {
        const property = await agent.PropertyTypes.list();
        property.forEach((prop) => {
          if (propertyType.id === prop.id) {
            propertyType.image = prop.image;
          }
        });
        await agent.PropertyTypes.update(propertyType);
      }
      runInAction('editing property type', () => {
        this.propertyTypeRegistry.set(propertyType.id, propertyType);
        this.propertyType = propertyType;
        this.loading = false;
      });
    } catch (error) {
      runInAction('editing property error', () => {
        this.loading = false;
      });
      console.log(error);
    }
    toast.success('property has been edited');
    window.location.reload();
  };

  @action DeletePropertyType = async (id: string) => {
    this.submitting = true;
    var ImageId: any = [];
    try {
      const propertyTypes = await agent.PropertyTypes.list();
      propertyTypes.forEach((property) => {
        if (property.id === id) {
          ImageId = property.image?.id;
        }
      });
      await agent.PropertyTypes.delete(id);
      toast.success('Property Type was Deleted');
      runInAction('deleting property', () => {
        this.propertyTypeRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('delete property error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
    window.location.reload();
  };

  // Ibalhin ni sa ubos para dili mag conflict
  @action getPropertiesByAvailable = async (id: string) => {
    this.loading = true;
    try {
      const propertyTypes = await agent.PropertyTypes.list();
      runInAction(() => {
        this.propertyRegistry = [];
        var propertyType = propertyTypes.find((p) => p.id === id);
        propertyType?.properties?.sort((a, b) => (a.name > b.name ? 1 : -1));
        propertyType?.properties?.map((property) => {
          if (property.status === 'Available') {
            this.propertyRegistry.push({
              key: property.id,
              text: property.name,
              value: property.id,
            });
          }
        });
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  //
}
