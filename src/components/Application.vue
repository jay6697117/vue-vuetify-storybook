<template>
  <div class="application">
    <div class="v-container grid-list-md fluid fill-height" style="padding: 24px">
      <h1 class="headline mb-4">Application - Homer Simpson</h1>

      <v-layout justify-center wrap>
        <v-flex xs8>
          <v-card class="pa-3 mb-4">
            <v-card-title primary-title>
              <div class="title mb-3 font-weight-bold">Identity</div>
            </v-card-title>
            <v-layout row wrap>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="Homer" label="First" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="Simpson" label="Last" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="+1-512-555-1853" label="Phone" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="Nuclear Scientist" label="Occupation" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="Dec 8, 1972 - Age 45" label="Date of Birth" readonly></v-text-field>
              </v-flex>
            </v-layout>
            <v-img src="https://picsum.photos/300/200?image=22" aspect-ratio="1.7"></v-img>
            <v-divider class="my-3"/>
            <v-checkbox
              v-model="checkIdMatch"
              color="success"
              label="Submitted identity information matches document."
            ></v-checkbox>
            <v-checkbox
              v-model="checkIdDate"
              color="success"
              label="Identity document is not expired."
            ></v-checkbox>
          </v-card>
          <v-card class="pa-3 mb-3">
            <v-card-title primary-title>
              <div class="title mb-3 font-weight-bold">Address</div>
            </v-card-title>
            <v-layout row wrap>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="1853 GUN POINT" label="Address 1" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="#357" label="Address 2" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="SAN DIEGO" label="City" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="CA" label="Region" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="United States" label="Country" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 px-3>
                <v-text-field value="91789" label="Postal code" readonly></v-text-field>
              </v-flex>
            </v-layout>

            <v-card-text></v-card-text>
            <v-flex xs12 md7 pa-3>
              <v-card color="yellow lighten-4" class="pa-3">
                <div class="title">
                  <div class="pb-1">MATTHEW PERRY</div>
                  <div class="pb-1">1853 GUN POINT #357</div>
                  <div class="pb-1">SAN DIEGO, CA 91789</div>
                  <div class="pb-1">UNITED STATES</div>
                </div>
              </v-card>
            </v-flex>
            <div class="py-3">
              <v-img src="https://picsum.photos/300/200?image=56" aspect-ratio="1.7"></v-img>
            </div>
            <v-divider class="my-3"/>
            <v-checkbox
              v-model="checkAddressMatch"
              color="success"
              label="Submitted address information matches document."
            ></v-checkbox>
            <v-checkbox
              color="success"
              v-model="checkAddressDate"
              label="Address document is less than 90 days old."
            ></v-checkbox>
          </v-card>
        </v-flex>

        <v-flex xs4 pl-4>
          <v-alert v-show="true" type="warning" :value="true">New</v-alert>
          <v-card class="pa-3 mb-4">
            <v-card-title primary-title>
              <div class="subheading mb-2 font-weight-bold">Information</div>
              <div>Feb 6, 13:53</div>
              <v-divider class="my-3"/>
              <div class="mb-3 grey--text text--darken-2 font-weight-bold">SOCIAL PROFILES</div>

              <!-- get custom icons in here for twitter and facebook -->
              <v-icon>face</v-icon>
              <v-icon>favorite_border</v-icon>
              <div>(facebook, twitter icons missing)</div>
              <a href="#" style="text-decoration=none;">https://www.linkedin.com/in/grace-yuri...</a>
              <v-divider class="my-3"/>
              <div class="text-xs-right">
                <v-btn :disabled="!isVerified" color="success">Approve</v-btn>
              </div>
              <div class="text-xs-right">
                <v-btn color="warning">Soft reject</v-btn>
              </div>
              <div class="text-xs-right">
                <v-btn color="error">Hard reject</v-btn>
              </div>
            </v-card-title>
          </v-card>
          <!-- APPLICATIONS PANEL -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <h3 class="pt-3 pl-3 subheading font-weight-bold">All Applications</h3>
            </v-card-title>
            <v-list>
              <template v-for="(item, index) in applications">
                <v-list-tile class="py-1" :key="item.createdAt" ripple @click>
                  <v-list-tile-action>
                    <v-icon color="blue" v-show="(item.chipText === 'New')">bookmark</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.createdAt }}</v-list-tile-title>
                    <v-list-tile-sub-title>Reviewed: {{ item.reviewedAt }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-avatar>
                    <v-chip :color="(item.chipColor)" text-color="white">{{item.chipText}}</v-chip>
                  </v-list-tile-avatar>
                </v-list-tile>
                <v-divider v-if="index + 1 < applications.length" :key="index"></v-divider>
              </template>
            </v-list>
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
      checkIdMatch: false,
      checkIdDate: false,
      checkAddressMatch: false,
      checkAddressDate: false,

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
      totalDesserts: 0
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
  computed: {
    isVerified: function () {
      return (
        this.checkAddressMatch &&
        this.checkAddressDate &&
        this.checkIdMatch &&
        this.checkIdDate
      )
    }
  },
  methods: {
    IsFulfilled: function (fulfillmentStatus) {
      return fulfillmentStatus === 'Fulfilled';
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
    }
  }
}
</script>

<style>
</style>
