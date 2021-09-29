import { action, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { ILandingPhoto } from "../models/landingPhoto";
import { RootStore } from "./rootStore";


export default class HomePageStore{
    rootStore:RootStore | undefined;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable homepage: ILandingPhoto | null = null;
    @observable landingPhoto: ILandingPhoto | null = null;
    @observable loading = false;
    @observable submitting = false;
    @observable landingPageRegistry: any = [];
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

    @action displayLandingPageHeader = async (callback :any) => {
        try {
            const landingSlide:any = [];
            var i = 0
            const landingPhoto = await agent.LandingPhotos.list();
            landingPhoto.forEach((landing)=>{
                if(landing.isMain === "Header"  ){
                    landingSlide[i] = landing
                    i++
                }
            })
            runInAction('loading Property TYpe', () => {
                callback(landingSlide)
            })
        }catch (error){
            console.log(error)
        }
    }
    @action displayLandingPageFooter = async (callback :any) => {
        try {
            const landingSlide:any = [];
            var i = 0
            const landingPhoto = await agent.LandingPhotos.list();
            landingPhoto.forEach((landing)=>{
                if(landing.isMain === "Footer"  ){
                    landingSlide[i] = landing
                    i++
                }
            })
            runInAction('loading Property TYpe', () => {
                callback(landingSlide)
            })
        }catch (error){
            console.log(error)
        }
    }
    @action displayLandingBody = async (callback :any) => {
        try {
            const landingSlide:any = [];
            var i = 0
            const landingPhoto = await agent.LandingPhotos.list();
            landingPhoto.forEach((landing)=>{
                if(landing.isMain === "Body"  ){
                    landingSlide[i] = landing
                    i++
                }
            })
            runInAction('loading Property TYpe', () => {
                callback(landingSlide)
            })
        }catch (error){
            console.log(error)
        }
    }
    @action createLandingPage = async (LandingPhoto: ILandingPhoto) => {
        this.submitting = true;
        try {
            if (this.image != null){
                var returnimage = await agent.LandingPhotos.uploadPhoto(this.image!);
                LandingPhoto.url = returnimage.url;
                await agent.LandingPhotos.create(LandingPhoto);
                toast.success('Property Successfully Added');
                runInAction(() => {
                    this.status = 'Uploading Details...'
                    this.submitting = false;
                })
                window.location.reload();
            }else{
                toast.error('Image was empty');
            }
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.status = 'Uploading Details ...';
                this.submitting = false;
                toast.error('Problem submitting data');
            });
        }
    };

    @action DeleteLandingPage = async (id: string) => {
        this.submitting = true;
        try {
            await agent.LandingPhotos.delete(id);
            toast.success('one item deleted');
            window.location.reload();
            runInAction('deleting property', () => {
              this.landingPageRegistry.delete(id);
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
    @action EditLandingPage = async (landingPhoto: ILandingPhoto) => {
        this.submitting = true;
            try{
                if(this.image != null){
                    var returnimage = await agent.LandingPhotos.uploadPhoto(this.image!);
                    landingPhoto.url = returnimage.url;
                    await agent.LandingPhotos.update(landingPhoto);
                    toast.success('Header File has been edited');
                } else{
                    const Photo = await agent.LandingPhotos.list();
                    Photo.forEach((prop)=>{
                        if(landingPhoto.id === prop.id){
                            landingPhoto.url = prop.url;
                        };
                    })
                    await agent.LandingPhotos.update(landingPhoto);
                    toast.success('Header2 File has been edited');
                }
                runInAction('editing landing page', () => {
                    this.landingPageRegistry.set(landingPhoto.id, landingPhoto);
                    this.landingPhoto = landingPhoto;
                    this.loading = false;
                })
            }catch(error){
                runInAction('editing landing page error', () => {
                    this.loading = false;
                })
                toast.error('some unexpected error');
            }
            // window.location.reload();
    }


}