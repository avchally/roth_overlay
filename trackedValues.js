const memoryjs = require('memoryjs');
const constants = require('./constants');

const getTimestamp = () => {
  const hrTime = process.hrtime();
  return hrTime[0] * 1000 + hrTime[1] / 1000000;
}

const trackedValues = {
  HEALTH: {
    calculate: async (ct) => ({
      value: await ct.readValue(constants.ROTH_OFFSET_HEALTH, memoryjs.INT16)
    }),
    render: (obj) => (
      `HEALTH:    ${obj.value} / 2048 (${Math.ceil(obj.value / 2048 * 100)}%)`
    ),
    initialVals: {
      value: 2048
    }
  },
  MAP: {
    calculate: async (ct) => ({
      value: await ct.readValue(constants.ROTH_OFFSET_MAP, memoryjs.STR)
    }),
    render: (obj) => (
      `MAP:       ${obj.value}`
    ),
    initialVals: {
      value: null
    }
  },
  X_POS: {
    calculate: async (ct) => ({
      value: await ct.readValue(constants.ROTH_OFFSET_X_POS, memoryjs.INT16),
      timestamp: getTimestamp()
    }),
    render: (obj) => (
      `X:         ${obj.value}`
    ),
    initialVals: {
      value: undefined,
      timestamp: getTimestamp()
    },
  },
  Y_POS: {
    calculate: async (ct) => ({
      value: await ct.readValue(constants.ROTH_OFFSET_Y_POS, memoryjs.INT16),
      timestamp: getTimestamp()
    }),
    render: (obj) => (
      `Y:         ${obj.value}`
    ),
    initialVals: {
      value: undefined,
      timestamp: getTimestamp()
    },
  },
  TITLE_SPEED: {
    calculate: async (ct) => ({}),
    render: (obj) => (
      `SPEED VALUES (calculated)`
    ),
    initialVals: {}
  },
  X_SPEED: {
    calculate: async (ct) => {
      const posDelta = Math.abs(ct.currentValues.X_POS.value - ct.previousValues.X_POS.value);
      const timeDelta = ct.currentValues.X_POS.timestamp - ct.previousValues.X_POS.timestamp;
      return {
        value: (posDelta / timeDelta), // units / ms
        timestamp: getTimestamp(),
      }
    },
    render: (obj) => (
      `SPEED_X:   ${obj.value.toPrecision(4)}`
    ),
    initialVals: {
      value: 0,
      timestamp: getTimestamp(),
    }
  },
  Y_SPEED: {
    calculate: async (ct) => {
      const posDelta = Math.abs(ct.currentValues.Y_POS.value - ct.previousValues.Y_POS.value);
      const timeDelta = ct.currentValues.Y_POS.timestamp - ct.previousValues.Y_POS.timestamp;
      return {
        value: (posDelta / timeDelta), // units / ms
        timestamp: getTimestamp(),
      }
    },
    render: (obj) => (
      `SPEED_Y:   ${obj.value.toPrecision(4)}`
    ),
    initialVals: {
      value: 0,
      timestamp: getTimestamp(),
    },
  },
  TOTAL_SPEED: {
    calculate: async (ct) => {
      return {
        value: Math.sqrt(ct.currentValues.X_SPEED.value ** 2 + ct.currentValues.Y_SPEED.value ** 2),
        timestamp: getTimestamp()
      }
    },
    render: (obj) => (
      `SPEED:     ${obj.value.toPrecision(4)}`
    ),
    initialVals: {
      value: 0,
      timestamp: getTimestamp()
    }
  },
  MAX_SPEED: {
    calculate: async (ct) => {
      return {
        value: ct.previousValues.MAX_SPEED.value
          ? Math.max(ct.currentValues.TOTAL_SPEED.value, ct.previousValues.MAX_SPEED.value)
          : 0.00000001,
        timestamp: getTimestamp()
      }
    },
    render: (obj) => (
      `MAX SPEED: ${obj.value.toPrecision(4)}`
    ),
    initialVals: {
      value: 0,
      timestamp: getTimestamp()
    }
  },
  AVG_SPEED: {
    calculate: async (ct) => {
      const queueSize = constants.REFRESH_RATE * 2;
      const queue = ct.previousValues.AVG_SPEED.queue;
      queue.push(Number(ct.currentValues.TOTAL_SPEED.value));
      if (queue.length > queueSize) queue.shift();
      return {
        value: queue.reduce((a, b) => a + b, 0) / queue.length,
        timestamp: getTimestamp(),
        queue
      }
    },
    render: (obj) => (
      `AVG SPEED: ${obj.value.toPrecision(4)}`
    ),
    initialVals: {
      value: 0,
      timestamp: getTimestamp(),
      queue: [0]
    }
  }
};

module.exports = { trackedValues }