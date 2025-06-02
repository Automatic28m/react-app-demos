import axios from "axios"
import url from "../constant/constant";

const fetchPoll = () => {
    return axios.get(`http://localhost:8080/api/poll/allPoll`);
}

const PollApi = {
    fetchPoll
}
export default PollApi;