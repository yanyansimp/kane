import { action, computed, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { IAmenities } from "../models/amenities";
import { RootStore } from "./rootStore";
import { history } from '../..';

export default class AmenitiesStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable amenities: IAmenities | null = null;
    @observable submitting = false;
    @observable loading = false;
    @observable status = '';
    @observable AmenitiesRegistry: any = [];
    @observable target = '';

    @computed get amenitiesByName() {
        return Array.from(this.AmenitiesRegistry.values()).sort();
      }

    @action createAmenities = async (values: IAmenities ) => {
        this.submitting = true;
        try{
            await agent.Amenities.create(values)
            runInAction(() => {
                this.submitting = false;
              });
            toast.success('Amenities Successfully Added to Property Type');
            window.location.reload();
        }catch(error){
            console.log(error)
            runInAction(() => {
                this.submitting = false;
                this.status = 'Uploading Details ...';
                toast.error('Problem submitting data');
            });

        }
    }

    @action loadAmenities = async (callback: any) => {
        try{
            const amenities = await agent.Amenities.list();
            runInAction('Loading Amenities', () => {
                callback(amenities)
            })
        }catch (error){
            console.log(error)
        }
    }

    @action editAmenities = async (values: IAmenities) => {
        this.submitting = true;
        try{
            await agent.Amenities.update(values);
            runInAction('editing Amenities', () => {
                    this.AmenitiesRegistry.set(values.id, values);
                    this.amenities = values;
                    this.submitting = false;
            });
            toast.success('Edit Success');
            window.location.reload();
        }catch (error) {
            runInAction('editing Amenities error', () => {
                this.submitting = false;
            });
            // toast.error('some unexpected error');
            console.log(error);
            window.location.reload();
        } 
    };

    @action DeleteAmenities = async (id: string) => {
        this.submitting = true;
        try {
            await agent.Amenities.delete(id);
            runInAction('deleting Amenities', () => {
                this.AmenitiesRegistry.deleted(id);
                this.submitting = false;
                this.target = '';
            });
            toast.success('Successfully deleted');
        window.location.reload();
        }catch(error){
            runInAction('delete Amenities error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error)
        };
        window.location.reload();
    };


}