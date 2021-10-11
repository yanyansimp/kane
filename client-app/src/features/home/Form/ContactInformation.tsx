
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
            <List.Header>(+63) 909 272 6371</List.Header>
        </List.Content>
    </List.Item>
    <List.Item as='a'>
            <Icon name='mail' />
        <List.Content>
            <List.Header><a href="hhttps://www.facebook.com/kanerealtyofficial">@kanerealtyofficial</a></List.Header>
        </List.Content>
    </List.Item>
        
   
  </List>
  </Message>
)

export default ContactInformation


