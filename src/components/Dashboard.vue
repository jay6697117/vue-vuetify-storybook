<template>
  <div class="application">
    <div class="v-container grid-list-md fluid fill-height" style="padding: 24px">
      <h1 class="headline mb-4">Dashboard</h1>

      <v-layout justify-center wrap>
        <v-flex xs12 md4 class="pr-3">
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
                    <div class="title font-weight-bold">2</div>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < applications.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs12 md4 class="pr-3 mb-4">
          <!-- APPLICATIONS PANEL -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <h3 class="pt-3 pl-3 subheading font-weight-bold">Service Requests</h3>
            </v-card-title>
            <v-list>
              <template v-for="(item, index) in serviceRequests">
                <v-list-tile class="py-1" :key="item.type" ripple @click>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.type }}</v-list-tile-title>
                    <v-list-tile-sub-title>Avg time: {{ item.avgTime }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <div class="title font-weight-bold">{{ item.count }}</div>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < applications.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs12 md4 class="pr-3 mb-4">
          <!-- APPLICATIONS PANEL -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <h3 class="pt-3 pl-3 subheading font-weight-bold">Packages</h3>
            </v-card-title>
            <v-list>
              <template v-for="(item, index) in packages">
                <v-list-tile class="py-1" :key="item.type" ripple @click>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.type }}</v-list-tile-title>
                    <v-list-tile-sub-title>Avg time: {{ item.reviewedAt }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <div class="title font-weight-bold">{{ item.count}}</div>
                  </v-list-tile-action>
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
          count: '13',
          chipColor: 'warning',
          createdAt: 'Feb 6, 13:53',
          reviewedAt: 'Feb 7, 13:53'
        }
      ],
      serviceRequests: [
        {
          type: 'Consolidate',
          count: '4',
          avgTime: '7 hours'
        },
        {
          type: 'Take Photos',
          count: '2',
          avgTime: '2 hours'
        },
        {
          type: 'Split Package',
          count: '1',
          avgTime: 'two days'
        }
      ],
      packages: [
        {
          type: 'Storage/Mailbox',
          count: '666',
          avgTime: '17 days'
        },
        {
          type: 'Work in Progress',
          count: '2',
          avgTime: ''
        },
        {
          type: 'Staged',
          count: '44',
          avgTime: ''
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
