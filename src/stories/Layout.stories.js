import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Vue from 'vue';
import { VTextField, VBtn, VSelect } from 'vuetify/lib';

import 'vuetify/src/stylus/app.styl';

import i18n from '../i18n';
import store from '../store';

import Layout from '../components/Layout.vue';

storiesOf('Layout', module)
  .addDecorator(() => ({
    template: '<v-app id="blackship-admin"><story/></v-app>'
  }))
  .add('default', () => ({
    components: { Layout },
    template: `
      <layout/>`,
    i18n,
    store
  }))
