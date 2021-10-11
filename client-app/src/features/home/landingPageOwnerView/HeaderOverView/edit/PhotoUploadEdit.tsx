import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../../app/stores/rootStore';
import PhotoWidgetDropzone from '../../../../../app/common/photoUpload/PhotoWidgetDropzone';
import PhotoWidgetCropper from '../../../../../app/common/photoUpload/PhotoWidgetCropper';

interface IProps {
  uploadPhoto: (file: Blob) => void;
}

const PhotoUpload = () => {
    // const [files, setFiles] = useState<any[]>([]);
    // const [image, setImage] = useState<Blob | null>(null);

    const rootStore = useContext(RootStoreContext);
    const {files, setFiles, setImage} = rootStore.homePageStore;

    useEffect(() => {
      return () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    });
    return (
      <Fragment>
        <Grid stackable>
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <PhotoWidgetDropzone setFiles={setFiles} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {files.length > 0 && (
              <PhotoWidgetCropper
                setImage={setImage}
                imagePreview={files[0].preview}
              />
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview & Upload" />
            {files.length > 0 && (
              <Fragment>
                <div
                  className="img-preview"
                  style={{
                    height: '180px',
                    width: '200px',
                    overflow: 'hidden',
                    marginBottom: '3px'
                  }}
                />
                <Button.Group>
                  <Button floated="left" icon="close" content="Clear" onClick={() => setFiles([])} />
                </Button.Group>
              </Fragment>
            )}
          </Grid.Column>
        </Grid>
      </Fragment>
    );
}

export default observer(PhotoUpload);