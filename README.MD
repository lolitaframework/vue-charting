# vue-charting

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/lolitaframework/vue-charting/master/LICENSE)

VueJS component for rendering the [TradingView Chart Widget](https://www.tradingview.com/widget/advanced-chart/) with custom data feed.

## Install
`yarn add vue-charting`
or
`npm install --save vue-charting`

## Usage
### Basic example
```javascript
<template>
  <div class="hello">
    <VueCharting :options="options" />
  </div>
</template>

<script>
import VueCharting from 'vue-charting';
import Datafeed from './datafeed';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    VueCharting,
  },
  data() {
    return {
      options: {
        datafeed: Datafeed
      }
    };
  },
}
</script>
```

```javascript
import default_data from './default_data';
const supportedResolutions = ["1", "3", "5", "15", "30", "60", "120", "240", "D"]

const config = {
    supported_resolutions: supportedResolutions
}; 

export default {
  onReady: cb => {
  console.log('=====onReady running') 
    setTimeout(() => cb(config), 0)
    
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    console.log('====Search Symbols running')
  },
  resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
    // expects a symbolInfo object in response
    console.log('======resolveSymbol running')
    // console.log('resolveSymbol:',{symbolName})
    var split_data = symbolName.split(/[:/]/)
    // console.log({split_data})
    var symbol_stub = {
      name: symbolName,
      description: '',
      type: 'crypto',
      session: '24x7',
      timezone: 'Etc/UTC',
      ticker: symbolName,
      exchange: split_data[0],
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      intraday_multipliers: ['1', '60'],
      supported_resolution:  supportedResolutions,
      volume_precision: 8,
      data_status: 'streaming',
    }
    setTimeout(function() {
      onSymbolResolvedCallback(symbol_stub)
      console.log('Resolving that symbol....', symbol_stub)
    }, 0)
    
    
    // onResolveErrorCallback('Not feeling it today')

  },
  getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
    console.log('=====getBars running')

    onHistoryCallback(default_data, {noData: false})
    onHistoryCallback([], {noData: true})
  },
  subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
    console.log('=====subscribeBars runnning')
  },
  unsubscribeBars: subscriberUID => {
    console.log('=====unsubscribeBars running')
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    //optional
    console.log('=====calculateHistoryDepth running',resolution, resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined)
    // while optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
    return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
  },
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
    console.log('=====getMarks running')
  },
  getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
    console.log('=====getTimeScaleMarks running')
  },
  getServerTime: cb => {
    console.log('=====getServerTime running')
  }
}
```

```javascript
export default [
  {
    "time": 1533478500000,
    "low": 6966,
    "high": 6966.02,
    "open": 6966,
    "close": 6966.01,
    "volume": 3.56
  },
  {
    "time": 1533478560000,
    "low": 6965,
    "high": 6966.01,
    "open": 6966.01,
    "close": 6965,
    "volume": 2.7
  },
  {
    "time": 1533478620000,
    "low": 6950,
    "high": 6965,
    "open": 6965,
    "close": 6950,
    "volume": 3.78
  },
];
```

