import { action, computed, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IPropertyType } from "../models/propertyType";
import { RootStore } from "./rootStore";


export default class PropertyTypeStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    // @observable propertyTypeRegistry = new Map();
    @observable propertyType: IPropertyType | null = null;

    @observable propertyTypeRegistry: any = [];
 
    @computed get propertyTypesByName() {
        return Array.from(this.propertyTypeRegistry.values()).sort();
    }

    @action getpPropertyTypes = async( callback: any ) => {
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            callback(propertyTypes)
        } catch (error){
            console.log(error)
        }
    }

    @action loadPropertyTypes = async () => {
        // console.log(this.propertyTypeRegistry);
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            // console.log(propertyTypes);
            runInAction('loading property types', () => {
                propertyTypes.forEach((propertyType) => {
                    this.propertyTypeRegistry.push({
                        key: propertyType.name,
                        text: propertyType.name,
                        value: propertyType.name
                    });
                })
            })
        } catch (error) {
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
