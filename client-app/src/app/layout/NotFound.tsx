import React from 'react';
import { Segment, Button, Header, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
      <Segment basic placeholder>
        <Image src={'/assets/notfound.svg'} size="big" centered />
        {/* <Header icon>
          <Icon name='search' />
          Oops - we've looked everywhere but couldn't find this.
        </Header> */}
        <Segment.Inline>
          <Header>
            <Header icon>
              Oops - we've looked everywhere but couldn't find this.
            </Header>
          </Header>
        </Segment.Inline>
        <Segment.Inline>
          <Button as={Link} to="/dashboard" color="yellow">
            Return to Dashboard
          </Button>
        </Segment.Inline>
      </Segment>
    );
};

export default NotFound;