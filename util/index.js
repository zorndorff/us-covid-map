#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const {getAbbreviation} = require('./lib');
const keyRegex = new RegExp(/\s|,/gi);

class Record {
  constructor(out){
    this.groupKey = 'Date';
    this.out = out;
    this.results = [];
  }
  static getCountyName(state, county) {
    return `${county}${getAbbreviation(state)}`.replace(keyRegex, '').toLowerCase();
  }
  static initData(date) {
    return {
      infections: [],
      deaths: [],
      date,
    }
  }
  setHeadings(headings) {
    this.headingMap = headings;
    this.gotHeadings = true;
  }
  parseLine(line) {
    let data = {};
    this.headingMap.forEach((key, index) => {
      data[key] = line[index];
    });
    return data;
  }
  in(line){
    const parsed = this.parseLine(line);
    const {state, county} = parsed;

    parsed.countyName = Record.getCountyName(state, county);  
    this.results.push(parsed);
  }
  dumpData(){
    this.out.write(JSON.stringify(this.results, null, 2));
  }
}

const program = require('yargs')
.command('import', 'Format us-counties.csv into map useable data', {
  file: {
    alias: 'f',
    default: '-',
    description: 'US Counties File'
  },
  output: {
    alias: 'o',
    default: '-',
    description: 'Output file'
  },
}, importCounties)
.demandCommand(1)
.help()
.argv;

function mapHeadings(headings) {
  const mapped = {};
  const i = 0;
  for (const heading in headings){
    mapped[i] = heading;
    i++;
  }
  return mapped;
}

function writeOut() {

}

writeOut.prototype.write = (line) => {
  console.log(line.replace('\n', ''));
}

async function importCounties({file, output}){
  const fileStream = (file === "-")? process.stdin : fs.createReadStream(path.join(__dirname, file));
  const outStream = (output === "-") ? new writeOut() : fs.createWriteStream(path.join(__dirname, output));
  const record = new Record(outStream);

  const rl = readline.createInterface({
    input: fileStream,
    terminal: false
  });
  debugger;
  rl.on('close', function() {
    record.dumpData();
  });
  debugger;
  for await (const line of rl) {
    const data = line.split(',');
    if(!record.gotHeadings) {
      record.setHeadings(data);
      continue;
    }
    record.in(data);
  }
  debugger;
}