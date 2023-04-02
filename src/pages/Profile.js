import React from 'react';
import { Card, Image, Grid, Button } from 'semantic-ui-react';
import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './../aws-exports';
import { useNavigate } from 'react-router-dom';
Amplify.configure(awsExports);

function UserProfile({ signOut, user}) {
    let userDetails = user.attributes;
    const navigate = useNavigate();
    const handleSignOut = ()=>{
      signOut();
      navigate('/home');
    }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Card>
        <Card.Content>
            <Card.Header>{userDetails.given_name}</Card.Header>
            <Card.Meta>
            <span className='date'>{userDetails.email}</span>
            </Card.Meta>
            <Card.Description>
            {userDetails.birthdate}
            </Card.Description>
            
        </Card.Content>
        </Card>
        <Button as='a' onClick={handleSignOut}>
          Sign out
        </Button>
        </Grid.Column>
    </Grid>
  );
}

export default withAuthenticator(UserProfile);
