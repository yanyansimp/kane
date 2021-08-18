import React, { useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

interface IfirstChildProps {
    name: any,
  }
const ModalExampleContentImage:  React.FC<IfirstChildProps> = ({name}) => {
  const [open, setOpen] = React.useState(false)
  const [ChildProperty, setChildProperty] =  useState([name])
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button circular icon="eye"/>}
    >
      <Modal.Header>Upload image</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={name.image.url} wrapped />
        <Modal.Description>
            <Header>{name.name}</Header>
            <p>{name.description}</p>
            <p>{name.location}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={() => setOpen(false)}>Close</Button>
        {/* <Button onClick={() => setOpen(false)} positive>
          Ok
        </Button> */}
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleContentImage
