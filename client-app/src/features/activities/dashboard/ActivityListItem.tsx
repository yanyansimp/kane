import React from 'react';
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';
import { format } from 'date-fns';
import ActivityListItemAttendees from './ActivityListItemAttendees';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const host = activity.attendees.filter(x => x.isHost)[0];
  return (
    <Segment>
      <Item.Group divided>
        <Item>
          <Item.Image
            size="tiny"
            circular
            src={host.image || '/assets/user.png'}
            style={{marginBottom: 3}}
          />
          <Item.Content>
            <Item.Header as={Link} to={`/activities/${activity.id}`}>
              {activity.title}
            </Item.Header>
            <Item.Meta>
              <span>
                Hosted by
                <Link to={`/profile/${host.username}`}> {host.displayName}</Link>
              </span>
            </Item.Meta>
            <Item.Extra>
              {activity.isHost && (
                <Label basic color="orange" content="Hosting" />
              )}
              {activity.isGoing && !activity.isHost && (
                <Label basic color="green" content="Going" />
              )}
              <Label>
                <Icon name="clock" /> {format(activity.date, 'h:mm a')}
              </Label>
              <Label>
                <Icon name="marker" /> {activity.venue}, {activity.city}
              </Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      <Item.Group>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Item.Group>
      <Item.Group>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Item.Group>
    </Segment>
  );
};

export default ActivityListItem;
