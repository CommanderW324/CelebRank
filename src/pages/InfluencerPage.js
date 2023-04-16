

import React, { useState } from 'react';
import { Card, Image, Grid, Button, Item, Pagination, Statistic, Icon, Input, Tab, Header, Dropdown} from 'semantic-ui-react';
import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './../aws-exports';
import { Link, useNavigate } from 'react-router-dom';
import influencers from '../Twitter_Data/influencers.json';
import axios from 'axios'
import { INFLUENCER_BASIC, INFLUENCER_METRIC, INFLUENCER_TOPIC_URL } from 'util/constants';
import topics from '../Twitter_Data/topics.json'
import { getInfluencerByTopic, getInfluencerData } from 'util/apicall';

Amplify.configure(awsExports);

function InfluencerPage({ signOut, user}) {
    let userDetails = user.attributes;

    //Set which page we are currently on
    const [pageCount, setPageCount] = useState(1);
    const [num, setNum] = useState(30); //Set number of influencer to display
    const [influencersList, setInfluencerList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [topic_id, setTopicId] = useState(0)
    const navigate = useNavigate();
    const handleChange = (event, data)=>{
        setPageCount(data.activePage)
        console.log(data)
    }
    const handleSignOut = ()=>{
      signOut();
      navigate('/home');
    }
    const handleSearch = async () =>{
        let result;
        setIsSearch(true)
        try{
            result = await getSearchQuery(searchQuery);
        } catch(e){
            console.log(e)
        }
        setSearchResult(result);
    }
    const handleTopic = async () =>{
        let result_data;
        let result_all;
        setIsSearch(true)
        try{
            result_data = await getInfluencerByTopic(topic_id);
            let promises = []
            for(let influencer of result_data) {
                promises.push(getInfluencerData(influencer.twitter_user_id))
            }
            result_all = await Promise.all(promises);
            console.log(result_all)
            console.log("Bodh")
            for(let i = 0; i < result_all.length; i++) {
                result_all[i] = {...result_data[i], ...result_all[i][0]};
            }
            console.log(result_all)
            console.log("HelloBod")
        } catch(e){
            console.log(e)
        }
        setSearchResult(result_all);
    }
    React.useEffect(()=>{
        if(influencersList.length < num * pageCount){
            let newInfluencer = getInfluencerList(num * pageCount);
            setInfluencerList(influencersList.concat(newInfluencer));
            console.log(newInfluencer)
        }
    }, [pageCount, num])

    React.useEffect(()=>{
        if(searchQuery == ''){
            setIsSearch(false);
        }
    }, [searchQuery])
    const influencerToDisplay = isSearch ? searchResult: influencersList.slice(num * pageCount, num * (pageCount + 1));
    const tabPanes = [{ menuItem: 'Find by name', render: () => <Tab.Pane>{inputSearch}</Tab.Pane>},
{ menuItem: 'Find by Topic', render: () => <Tab.Pane>{TopicList}</Tab.Pane> }]
    const inputSearch = <Input
    icon='search'
    placeholder='Search name...'
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === 'Enter') {
        handleSearch();
        }
    }}/>
    const handleDropdownChange = (e, { value }) => {
        setTopicId(value);
        console.log(value);
        console.log("drop")
        console.log(e)
      };

    const TopicList = <Dropdown
        placeholder='Select Topic'
        fluid
        search
        selection
        options={topics}
        onChange={handleDropdownChange}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleTopic();
            }
        }}
    />;
    
    
      
  return (
    <Grid textAlign='center' style={{ height: '30vh', marginTop:'5vh' }} verticalAlign='middle'>
        <Grid.Row style={{ maxHeight: 100 }}>
            <Pagination defaultActivePage={1} totalPages={20} onPageChange={handleChange}/>
        </Grid.Row>
        <Grid.Row style={{ maxHeight: 100, marginBottom: "15px" }}>
            <Tab panes={tabPanes}/>
        </Grid.Row>
        <Grid.Row>
            <Item.Group style={{maxWidth: '55%'}} divided>
                {influencerToDisplay.map(influencer => displayInfluencer(influencer))}
            </Item.Group>
            
        </Grid.Row>

        <Grid.Row style={{ maxHeight: 100 }}>
            <Pagination defaultActivePage={1} totalPages={20} onPageChange={handleChange}/>
        </Grid.Row>
    </Grid>
  );
}

export default withAuthenticator(InfluencerPage);

const getInfluencerList = (page, num) => {
    let ans = influencers.slice(num * page);
    return ans;
}
const displayJson = (data) => (
    <Item.Group>
        {data.map(influencer => displayInfluencer(influencer))}
    </Item.Group>
  )

export const displayInfluencer = (influencer) =>{
    return (
        <>
            <Item style={{ 
                border: '1px solid black',
                boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.01)',
                padding: '10px',
                borderRadius: '5px',
                }}>
                <Item.Image size='tiny' src={influencer?.profile_image_url}/>
                <Item.Content >
                    
                        <Item.Header><Link to={'/influencer/' + influencer?.twitter_user_id}>{influencer?.name}</Link></Item.Header>
                        <Item.Meta>Description</Item.Meta>
                        <Item.Description>
                            {influencer?.description}
                        </Item.Description>
                    
                    <Item.Extra>Additional Details</Item.Extra>
                    <Item.Description>
                            {influencer?.location}
                    </Item.Description>
                    <Statistic size='tiny'>
                        <Statistic.Value>{influencer?.followers_count}</Statistic.Value>
                        <Statistic.Label>Followers</Statistic.Label>
                    </Statistic>
                    <Statistic size='tiny'>
                        <Statistic.Value>{influencer?.tweet_count}</Statistic.Value>
                        <Statistic.Label>Tweet Count</Statistic.Label>
                    </Statistic>
                </Item.Content>
            </Item>
        </>
    )
}
const getSearchQuery = async (name) =>{
    let resp;
    try{
        resp = await axios.get(INFLUENCER_BASIC,  {params: {
            name: name
          }});
    } catch(error){
        console.error(error);
    }
    return resp.data;
}

 