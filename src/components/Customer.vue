<template>
  <div class="customer">
    <div class="v-container grid-list-md fluid fill-height" style="padding: 24px">
      <h1 class="headline mb-4">Matthew Perry</h1>

      <v-layout justify-center wrap>
        <v-flex xs8>
          <v-alert v-show="disabled" :value="true" type="error">Account disabled</v-alert>
          <v-alert :value="true" type="warning">Application awaiting review</v-alert>

          <v-card class="pa-3 mb-3">
            <v-layout row justify-space-between>
              <v-flex>
                <v-card-title primary-title>
                  <div>
                    <h2 class="title font-weight-medium">Matthew Perry</h2>
                    <div class="subheading">M185300</div>
                    <div class="body-2 grey--text text--darken-2">San Diego, US</div>
                    <div class="body-2 grey--text text--darken-2">Customer for 9 months</div>
                  </div>
                </v-card-title>
              </v-flex>
              <div></div>

              <v-flex text-xs-right>
                <div class="mr-2 pr-1">
                  <v-chip class color="success" text-color="white">Verified
                    <v-icon right>check_circle</v-icon>
                  </v-chip>
                </div>
              </v-flex>
            </v-layout>

            <v-textarea
              name="customerNote"
              class="py-3"
              rows="1"
              box
              background-color="grey lighten-5"
              grey-lighten-1
              label="Customer note"
              hint="Add a note"
              auto-grow
              value="Night City was like a deranged experiment in social Darwinism, designed by a bored researcher who kept one thumb permanently on the fast-forward button."
            ></v-textarea>

            <!-- customer stats block -->
            <v-card-actions>
              <v-layout row wrap class="subheading text-xs-center">
                <v-flex xs4>
                  <div class="grey--text text--darken-1">Last package</div>
                  <div class="py-1 font-weight-bold">3 days ago</div>
                </v-flex>
                <v-flex xs4>
                  <div class="grey--text text--darken-1">Packages received</div>
                  <div class="py-1 font-weight-bold">3</div>
                </v-flex>

                <v-flex xs4>
                  <div class="grey--text text--darken-1">Lifetime spent</div>
                  <div class="py-1 font-weight-bold">$143.33</div>
                  <div class="grey--text text--darken-1">2 shipments</div>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>

          <v-data-table
            :headers="headers"
            :items="desserts"
            :pagination.sync="pagination"
            :total-items="totalDesserts"
            :rows-per-page-items="[10,25,50, 100]"
            :loading="loading"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.package }}</td>
              <td class="text-xs-left">{{ props.item.receivedAt }}</td>
              <td class="text-xs-left">
                {{ props.item.sizeLength }}
                <span class="caption">x</span>
                {{ props.item.sizeWidth }}
                <span class="caption">x</span>
                {{ props.item.sizeHeight }} cm
              </td>
              <td class="text-xs-left">{{ props.item.weightGrams }}</td>
              <td class="text-xs-left">{{ props.item.location }}</td>
              <td class="text-xs-left">
                <v-chip
                  :color="IsFulfilled(props.item.status) ? '' : 'yellow lighten-3'"
                >{{props.item.status}}</v-chip>
              </td>
              <td class="text-xs-right">{{ props.item.total }}</td>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex pl-4 xs4>
          <!-- CONTACT PANEL -->
          <v-card class="pa-3 mb-4">
            <v-card-title primary-title>
              <div class="subheading mb-2 font-weight-bold">Contact</div>
              <a
                href="mailto:matthew.perry@gmai.com"
                style="text-decoration: none;"
              >matthew.perry@gmail.com</a>
              <div>+1-512-555-1853</div>
            </v-card-title>
            <v-card-text>
              <v-divider class="my-3"/>
              <div class="address">
                <div class="mb-3 grey--text text--darken-2 font-weight-bold">PRIMARY ADDRESS</div>
                <div>MATTHEW PERRY</div>
                <div>1853 GUN POINT #357</div>
                <div>SAN DIEGO, CA 91789</div>
                <div>UNITED STATES</div>
                <div class="mt-3">
                  <a
                    href="#"
                    style="text-decoration: none;"
                    class="text-xs-right"
                  >View all addresses</a>
                </div>
              </div>
              <v-divider class="my-3"/>
              <!-- get custom icons in here for twitter and facebook -->
              <v-icon>face</v-icon>
              <v-icon>favorite_border</v-icon>
              <div>(facebook, twitter icons missing)</div>
            </v-card-text>
          </v-card>

          <!-- TAGS PANEL -->
          <v-card class="pa-3 mb-4" color="grey lighten-4">
            <v-card-title primary-title>
              <h3 class="subheading mb-3 font-weight-bold">Tags</h3>
            </v-card-title>
            <v-combobox v-model="chips" :items="items" label="Add tags" chips solo multiple>
              <template slot="selection" slot-scope="data">
                <v-chip :selected="data.selected" close @input="remove(data.item)">
                  {{ data.item }}
                  &nbsp;
                </v-chip>
              </template>
            </v-combobox>
          </v-card>

          <!-- APPLICATIONS PANEL -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <h3 class="pt-3 pl-3 subheading font-weight-bold">Applications</h3>
            </v-card-title>
            <v-list>
              <template v-for="(item, index) in applications">
                <v-list-tile class="py-1" :key="item.createdAt" ripple @click>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.createdAt }}</v-list-tile-title>
                    <v-list-tile-sub-title>Reviewed: {{ item.reviewedAt }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-chip :color="(item.chipColor)" text-color="white">{{item.chipText}}</v-chip>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < applications.length" :key="index"></v-divider>
              </template>
            </v-list>
            <v-divider/>
            <div class="pa-3">
              <div class="mb-3 grey--text text--darken-2 font-weight-bold">ACCOUNT</div>
              <v-switch
                v-model="disabled"
                label="Disabled"
                color="error"
                value="banned"
                hide-details
              ></v-switch>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      applications: [
        {
          chipText: 'New',
          chipColor: 'warning',
          createdAt: 'Feb 6, 13:53',
          reviewedAt: 'Feb 7, 13:53'
        },
        {
          chipText: 'Approved',
          chipColor: 'success',
          createdAt: 'Jan 3, 13:53',
          reviewedAt: 'Jan 12, 13:53'
        },
        {
          chipText: 'Soft rejected',
          chipColor: 'grey lighten-1',
          createdAt: 'Dec 25, 2018',
          reviewedAt: 'Dec 25, 2018'
        },
        {
          chipText: 'Hard rejected',
          chipColor: 'grey',
          createdAt: 'Dec 20, 2018',
          reviewedAt: 'Dec 21, 2018'
        }
      ],
      totalDesserts: 0,
      desserts: [],
      chips: ['influencer'],
      items: ['bad review', 'PITA', 'whale'],
      loading: true,
      pagination: {
        sortBy: 'Date'
      },
      headers: [
        { text: 'Package', value: 'package' },
        { text: 'Date', value: 'receivedAt' },

        { text: 'Size', value: 'size' },

        { text: 'Weight', value: 'weightGrams' },
        { text: 'Location', value: 'location' },

        { text: 'Status', value: 'status' },
        { text: 'Total', value: 'total' }
      ]
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi().then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
        })
      },
      deep: true
    }
  },
  mounted () {
    this.getDataFromApi().then(data => {
      this.desserts = data.items
      this.totalDesserts = data.total
    })
  },
  methods: {
    IsFulfilled: function (fulfillmentStatus) {
      return fulfillmentStatus === 'Fulfilled';
    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    getDataFromApi () {
      this.loading = true
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination

        let items = this.getDesserts()
        const total = items.length

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy]
            const sortB = b[sortBy]

            if (descending) {
              if (sortA < sortB) return 1
              if (sortA > sortB) return -1
              return 0
            } else {
              if (sortA < sortB) return -1
              if (sortA > sortB) return 1
              return 0
            }
          })
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }

        setTimeout(() => {
          this.loading = false
          resolve({
            items,
            total
          })
        }, 1000)
      })
    },
    getDesserts () {
      return [
        {
          package: 'B648751',
          receivedAt: 'Sept 3, 11:20',
          sizeLength: 20,
          sizeWidth: 20,
          sizeHeight: 25,
          weightGrams: '291 grams',
          status: 'Mailbox',
          total: '',
          location: 'BC3A'
        },
        {
          package: 'B648763',
          receivedAt: 'Sept 3, 11:43',
          sizeLength: 20,
          sizeWidth: 30,
          sizeHeight: 35,
          weightGrams: '430 grams',
          status: 'Mailbox',
          total: '',
          location: 'BD2B'
        },
        {
          package: 'B558467',
          receivedAt: 'Dec 22, 2018',
          sizeLength: 20,
          sizeWidth: 20,
          sizeHeight: 35,
          weightGrams: '1,430 grams',
          status: 'Fulfilled',
          total: '$123.45',
          location: ''
        }
      ]
    }
  }
}
</script>
