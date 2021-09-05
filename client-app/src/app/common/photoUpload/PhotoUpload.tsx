import React, { Fragment, useEffect, useState } from 'react';
import { Header, Grid, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';

const PhotoUpload = () => {
    const [files, setFiles] = useState<any[]>([]);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    })

    return (
        <Fragment>
            <Grid>
                <Grid.Column />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Add Photo'/>
                        <PhotoWidgetDropzone setFiles={setFiles}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Preview & Upload' />
                    {files.length > 0 && <Image src={files[0].preview} />}
            </Grid.Column>
            </Grid>
        </Fragment>
    );
} 

export default observer(PhotoUpload);
