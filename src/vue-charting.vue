<template>
  <div :id="preparedOptions.container_id" :style="{ height:  height }"></div>
</template>

<script>
const SCRIPT_ID = 'charting-widget-script';
export default {
  name: 'VueCharting',
  computed: {
    preparedOptions() {
      return Object.assign(
        {
          container_id: 'vue-charting-library',
          symbol: 'Coinbase:BTC/USD',
          interval: '15',
          library_path: '/charting_library/',
          locale: 'en',
          disabled_features: ['use_localstorage_for_settings'],
          enabled_features: ['study_templates'],
          charts_storage_url: 'https://saveload.tradingview.com',
          charts_storage_api_version: '1.1',
          client_id: 'tradingview.com',
          user_id: 'public_user_id',
          fullscreen: false,
          autosize: true,
          studies_overrides: {},
          onReady: null
        },
        this.options
      );
    },
    scriptUrl() {
      return location.origin + this.preparedOptions.library_path + 'charting_library.min.js';
    },
  },
  props: {
    options: Object,
    height: {
      default: '600px',
    }
  },
  methods: {
    canUseDOM() {
      return typeof window !== 'undefined' && window.document && window.document.createElement;
    },
    getScriptElement() {
      return document.getElementById(SCRIPT_ID);
    },
    updateOnloadListener(onload) {
      const script = this.getScriptElement();
      const oldOnload = script.onload;
      return script.onload = () => {
        oldOnload();
        onload();
      };
    },
    scriptExists() {
      return this.getScriptElement() !== null;
    },
    appendScript(onload) {
      if (!this.canUseDOM()) {
        onload();
        return;
      }

      if (this.scriptExists()) {
        if (typeof TradingView === 'undefined') {
          this.updateOnloadListener(onload);
          return;
        }
        onload();
        return;
      }
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'text/javascript';
      script.async = true;
      script.src = this.scriptUrl;
      script.onload = onload;
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    initWidget() {
      const widget = window.tvWidget = new window.TradingView.widget(this.preparedOptions);

      widget.onChartReady(
        () => {
          if (typeof this.preparedOptions.onReady === 'function') {
            this.preparedOptions.onReady(this);
          }
        }
      );
    },
  },
  mounted() {
    this.appendScript(this.initWidget);
  }
}
</script>
