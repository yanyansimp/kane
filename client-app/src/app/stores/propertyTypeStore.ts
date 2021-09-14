import { action, computed, observable, runInAction, extendObservable  } from "mobx";
import agent from "../api/agent";
import { IPropertyType } from "../models/propertyType";
import { IProperty } from "../models/Property";
import { RootStore } from "./rootStore";



export default class PropertyTypeStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    // @observable propertyTypeRegistry = new Map();
    @observable propertyType: IPropertyType | null = null;
    @observable property: IProperty | null = null;
    @observable loading = false;
    @observable propertyTypeRegistry: any = [];
    @observable submitting = false;
    @observable target = '';
    @observable status = '';
    
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


    @computed get propertyTypesByName() {
        return Array.from(this.propertyTypeRegistry.values()).sort();
    }

    @observable propertyTyCount: any = [];
    @action displayPropertyTypes = async (callback :any) => {
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            runInAction('loading Property TYpe', () => {
                callback(propertyTypes)
            })
        }catch (error){
            console.log(error)
        }
    }
    @action getpPropertyTypes = async( callback: any ) => {
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            runInAction('loading property types', () => {
                var propertyName
                var propertyDescription
                var propertyLocation
                var arrayCount
                var AvailableCount
                var OccupiedCount
                var ReservedCount
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
                      if(property.status === 'Available'){
                          Available ++
                      } else if( property.status === 'Occupied'){
                          Occupied ++
                      } else if( property.status === 'Reserved'){
                          Reserved ++
                      }
                  })

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
                })
                callback(propertyTypeCounts)
            })
            
        } catch (error){
            console.log(error)
        }
    }

    

    @action countProperties = async () => {
         
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            const properties = await agent.Properties.list();
            
            runInAction('loading property types', () => {
                propertyTypes.forEach((propertyType) => {
                    var count:number = 0;
                    properties.forEach((property) => {
                        if(propertyType.id === property.propertyTypeId){
                            count += 1;
                            // console.log(property.name);
                        }
                    })
                    console.log(count);
                })
            })
        }catch (error) {
            console.log(error)
    }}


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
                        value: propertyType.id
                    });
                });
            });

        } 
        catch (error) {
            console.log(error)
        }
    }

    @action createPropertyType = async (propertyType: IPropertyType) => {
        this.submitting = true;
        try{
            runInAction(() => {
                this.status = 'Uploading Details ...';
            });
            console.log(this.image)
            var returnimage = await agent.PropertyTypes.uploadPhoto(this.image!);
            console.log(returnimage)
        //    let newImage = {
        //         id: returnimage.id,
        //         url: returnimage.url,
        //    };
           console.log(returnimage);
           this.image = null;
           this.files = [];
            // propertyType.image = newImage;
           const prop = await agent.PropertyTypes.create(propertyType);
             // Image Upload
             if (this.image  !== null) {
                runInAction(()=>{
                    this.status = 'Uploading Image ...';
                });
             }

        }catch(error){
            console.log(error)
        }
       
       
        // try {
        //     await agent.PropertyTypes.create(propertyType);
            
        // } catch (error) {

        // }
    }

    @action EditPropertyType = async (propertyType: IPropertyType) => {
        this.loading = true;
        
        try{
            // let index = this.propertyTypeRegistry.findIndex(({key: any}) => key === propertyType.id);
            
            await agent.PropertyTypes.update(propertyType);
            // console.log(propertyType.id);
            //  this.propertyTypeRegistry.findIndex((x:any) => x.key === propertyType.id);
            // console.log(pT);

            runInAction('editing property type', () => {
                this.propertyTypeRegistry.set(propertyType.id, propertyType);
                this.propertyType = propertyType;
                this.loading = false;
            })
        } catch (error){
            runInAction('editing property error', () => {
                this.loading = false;
            })
            // console.log(error)
        }
    }

    @action DeletePropertyType = async (id: string) => {
        this.submitting = true;
        try {
            await agent.PropertyTypes.delete(id);
            runInAction('deleting property', () => {
              this.propertyTypeRegistry.delete(id);
              this.submitting = false;
              this.target = '';
            //   history.push('/property')
            });
          } catch (error) {
            runInAction('delete property error', () => {
              this.submitting = false;
              this.target = '';
            });
            console.log(error);
          }
    }



}


