import { action, computed, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IProperty } from "../models/Property";
import { RootStore } from "./rootStore";
import { history } from '../..';
import { toast } from "react-toastify";
import { Loader } from "semantic-ui-react";


export default class PropertyStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // @observable propertyRegistry = new Map();
  @observable property: IProperty | null = null;
  @observable propertyRegistry: any = [];
  @observable loading = false;
  @observable loadingInitial = false;

  @observable target = '';
  @observable submitting = false;
  @observable propertyTypeAvailableId: any = [];
  @observable status = '';

  /// Image Upload
  @observable image: Blob | null = null;
  @observable files: any[] = [];
  @observable uploadingPhoto = false;

  @action setFiles = (files: object[]) => {
    // console.log(files)
    this.files = files;
  };

  @action setImage = (file: Blob) => {
    // console.log(file)
    this.image = file;
  };

  @action propertyTypeAvailable(data: any) {
    runInAction('loading Property Type Id', () => {
      this.propertyRegistry.push({
        key: data,
        text: data,
        value: data,
      });
    });
  }

  @computed get propertiesByName() {
    return Array.from(this.propertyRegistry.values()).sort();
  }

  @action getProperties = async (callback: any) => {
    try {
      const properties = await agent.Properties.list();
      callback(properties);
    } catch (error) {
      console.log(error);
    }
  };

  @action loadProperties = async () => {
    this.loadingInitial = true;
    try {
      const properties = await agent.Properties.list();
      runInAction('loading properties', () => {
        this.propertyRegistry = [];
        properties.forEach((property) => {
          this.propertyRegistry.push({
            key: property.id,
            text: property.name,
            value: property.id,
          });
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('error loading properties', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };


    @action createProperty = async (property: IProperty) => {
        this.submitting = true;
        try {
            if (this.image != null){
                var returnimage = await agent.Properties.uploadPhoto(this.image!);
                let newImage = {
                    id: returnimage.id,
                    url: returnimage.url,
                    isMain: true,
                    };
                    property.image = newImage;
                    await agent.Properties.create(property);
            }else{
                await agent.Properties.create(property);
            }
           toast.success('Property Successfully Added');
           window.location.reload();
        } catch (error) {
            runInAction(() => {
                this.status = 'Uploading Details ...';
                this.submitting = false;
                toast.error('Problem submitting data');
            });
        }
    }
    
    @action EditProperty = async (property: IProperty) => {
        this.loading = true;
        this.submitting = true;
        try{
                if (this.image != null){
                    var returnimage = await agent.Properties.uploadPhoto(this.image!);
                    let newImage = {
                        id: returnimage.id,
                        url: returnimage.url,
                        isMain: true,
                        };
                        property.image = newImage;
                        await agent.Properties.update(property);
                        toast.success('property has been edited');
                }else{
                    const properties = await agent.Properties.list();
                    properties.forEach((prop)=>{
                        if(property.id === prop.id){
                            property.image = prop.image;
                        };
                    })
                    await agent.Properties.update(property);
                    toast.success('property has been edited');
                }
                runInAction('editing property', () => {
                    this.propertyRegistry.set(property.id, property);
                    this.property = property;
                    this.loading = false;
                    this.submitting = false;
                })
            } catch (error){
                runInAction('editing property error', () => {
                    this.loading = false;
                    this.submitting = false;
                })
                console.log(error)
            }
           
            window.location.reload();
    }
  

    @action DeleteProperty = async (id: string) => {
        this.submitting = true;
        try {
            await agent.Properties.delete(id);
            runInAction('deleting property', () => {
              this.propertyRegistry.delete(id);
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
    }


  @action returnAvailable = async (callback: any) => {
    try {
      const properties = await agent.Properties.list();
      runInAction('loading property types', () => {
        var propertyAvailable = new Array(0);
        var i = 0;
        properties.forEach((property) => {
          i++;
          if (property.status === 'Available') {
            propertyAvailable[i] = property;
          }
        });
        callback(propertyAvailable);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action returnReserved = async (callback: any) => {
    try {
      const properties = await agent.Properties.list();
      runInAction('loading property types', () => {
        var propertyAvailable = new Array(0);
        var i = 0;
        properties.forEach((property) => {
          i++;
          if (property.status === 'Reserved') {
            propertyAvailable[i] = property;
          }
        });
        callback(propertyAvailable);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  @action returnStatus = async (callback: any) => {
    try {
      const propertyTypes = await agent.PropertyTypes.list();
      runInAction('loading Property TYpe', () => {
        callback(propertyTypes);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action returnOccupied = async (callback: any) => {
    try {
      const properties = await agent.Properties.list();
      runInAction('loading property types', () => {
        var propertyAvailable = new Array(0);
        var i = 0;
        properties.forEach((property) => {
          i++;
          if (property.status === 'Occupied') {
            propertyAvailable[i] = property;
          }
        });
        callback(propertyAvailable);
      });
    } catch (error) {
      console.log(error);
    }
  };
}

