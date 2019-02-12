<template>
  <div class="customer-list v-content">
    <div class="v-container fluid fill-height" style="padding: 24px">
      <h1 class="headline mb-4">Customers</h1>

      <div class="v-card v-card--flat">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :pagination.sync="pagination"
          :total-items="totalDesserts"
          :rows-per-page-items="[25,50,100]"
          :loading="loading"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <span class="subheading grey--text text--darken-3">
                <strong>{{ props.item.name }}</strong>
              </span>
              &nbsp;
              {{ props.item.city }},&nbsp;{{ props.item.country }}
            </td>
            <td class="text-xs-left">{{ props.item.mailbox }}</td>
            <td class="text-xs-left">
              <!-- <v-chip text-color="white" :color="props.item.planColor">{{props.item.plan}}</v-chip> -->
              <div>{{props.item.plan}}</div>
            </td>
            <td class="text-xs-left">{{ props.item.packages }}</td>
            <td class="text-xs-left">{{ props.item.lastActiveAt }}</td>
            <td class="text-xs-left">{{ props.item.createdAt }}</td>

            <td class="text-xs-right">{{ props.item.spent }}</td>
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
        { text: 'Name', value: 'name' },
        { text: 'Mailbox', value: 'mailbox' },
        { text: 'Plan', value: 'plan' },
        { text: 'Packages', value: 'packages' },
        { text: 'Last seen', value: 'lastActiveAt' },
        { text: 'First seen', value: 'createdAt' },
        // { text: 'Application pending', value: 'applicationPending' },
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
          name: 'Matthew Perry',
          city: 'Tokyo',
          plan: 'PREMIUM',
          country: 'JP',
          mailbox: 'R001853',
          packages: '7 Packages',
          createdAt: '4 months ago',
          lastActiveAt: '2 hours ago',
          spent: '$55.01 spent'
        },
        {
          name: 'Tilda Swinton',
          city: 'London',
          plan: 'STANDARD',
          country: 'GB',
          mailbox: 'R664814',
          packages: '0 Packages',
          createdAt: '3 days ago',
          lastActiveAt: '32 minutes ago',
          spent: '$0.00 spent'
        },
        {
          name: 'Marvin Gay',
          city: 'Kowloon',
          plan: 'BASIC',
          country: 'HK',
          mailbox: 'R313481',
          packages: '1 Packages',
          createdAt: '7 days ago',
          lastActiveAt: 'a day ago',
          spent: '$33.87 spent'
        },
        {
          name: 'Micky Mouse',
          city: 'Orlando',
          plan: 'STANDARD',
          country: 'US',
          mailbox: 'R957846',
          packages: '40 Packages',
          createdAt: '2 years ago',
          lastActiveAt: '2 weeks ago',
          spent: '$124.12 spent'
        },
        {
          name: 'Giles Murray',
          city: 'London',
          plan: 'BASIC',
          country: 'GB',
          mailbox: 'R987541',
          packages: '1 Packages',
          createdAt: '2 weeks ago',
          lastActiveAt: '1 hour ago',
          spent: '$28.42 spent'
        },
        {
          name: 'Mika Tajima',
          city: 'Osaka',
          plan: 'BASIC',
          country: 'JP',
          mailbox: '',
          packages: '0 Packages',
          createdAt: 'a day ago',
          lastActiveAt: '1 hour ago',
          spent: '$0.00 spent'
        },
        {
          name: 'River Phoenix',
          city: 'London',
          plan: 'BASIC',
          country: 'GB',
          mailbox: 'R987541',
          packages: '1 Packages',
          createdAt: '2 weeks ago',
          lastActiveAt: '1 hour ago',
          spent: '$28.42 spent'
        },
        {
          name: 'Liberty Phoenix',
          city: 'Osaka',
          plan: 'BASIC',
          country: 'JP',
          mailbox: '',
          packages: '0 Packages',
          createdAt: 'a day ago',
          lastActiveAt: '1 hour ago',
          spent: '$0.00 spent'
        },
        {
          name: 'Rain Phoenix',
          city: 'Krakow',
          plan: 'BASIC',
          country: 'PL',
          mailbox: 'R212645',
          packages: '1 Packages',
          createdAt: '12 days ago',
          lastActiveAt: '12 days ago',
          spent: '$48.00 spent'
        },
        {
          name: 'Pawel Pawlikowski',
          city: 'Krakow',
          plan: 'STANDARD',
          country: 'PL',
          mailbox: 'R212645',
          packages: '1 Packages',
          createdAt: '12 days ago',
          lastActiveAt: '12 days ago',
          spent: '$48.00 spent'
        }
      ]
    }
  }
}
</script>
