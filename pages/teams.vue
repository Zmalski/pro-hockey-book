<template>
  <div>
    Hello teams!
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="teams?.length === 0">No teams found.</div>
    <div v-else>Found {{ teams?.length }} teams.
      <div v-for="team in teams" :key="team.id">
        {{ team.name }}
      </div>
    </div>

    <div>The end!</div>
    <v-btn @click="triggerAddUser">Add User</v-btn>
    <v-btn @click="fetchTeams">Fetch Teams</v-btn>
  </div>
</template>
<script>
export default {
  name: 'Teams',
  data: () => ({
    teams: [],
  }),
  methods: {
    async fetchTeams() {
      const { getTeams } = useNHL() // auto-imported
      this.teams = await getTeams()
    },
    async triggerAddUser() {
      const { addUser } = useFirestore() // auto-imported
      await addUser('Z', 'Y', 2000)
    },
  },
  computed: {
    isLoading() {
      return this.teams.length === 0;
    }
  },
}
</script>
<style lang="">
    
</style>