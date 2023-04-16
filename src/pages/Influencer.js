import React, { useState } from 'react';
import { Card, Image, Grid, Button, Item, Header, Menu } from 'semantic-ui-react';
import '@aws-amplify/ui-react/styles.css';
import tweets from '../Twitter_Data/tweets.json';
import metrics from '../Twitter_Data/metrics-time.json';

import { useNavigate, useParams } from 'react-router-dom';
import { displayInfluencer } from './InfluencerPage';
import MetricsDisplay from 'components/Metrics';
import axios from 'axios'
import { getInfluencerData, getInfluencerMetrics, getRecommendedInfluencer } from 'util/apicall';


export const getInfluencersTweets = async (id) => {
    return tweets.filter(x => x.twitter_user_id == id);
} 


function Influencer({ signOut, user}) {
    const navigate = useNavigate();
    const [influencerProfile, setInfluencerProfile] = useState({})
    const [influencerTweets, setInfluencerTweets] = useState([])
    const [influencerMetrics, setInfluencerMetrics] = useState([])
    const [influencerRecommendation, setRecom] = useState([])
    let {id} = useParams();
    const handleSignOut = ()=>{
      signOut();
      navigate('/home');
    }
    React.useEffect(()=>{
        const getData = async () => {
            console.log(id)
            let [a, b, c, d] = await Promise.all([getInfluencerData(id), getInfluencerMetrics(id), getInfluencersTweets(id), retrieveRecommendation()]);
            setInfluencerProfile(a[0]);
            // @ts-ignore
            setInfluencerMetrics(b);
            setInfluencerTweets(c);
        }
        getData();
        
    }, [id]);
    const retrieveRecommendation = async () =>{
        let result_data;
        let result_all;
        try{
            console.log("Retrieve recommendation from ")
            console.log(id)
            result_data = await getRecommendedInfluencer(id);
            let promises = []
            for(let influencer of result_data) {
                promises.push(getInfluencerData(influencer.twitter_user_id))
            }
            result_all = await Promise.all(promises);
            for(let i = 0; i < result_all.length; i++) {
                result_all[i] = {...result_data[i], ...result_all[i]};
            }
            console.log("Recommendation for %d", id)
            console.log(result_all)
        } catch(e){
            console.log(e)
        }
        setRecom(result_all);
    }

  return (
    <Grid textAlign="center" style={{ height: '100vh', marginTop: '10vh'}} verticalAlign='top' divided>
        
        <Grid.Column width={10}>
            <Item.Group>
                {displayInfluencer(influencerProfile)}
            </Item.Group>
            {InfluencerMetrics({influencerMetrics})}
        </Grid.Column>
        <Grid.Column width={4} >
            <Header as='h2' style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
                 Recommended for You
            </Header>
            <Item.Group divided>
            {influencerRecommendation?.map(x => {
                return (
                    <Grid.Row>
                        {displayInfluencer(x)}
                    </Grid.Row>
                );})}
            </Item.Group>
        </Grid.Column>
        
    </Grid>
  );
}

export default Influencer;

const InfluencerMetrics = ({ influencerMetrics }) => {
    const [activeItem, setActiveItem] = useState('followers_count');
  
    const handleItemClick = (e, { name }) => setActiveItem(name);
  
    return (
      <Grid>
        <Grid.Row >
          <Menu pointing secondary>
            <Menu.Item
              name='followers_count'
              active={activeItem === 'followers_count'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='tweet_count'
              active={activeItem === 'tweet_count'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='following_count'
              active={activeItem === 'following_count'}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Row>
        <Grid.Row>
          {activeItem === 'followers_count' && (
            <MetricsDisplay data={influencerMetrics} yaxis={'followers_count'} xaxis={'retrieved_date'} />
          )}
          {activeItem === 'tweet_count' && (
            <MetricsDisplay data={influencerMetrics} yaxis={'tweet_count'} xaxis={'retrieved_date'} />
          )}
          {activeItem === 'following_count' && (
            <MetricsDisplay data={influencerMetrics} yaxis={'following_count'} xaxis={'retrieved_date'} />
          )}
        </Grid.Row>
      </Grid>
    );
  };