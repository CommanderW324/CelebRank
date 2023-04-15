import React, { useState } from 'react';
import { Card, Image, Grid, Button, Item } from 'semantic-ui-react';
import '@aws-amplify/ui-react/styles.css';
import tweets from '../Twitter_Data/tweets.json';
import metrics from '../Twitter_Data/metrics-time.json';

import { useNavigate, useParams } from 'react-router-dom';
import { displayInfluencer } from './InfluencerPage';
import MetricsDisplay from 'components/Metrics';
import axios from 'axios'
import { INFLUENCER_METRIC, INFLUENCER_RECOMMENDATION, INFLUENCER_TREND} from 'util/constants';
const getInfluencerData = async (id) =>{
    let resp;
    try{
        resp = await axios.get(INFLUENCER_METRIC,  {params: {
            twitter_user_id: id
          }});
          console.log("Halo")
        console.log(resp)
    } catch(error){
        console.error(error);
    }
    return resp.data[0];
}
const getInfluencersTweets = async (id) => {
    return tweets.filter(x => x.twitter_user_id == id);
} 
const getInfluencerMetrics = async (id) =>{
    let resp;
    try{
        resp = await axios.get(INFLUENCER_TREND,  {params: {
            twitter_user_id: id
          }});
    } catch(error){
        console.error(error);
    }
    
    return resp.data;
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
            // @ts-ignore
            setInfluencerMetrics(b);
            setInfluencerTweets(c);
        }
        getData();
        
    }, [])

  return (
    <Grid textAlign='center' style={{ height: '100vh', marginTop: '10vh'}} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: '70%'}}>
            <Item.Group>
                {displayInfluencer(influencerProfile)}
            </Item.Group>
            <Grid.Row>
                {<MetricsDisplay data={influencerMetrics} yaxis={'followers_count'} xaxis={'retrieved_date'} />}
            </Grid.Row>
            <Grid.Row>
                {<MetricsDisplay data={influencerMetrics} yaxis={'tweet_count'} xaxis={'retrieved_date'} />}
            </Grid.Row>
            <Grid.Row>
                {<MetricsDisplay data={influencerMetrics} yaxis={'following_count'} xaxis={'retrieved_date'} />}
            </Grid.Row>
        </Grid.Column>
        
    </Grid>
  );
}

export default Influencer;
