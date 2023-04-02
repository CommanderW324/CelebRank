import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Loader, Dimmer} from 'semantic-ui-react'
import '@aws-amplify/ui/dist/styles.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './../aws-exports';

Amplify.configure(awsExports);
function Login({signOut, user, ...otherProp}) {
    const [isLogin, setIsLogin] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false)
    
    const toggleForms = () => setIsLogin(!isLogin)
    const handleSignUp = () => {
        setIsLoading(true)
        setTimeout(()=>{setIsLoading(false)}, 2000);
    }
    const handleLogin = () => {
        setIsLoading(true)
        setTimeout(()=>{setIsLoading(false)}, 2000);
    }
    return isLogin ? (
        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }} className={'render'}>
                <Header as='h2' color='orange' textAlign='center'>
                <Image src='/logo.png' /> Log-in to your account
                </Header>
                <Form size='large'>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    />
        
                    <Button color='orange' fluid size='large' disabled={isLoading} onClick={handleLogin} loading={isLoading}>
                        Log in 
                    </Button>
                </Segment>
                </Form>
                <Message>
                    Don't have an account ? <a onClick={toggleForms}>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    ) :
    (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='orange' textAlign='center'>
                <Image src='/logo.png' /> Log-in to your account
                </Header>
                <Form size='large'>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    />
        
                    <Button color='orange' fluid size='large' disabled={isLoading} onClick={handleSignUp}>
                    {isLoading ? <Loader> Submitting </Loader>: "Sign Up" }
                    </Button>
                </Segment>
                </Form>
                <Message>
                    Already have an account ? <a onClick={toggleForms}>Log in</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login;
