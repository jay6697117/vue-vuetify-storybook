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
  // VApp,
  VListTileTitle,
  VTextField,
  VSpacer,
  VToolbar,
  VContent,
  VIcon,
  VToolbarSideIcon,
  VContainer,
  VDataTable,
  VChip
} from 'vuetify/lib';

import 'vuetify/src/stylus/app.styl';

import i18n from '../i18n';
import store from '../store';

import ServiceRequests from '../components/ServiceRequests.vue';

Vue.component('v-navigation-drawer', VNavigationDrawer)
Vue.component('v-btn', VBtn)
Vue.component('v-list', VList)
Vue.component('v-layout', VLayout)
Vue.component('v-flex', VFlex)
Vue.component('v-subheader', VSubheader)
Vue.component('v-divider', VDivider)
Vue.component('v-list-tile', VListTile)
Vue.component('v-list-tile-content', VListTileContent)
Vue.component('v-toolbar', VToolbar)
Vue.component('v-content', VContent)
Vue.component('v-container', VContainer)
Vue.component('v-icon', VIcon)
Vue.component('v-list-tile-actio', VListTileAction)
Vue.component('v-list-tile-title', VListTileTitle)
Vue.component('v-text-field', VTextField)
Vue.component('v-data-table', VDataTable)
Vue.component('v-spacer', VSpacer)
Vue.component('v-toolbar-side-icon', VToolbarSideIcon)
Vue.component('v-chip', VChip)

// Vue.component('v-app', VApp)

storiesOf('ServiceRequests', module)
  .addDecorator(() => ({
    template: '<v-app id="blackship-admin"><story/></v-app>'
  }))
  .add('default', () => ({
    components: { ServiceRequests },
    template: `
      <service-requests/>`,
    i18n,
    store
  }))
