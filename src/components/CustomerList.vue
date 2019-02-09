<template>
  <div class="customer-list">
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
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.city }}</td>
        <td class="text-xs-left">{{ props.item.mailbox }}</td>
        <td class="text-xs-right">{{ props.item.packages }}</td>
        <td class="text-xs-right">{{ props.item.spent }}</td>
      </template>
    </v-data-table>
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
        { text: 'Name', value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'Mailbox', value: 'mailbox' },
        { text: 'Packages', value: 'packages' },
        { text: 'Spent', value: 'spent' }
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
          name: 'Max Hodges',
          city: 'Tokyo, JP',
          mailbox: 'R001853',
          packages: '7 Packages',
          spent: '$55 spent'
        },
        {
          name: 'Tilda Swinton',
          city: 'London, GB',
          mailbox: 'R777777',
          packages: '0 Packages',
          spent: '$0 spent'
        },
        {
          name: 'Marvin Gay',
          city: 'Kowloon, HK',
          mailbox: 'R313481',
          packages: '1 Packages',
          spent: '$33 spent'
        },
        {
          name: 'Micky Mouse',
          city: 'Orlando, US',
          mailbox: 'R957846',
          packages: '40 Packages',
          spent: '$124 spent'
        },
        {
          name: 'Giles Murray',
          city: 'London, GB',
          mailbox: 'R987541',
          packages: '1 Packages',
          spent: '$28 spent'
        },
        {
          name: 'Mika Tajima',
          city: 'Osaka, JP',
          mailbox: 'R197212',
          packages: '3 Packages',
          spent: '$69 spent'
        },
        {
          name: 'Pawel Pawlikowski',
          city: 'Krakow, PL',
          mailbox: 'R212645',
          packages: '1 Packages',
          spent: '$48 spent'
        }
      ]
    }
  }
}
</script>
