<template>
  <div>
    Hello teams!
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="teamData?.teams?.length === 0">No teams found.</div>
    <div v-else>Found {{ teamData?.teams?.length }} teams.
      <div v-for="team in teamData.teams" :key="team.id">
        {{ team.name }}
      </div>
    </div>

    <div>The end!</div>
  </div>
</template>
<script>
export default {
  name: 'Teams',
  data: () => ({
    isLoading: true,
    teamData: [],
  }),
  methods: {
    async fetchTeams() {
      const { data } = await useFetch('/api/nhl/teams')
      return data
    },
  },
  async mounted() {
    this.teamData = await this.fetchTeams()
    this.isLoading = false
  },
}
</script>
<style lang="">
    
</style>