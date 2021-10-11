import React, { useState } from 'react'
import { Button, Grid, Header, Image, Modal } from 'semantic-ui-react'

const propType = {
  margin:"1px 0",
  fontFamily: 'Times New Roman', 
}
interface IfirstChildProps {
    name: any,
  }
const ModaView:  React.FC<IfirstChildProps> = ({name}) => {
  const [open, setOpen] = React.useState(false)
  const [ChildProperty, setChildProperty] =  useState([name])
  return (
    <Grid width={9}>
      <Grid.Column  style={propType}>
        <Image size='medium' src={name.image.url || "/assets/placeholder.png"} wrapped />
        <Header>{name.name}</Header>
        <Header.Subheader>
        {name.location}
        </Header.Subheader>
        <Header.Subheader>
           <p><b>Description:</b>{name.description}</p> 
        </Header.Subheader>
      </Grid.Column>
    </Grid>
  )
}

export default ModaView
