import axios from 'axios'
import { INFLUENCER_METRIC, INFLUENCER_RECOMMENDATION, INFLUENCER_TREND, INFLUENCER_TOPIC_URL} from 'util/constants';

async function makeGetRequest(endpoint, params) {
    let resp;
    try {
      resp = await axios.get(endpoint, { params });
    } catch (error) {
      console.error(error);
    }
    return resp.data;
  }
export const getInfluencerData = async (id) =>{
    let params = {twitter_user_id: id}
    let result = await makeGetRequest(INFLUENCER_METRIC, params)
    return result
}
export const getInfluencerByTopic = async (topic_id) =>{
    let params = {topic_id}
    let result = await makeGetRequest(INFLUENCER_TOPIC_URL, params)
    return result
}
export const getInfluencerMetrics = async (id) =>{
    let params = {twitter_user_id: id}
    let result = await makeGetRequest(INFLUENCER_TREND, params)
    return result
}
export const getRecommendedInfluencer = async (name) =>{
    let params = {username: name}
    let result = await makeGetRequest(INFLUENCER_RECOMMENDATION, params)
    return result
}