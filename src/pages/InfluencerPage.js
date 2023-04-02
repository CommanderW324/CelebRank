

import React, { useState } from 'react';
import { Card, Image, Grid, Button, Item, Pagination, Statistic, Icon, Input} from 'semantic-ui-react';
import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './../aws-exports';
import { Link, useNavigate } from 'react-router-dom';
import influencers from '../Twitter_Data/influencers.json';

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
  return (
    <Grid textAlign='center' style={{ height: '30vh', marginTop:'5vh' }} verticalAlign='middle'>
        <Grid.Row style={{ maxHeight: 100 }}>
            <Pagination defaultActivePage={1} totalPages={20} onPageChange={handleChange}/>
        </Grid.Row>
        <Grid.Row style={{ maxHeight: 100 }}>
        <Input
            icon='search'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                handleSearch();
                }
            }}/>
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
            <Item >
                <Item.Image size='tiny' src={influencer?.profile_image_url}/>
                <Item.Content >
                    
                        <Item.Header><Link to={'/influencer/' + influencer?.twitter_user_id}>{influencer?.name}</Link></Item.Header>
                        <Item.Meta>Description</Item.Meta>
                        <Item.Description>
                            {influencer?.description}
                        </Item.Description>
                    
                    <Item.Extra>Additional Details</Item.Extra>
                    <Statistic size='tiny'>
                        <Statistic.Value>{influencer?.followers_count}</Statistic.Value>
                        <Statistic.Label>Followers</Statistic.Label>
                    </Statistic>
                    <Statistic size='tiny'>
                        <Statistic.Value>{influencer?.tweet_count}</Statistic.Value>
                        <Statistic.Label>Tweet Count</Statistic.Label>
                    </Statistic>
                    <Statistic size='tiny'>
                        <Statistic.Value>{influencer?.listed_count}</Statistic.Value>
                        <Statistic.Label>Times Listed</Statistic.Label>
                    </Statistic>
                </Item.Content>
            </Item>
        </>
    )
}
const getSearchQuery = async (searchQuery) => {
    setTimeout(()=>{}, 2000);
    let result = influencers.filter(x => x.username == searchQuery);
    console.log("Dobol")
    console.log(result)
    return result
}
 