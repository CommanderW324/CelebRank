import React, { useState } from 'react';
import { Card, Image, Grid, Button, Item } from 'semantic-ui-react';
import '@aws-amplify/ui-react/styles.css';
import influencers from '../Twitter_Data/influencers.json';
import tweets from '../Twitter_Data/tweets.json';
import metrics from '../Twitter_Data/metrics-time.json';

import { useNavigate, useParams } from 'react-router-dom';
import { displayInfluencer } from './InfluencerPage';
import MetricsDisplay from 'components/Metrics';

const getInfluencerData = async (id) =>{
    console.log(influencers.find(x => x.twitter_user_id == id))
    return influencers.find(x => x.twitter_user_id == id);
}
const getInfluencersTweets = async (id) => {
    return tweets.filter(x => x.twitter_user_id == id);
} 
const getInfluencerMetrics = async (id) =>{
    return metrics.filter(x => x.twitter_user_id == id);
}
function Influencer({ signOut, user}) {
    const navigate = useNavigate();
    const [influencerProfile, setInfluencerProfile] = useState({})
    const [influencerTweets, setInfluencerTweets] = useState([])
    const [influencerMetrics, setInfluencerMetrics] = useState([])
    let {id} = useParams();
    const handleSignOut = ()=>{
      signOut();
      navigate('/home');
    }
    React.useEffect(()=>{
        const getData = async () => {
            console.log(id)
            let [a, b, c] = await Promise.all([getInfluencerData(id), getInfluencerMetrics(id), getInfluencersTweets(id)]);
            setInfluencerProfile(a);
            setInfluencerMetrics(b);
            setInfluencerTweets(c);
        }
        getData();
        
    }, [])

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '70%' }}>
            <Item.Group>
                {displayInfluencer(influencerProfile)}
            </Item.Group>
            <Grid.Row>
                {<MetricsDisplay data={influencerMetrics} yaxis={'followers_count'} xaxis={'retrieved_date'} />}
            </Grid.Row>
        </Grid.Column>
        
    </Grid>
  );
}

export default Influencer;
