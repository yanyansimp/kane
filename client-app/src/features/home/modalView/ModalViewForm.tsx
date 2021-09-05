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
        <Image size='medium' src={name.image.url} wrapped />
        <Header>{name.name}</Header>
        <Header.Subheader>
        {name.location}
        </Header.Subheader>
        <Header.Subheader>
           <p>Description:</p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum repudiandae pariatur, mollitia exercitationem similique eligendi animi est ex sint, quam modi reiciendis fugit quibusdam atque? Aliquam dolores explicabo non dignissimos!
        </Header.Subheader>
      </Grid.Column>
    </Grid>
  )
}

export default ModaView
