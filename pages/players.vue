<template>
  <div>
    <v-card class="pa-8 d-flex justify-center flex-wrap">
      <v-responsive max-width="550">
        <v-img
          class="mx-auto mt-12 mb-16"
          max-height="140"
          max-width="240"
          src="https://vuetifyjs.b-cdn.net/docs/images/logos/vuetify-logo-dark-text.svg"
        ></v-img>

        <v-autocomplete
          :items="playerItems"
          :loading="loading"
          v-model="selectedPlayer"
          v-model:search="search"
          class="flex-full-width"
          density="comfortable"
          hide-no-data
          hide-details
          return-object
          menu-icon=""
          placeholder="Search Players"
          prepend-inner-icon="mdi-magnify"
          rounded
          theme="light"
          variant="solo"
        >

          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :prepend-avatar="item?.raw?.prependAvatar"
              :value="item?.raw?.value"
              :title="item?.raw?.title"
              :subtitle="item?.raw?.subtitle"
            ></v-list-item>
          </template>
        </v-autocomplete>
      </v-responsive>
    </v-card>
    <NuxtPage />
  </div>
</template>
<script>
export default {
  name: 'Players',
  data: () => ({
    dialog: false,
    players: [],
    search: null,
    loading: false,
    selectedPlayer: null,
  }),
  methods: {
    async fetchPlayers(searchTerm) {
      const { getPlayers } = useNHL()
      if (searchTerm) {
        return await getPlayers(searchTerm)
      } else {
        return await getPlayers()
      }
    },
    async triggerPopulatePlayers() {
      const { populatePlayers } = useFirestore()
      await populatePlayers(this.players)
    },
    async triggerPopulateTeams() {
      const { populateTeams } = useFirestore()
      const { getTeams } = useNHL()
      const teams = await getTeams()
      await populateTeams(teams)
    },
    async querySelections(v) {
      this.loading = true;
      this.players = await this.fetchPlayers(v);
      this.loading = false;
    },
  },
  computed: {
    playerItems() {
      if (!this.players) return []
      return this.players.map(player => {
        return {
          title: player.fullName,
          value: player.id,
          subtitle: `${player?.primaryPosition?.abbreviation} - ${player?.currentTeam?.name}`,
          prependAvatar: player?.headshot,
        }
      })
    }
  },
  watch: {
    selectedPlayer(player) {
      // Push to router if player is not null
      if (player) {
        this.$router.push(`/players/${player.value}`)
      }
    },
    search(val) {
      val && dthis.querySelections(val)
    }
  }
}
</script>
