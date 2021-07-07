import { action, computed, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IPropertyType } from "../models/propertyType";
import { RootStore } from "./rootStore";


export default class PropertyTypeStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable propertyTypeRegistry = new Map();
    @observable propertyType: IPropertyType | null = null;

    @computed get propertyTypesByName() {
        return Array.from(this.propertyTypeRegistry.values()).sort();
    }

    @action loadPropertyTypes = async () => {
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            runInAction('loading property types', () => {
                propertyTypes.forEach(propertyType => {
                    this.propertyTypeRegistry.set(propertyType.id, propertyType);
                    console.log(propertyType);
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