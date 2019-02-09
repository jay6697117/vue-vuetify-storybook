<template>
  <div class="package-list v-content">
    <div class="page" style="padding: 24px">
      <div class="tag-H1 headline mb-4">Packages</div>
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
            <td>{{ props.item.packageId }}</td>
            <td class="text-xs-left">{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.customer }}</td>
            <td class="text-xs-left">
              <v-chip
                :color="IsFulfilled(props.item.fulfillmentStatus) ? 'yellow lighten-3' : ''"
              >{{props.item.fulfillmentStatus}}</v-chip>
            </td>
            <td class="text-xs-right">{{ props.item.total }}</td>
          </template>
        </v-data-table>
      </div>
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
      pagination: {},
      headers: [
        { text: 'Package', value: 'packgeId' },
        { text: 'Date', value: 'date' },
        { text: 'Customer', value: 'customer' },
        { text: 'Fulfillment status', value: 'fulfillmentStatus' },
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
          packageId: 'B001853',
          date: 'Sep 3, 7:25 am',
          customer: 'Max Hodges',
          fulfillmentStatus: 'Fulfilled',
          total: '$63.50'
        },
        {
          packageId: 'B198781',
          date: 'Sep 1, 10:10 am',
          customer: 'Charlie Brown',
          fulfillmentStatus: 'Unfulfilled',
          total: '$33.21'
        }
      ]
    }
  }
}
</script>

<style>
</style>
