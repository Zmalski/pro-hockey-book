<template>
  <div v-if="!isLoading">
    {{ player.fullName }}
    <v-avatar
      color="grey"
      size="150"
      rounded="0"
    >
      <v-img
        cover
        :src="player?.headshot"
      ></v-img>
    </v-avatar>

  </div>
</template>
<script>
export default {
  name: 'Player',
  data: () => ({
    dialog: false,
    player: null,
    loading: true,
  }),
  methods: {
    async fetchPlayer() {
      const { getPlayer } = useNHL() // auto-imported
      this.player = await getPlayer(this.$route.params.id)
    },
  },
  async mounted() {
    await this.fetchPlayer();
    this.loading = false;
  },
  computed: {
    isLoading() {
      return this.player === null;
    },
  },
}
</script>