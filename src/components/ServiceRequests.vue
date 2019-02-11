// Service Requests
// Consolidate Packages
// Split Package
// Take photos

<template>
  <div class="package-list v-content">
    <div class="v-container fluid fill-height" style="padding: 24px">
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="headline mb-4">Service Requests</h1>
          <div class="v-card v-card--flat">
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
                <td class="text-xs-left">{{ props.item.request }}</td>
                <td class="text-xs-left">
                  {{ props.item.createdAt }}
                  <div class="grey--text text--darken-2">2 days ago</div>
                </td>
                <td class="text-xs-left">{{ props.item.customerName }}</td>
                <!-- <td class="text-xs-left">{{ props.item.status }}</td> -->
                <td class="text-xs-left">
                  <v-chip :color="(props.item.chipColor)">{{props.item.status}}</v-chip>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {
        sortBy: 'Date'
      },
      headers: [
        { text: 'Request', value: 'request' },
        { text: 'Date', value: 'createdAt' },
        { text: 'Customer', value: 'customerName' },
        { text: 'Status', value: 'status' }
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
          request: 'Consolidate 3 packages',
          createdAt: 'Feb 3, 11:20',
          customerName: 'Golshifteh Farahani',
          status: 'New',
          chipColor: 'yellow lighten-3'
        },
        {
          request: 'Split package B648751',
          createdAt: 'Feb 5, 8:13',
          customerName: 'Hirohi Sugimoto',
          status: 'New',
          chipColor: 'yellow lighten-3'
        },
        {
          request: 'Take photos of package B461514',
          createdAt: 'Feb 7, 23:56',
          customerName: 'Thavisa Watanasirisuk',
          status: 'In progress',
          chipColor: 'orange lighten-3'
        },
        {
          request: 'Consolidate 3 packages',
          createdAt: 'Feb 7, 13:05',
          customerName: 'Ryo',
          status: 'New',
          chipColor: 'yellow lighten-3'
        },
        {
          request: 'Split package B345144',
          createdAt: 'Feb 1, 8:13',
          customerName: 'Shinya Tsukamoto',
          status: 'In progress',
          chipColor: 'orange lighten-3'
        },
        {
          request: 'Take photos of package B331478',
          createdAt: 'Feb 3, 17:24',
          customerName: 'David Cronenberg',
          status: 'New',
          chipColor: 'yellow lighten-3'
        }
      ]
    }
  }
}
</script>

<style>
</style>
