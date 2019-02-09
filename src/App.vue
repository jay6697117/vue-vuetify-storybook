<template>
  <v-app id="blackship-admin">
    <v-navigation-drawer v-model="drawer" fixed clipped class app>
      <v-list dense class>
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>Edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
          <v-list-tile v-else :key="i" @click>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="deep-purple accent-1" app absolute clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">
        Blackship&nbsp;
        <span class="font-weight-light">Admin</span>
      </span>
      <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" :href="source" icon large target="_blank">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn
                slot="activator"
                icon
                large
                href="https://codepen.io/johnjleider/pen/jZQNbd"
                target="_blank"
              >
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'dashboard', text: 'Dashboard' },
      { icon: 'view_comfy', text: 'Packages' },
      { icon: 'person', text: 'Customers' },
      // { icon: 'delete', text: 'Shipments' },
      { icon: 'check_circle', text: 'Verifications' },
      { icon: 'move_to_inbox', text: 'Requests' },
      { icon: 'insert_chart', text: 'Analytics' },
      { divider: true },
      { icon: 'person_add', text: 'Staff' }

      // { icon: 'chat_bubble', text: 'Trash' },
      // { icon: 'help', text: 'Help' },
      // { divider: true },
      // { heading: 'Labels' },
      // { icon: 'add', text: 'Create new label' }
    ]
  }),
  props: {
    source: String
  }
}
</script>

<style lang="stylus">
#blackship-admin {
  .v-navigation-drawer__border {
    display: none;
  }
}
</style>
