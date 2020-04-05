import axios from 'axios';
import moment from 'moment';

class DataWorker{
  constructor() {
    this.state = "LOADING";
    this.date = new moment("2020-01-01");
    this.setState("LOADING");
    this.loadData();

    this.interval = setInterval(() => {
      this.doPlayback();
    }, 500);
  }
  doPlayback(){
    const data = this.getDataByDate(this.date.format("YYYY-MM-DD")) || {
      infections:[],
      deaths: []
    };

    self.postMessage({
      state: "UPDATE", 
      data
    });

    this.date.add(1, 'days');
  }
  async loadData() {
    try{
      const {data} = await axios.get('/spread_data.json');
      this.data = data;
      this.setState("LOADED");
    } catch (ex) {
      console.error(ex);
    }
  }
  setState(state){
    this.state = state;
    self.postMessage({state: this.state});
  }
  play(){
    this.setState("PLAYING");
  }
  pause(){
    this.setState("PAUSED");
  }
  getDataByDate(date) {
    return this.data.find((entry) => entry.date === date);
  }
  handleMessage(data){
    switch(data.command){
      case "PLAY":
        this.play();
      break;
      case "PAUSE":
        this.pause();
      break;
      default:
      break;
    }
  }
};

const dw = new DataWorker();
 
onmessage = function({data}) {
  dw.handleMessage(data);
};
