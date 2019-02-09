import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Vue from 'vue';
import {
  VNavigationDrawer,
  VBtn,
  VList,
  VLayout,
  VFlex,
  VSubheader,
  VDivider,
  VListTile,
  VListTileContent,
  VListTileAction,
  VListTileTitle,
  VTextField,
  VSpacer,
  VToolBar,
  VContent,
  VIcon,
  VContainer
} from 'vuetify/lib';

import 'vuetify/src/stylus/app.styl';

import i18n from '../i18n';
import store from '../store';

import Layout from '../components/Layout.vue';

Vue.component('v-navigation-drawer', VNavigationDrawer)
Vue.component('v-btn', VBtn)
Vue.component('v-list', VList)
Vue.component('v-layout', VLayout)
Vue.component('v-flex', VFlex)
Vue.component('v-subheader', VSubheader)
Vue.component('v-divider', VDivider)
Vue.component('v-list-tile', VListTile)
Vue.component('v-list-tile-content', VListTileContent)
Vue.component('v-tool-bar', VToolBar)
Vue.component('v-contents', VContent)
Vue.component('v-container', VContainer)
Vue.component('v-icon', VIcon)
Vue.component('v-list-tile-actio', VListTileAction)
Vue.component('v-list-tile-title', VListTileTitle)
Vue.component('v-text-field', VTextField)
Vue.component('v-spacer', VSpacer)

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
