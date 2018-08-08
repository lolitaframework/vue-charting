(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueCharting = {})));
}(this, (function (exports) { 'use strict';

  (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();




  var SCRIPT_ID = 'charting-widget-script';
  var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{style:({ height:  _vm.height + 'px' }),attrs:{"id":_vm.preparedOptions.container_id}})},staticRenderFns: [],
    name: 'VueCharting',
    computed: {
      preparedOptions: function preparedOptions() {
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
      scriptUrl: function scriptUrl() {
        return location.href + this.preparedOptions.library_path + 'charting_library.min.js';
      },
    },
    props: {
      options: Object,
      height: {
        default: 600,
        type: Number,
      }
    },
    methods: {
      canUseDOM: function canUseDOM() {
        return typeof window !== 'undefined' && window.document && window.document.createElement;
      },
      getScriptElement: function getScriptElement() {
        return document.getElementById(SCRIPT_ID);
      },
      updateOnloadListener: function updateOnloadListener(onload) {
        var script = this.getScriptElement();
        var oldOnload = script.onload;
        return script.onload = function () {
          oldOnload();
          onload();
        };
      },
      scriptExists: function scriptExists() {
        return this.getScriptElement() !== null;
      },
      appendScript: function appendScript(onload) {
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
        var script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.type = 'text/javascript';
        script.async = true;
        script.src = this.scriptUrl;
        script.onload = onload;
        document.getElementsByTagName('head')[0].appendChild(script);
      },
      initWidget: function initWidget() {
        var this$1 = this;

        var widget = window.tvWidget = new window.TradingView.widget(this.preparedOptions);

        widget.onChartReady(
          function () {
            if (typeof this$1.preparedOptions.onReady === 'function') {
              this$1.preparedOptions.onReady(this$1);
            }
          }
        );
      },
    },
    mounted: function mounted() {
      this.appendScript(this.initWidget);
    }
  }

  // Import vue component

  // install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('VueCharting', component);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // To auto-install when vue is found
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  exports.install = install;
  exports.default = component;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
