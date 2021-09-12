
import React from 'react'
import { Icon, List, Message } from 'semantic-ui-react'

const ContactInformation = () => (
  <Message>
      
    <List>
    <List.Item as='a'>
      <Icon name='marker' />
        <List.Content>
            <List.Header>Real estate agency in Butuan</List.Header>
                <List.Description>
                        Door 5 MM Arcade, Purok 18, Lower Mandacpan, Brgy, Butuan City
                </List.Description>
        </List.Content>
    </List.Item>
    <List.Item as='a'>
            <Icon name='phone' />
        <List.Content>
            <List.Header>(+632) 315-3232352</List.Header>
        </List.Content>
    </List.Item>
    <List.Item as='a'>
            <Icon name='mail' />
        <List.Content>
            <List.Header>KaneRealty@gmail.com</List.Header>
        </List.Content>
    </List.Item>
        
   
  </List>
  </Message>
)

export default ContactInformation


