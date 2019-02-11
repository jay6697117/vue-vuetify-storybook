<template>
  <div class="package-list v-content">
    <div class="v-container fluid fill-height" style="padding: 24px">
      <h1 class="headline mb-4">Applications</h1>
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

<style>
</style>
