const term = require('terminal-kit').terminal;
const memoryjs = require('memoryjs');
const { trackedValues } = require('./trackedValues');
const constants = require('./constants');

class controller {
  constructor(process, tracked={}) {
    this.process = process;
    this.tracked = tracked;
    this.processHandle = null;
    this.previousValues = {};
    this.currentValues = {};
  }
  
  async init() {
    for (const key of Object.keys(this.tracked)) {
      this.previousValues[key] = this.tracked[key].initialVals;
      term(`${key} intialized\n`);
      term(`${JSON.stringify(this.previousValues)}\n`);
    }
    this.processObject = memoryjs.openProcess(this.process);
    this.processHandle = this.processObject.handle;
    this.basePointer = Number(await memoryjs.readMemory(this.processHandle, constants.BASE_ADDRESS, memoryjs.PTR));
  }

  async readValue(offset, type) {
    return await memoryjs.readMemory(this.processHandle, this.basePointer + offset, type);
  }

  async update() {
    const keys = Object.keys(this.tracked);
    for (const key of keys) {
      this.previousValues[key] = this.currentValues[key] ? { ...this.currentValues[key] } : this.previousValues[key];
      this.currentValues[key] = await this.tracked[key].calculate(this);
    }
  }

  render() {
    console.clear();
    term.hideCursor();
    term(`REALMS OF THE HAUNTING KEY VALUES\n`);
    for (const key of Object.keys(this.tracked)) {
      term(`${this.tracked[key].render(this.currentValues[key])}\n`);
    }
  }
}

const mjsProcess = 'DOSBox.exe';
const ct = new controller(mjsProcess, trackedValues);
const mainLoop = async () => {
  setTimeout(mainLoop, 1000 / constants.REFRESH_RATE);
  await ct.update();
  ct.render();
}
ct.init().then(mainLoop);
