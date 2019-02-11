<template>
  <div class="package-list v-content">
    <div class="v-container fluid fill-height" style="padding: 24px">
      <h1 class="headline mb-4">New Applications</h1>
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
            <td class="text-xs-left">{{ props.item.customerName }}</td>
            <td class="text-xs-left">{{ props.item.createdAt }}</td>
            <td class="text-xs-left">{{ props.item.note }}</td>
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
        { text: 'Customer', value: 'customerName' },
        { text: 'Date', value: 'createdAt' },
        { text: 'Note', value: 'note' }
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
          customerName: 'Summer Phoenix',
          createdAt: '1 week ago',
          note: 'she looks like fun'
        },
        {
          customerName: 'Rain Phoenix',
          createdAt: 'a day ago',
          note:
            'her skin glistening in the neon light coming from the paved court through the slits in the blind, her soot-black lashes matted, her grave gray eyes more vacant than ever'
        },
        {
          customerName: 'Homer Simpson',
          createdAt: '2 hours ago',
          note: 'lord of darkness'
        },
        {
          customerName: 'Libery Phoenix',
          createdAt: '43 minutes ago',
          note: 'she looks like an 80s pop star'
        }
      ]
    }
  }
}
</script>

<style>
</style>
