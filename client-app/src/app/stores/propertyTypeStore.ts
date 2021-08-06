import { action, computed, observable, runInAction, extendObservable  } from "mobx";
import agent from "../api/agent";
import { IPropertyType } from "../models/propertyType";
import { IProperty } from "../models/Property";
import { RootStore } from "./rootStore";
import { useState } from "react";
import { stringifyKey } from "mobx/lib/internal";



export default class PropertyTypeStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    // @observable propertyTypeRegistry = new Map();
    @observable propertyType: IPropertyType | null = null;
    @observable property: IProperty | null = null;

    @observable propertyTypeRegistry: any = [];
    @computed get propertyTypesByName() {
        return Array.from(this.propertyTypeRegistry.values()).sort();
    }
    @observable propertyTyCount: any = [];
    @action getpPropertyTypes = async( callback: any ) => {
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            const properties = await agent.Properties.list();
            runInAction('loading property types', () => {
                
                var propertyDescription
                var arrayCount
                var AvailableCount
                var OccupiedCount
                var ReservedCount
                var propertyTypeCounts = new Array(0);
                var arrayLength = 0;
                var i = 0;
                
                propertyTypes.forEach((propertyType) => {
                    var count:number = 0;
                    var Available:number = 0;
                    var Occupied:number = 0;
                    var Reserved:number = 0;
                    i +=1
                    properties.forEach((property) => {
                        if(propertyType.id === property.propertyTypeId){
                            count ++
                        }
                        if(property.status === 'Available' && propertyType.id === property.propertyTypeId){
                            Available ++
                        } else if( property.status === 'Occupied' && propertyType.id === property.propertyTypeId){
                            Occupied ++
                        } else if( property.status === 'Reserved' && propertyType.id === property.propertyTypeId){
                            Reserved ++
                        }
                    })
                    propertyDescription = propertyType.description
                    arrayCount = count.toString()
                    AvailableCount = Available.toString()
                    OccupiedCount = Occupied.toString()
                    ReservedCount = Reserved.toString()
                    propertyTypeCounts[i] = new Array(propertyDescription, arrayCount, AvailableCount, ReservedCount, OccupiedCount, propertyType.id);
                
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
                            count += 1
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
        // console.log(this.loadPropertyTypes);
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            // console.log(propertyTypes);
            runInAction('loading property types', () => {
                propertyTypes.forEach((propertyType) => {
                    // console.log(propertyType.id);
                    this.propertyTypeRegistry.push({
                        key: propertyType.id,
                        text: propertyType.description,
                        value: propertyType.id
                    });
                })
            })
        } 
        catch (error) {
            console.log(error)
        }
    }

    @action createPropertyType = async (propertyType: IPropertyType) => {
        try {
            await agent.PropertyTypes.create(propertyType);
        } catch (error) {

        }
    }
}
function propertyTypeRegistry(propertyTypeRegistry: any) {
    throw new Error("Function not implemented.");
}
function typeCount(typeCount: any) {
    throw new Error("Function not implemented.");
}

function concat(propertyName: string, propertyDescription: number) {
    throw new Error("Function not implemented.");
}

function push(description: string, count: number): string[] {
    throw new Error("Function not implemented.");
}

