import axios from 'axios';
import moment from 'moment';

class DataWorker{
  constructor() {
    this.state = "LOADING";
    this.date = new moment("2020-01-15");
    this.today = new moment().format("YYYY-MM-DD");
    this.nextDate(); 
    this.setState("LOADING");
    this.loadData();

    this.interval = setInterval(() => {
      if(this.state === "PLAYING") {
        this.doPlayback();
      }
    }, 700);
  }
  doPlayback(){
    const dateKey = this.date.format("YYYY-MM-DD");
    const data = this.getDataByDate(dateKey);

    self.postMessage({
      command: "UPDATE_DATA",  
      data
    });
    if(this.today === dateKey){
      this.pause();
    } else {
      this.nextDate();
    }
  }
  async loadData() {
    try{
      const {data} = await axios.get('/us-covid-map/spread_data.json');
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
  nextDate(){
    this.date.add(1, 'days');
    self.postMessage({
      command: "UPDATE_DATE",  
      date: this.date.format("YYYY-MM-DD")
    });
  }
  play(){
    this.setState("PLAYING");
  }
  pause(){
    this.setState("PAUSED");
  }
  getDataByDate(date) {
    return this.data.filter((entry) => entry.date === date);
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
}

const dw = new DataWorker();
 
onmessage = function({data}) {
  dw.handleMessage(data);
};
