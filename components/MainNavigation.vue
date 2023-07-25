<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <nuxt-link to="/" class="nav-item">
            <v-list-item
              prepend-icon="mdi-home"
              title="Home"
              value="home"
            ></v-list-item
          ></nuxt-link>
          <nuxt-link to="/players" class="nav-item">
            <v-list-item
              prepend-icon="mdi-account-multiple"
              title="Players"
              value="players"
            ></v-list-item
          ></nuxt-link>
          <nuxt-link to="/teams" class="nav-item">
            <v-list-item
              prepend-icon="mdi-hockey-sticks"
              title="Teams"
              value="teams"
            ></v-list-item>
          </nuxt-link>
          <nuxt-link to="/stats" class="nav-item">
            <v-list-item
              prepend-icon="mdi-chart-line"
              title="Stats"
              value="stats"
            ></v-list-item>
          </nuxt-link>
          <nuxt-link to="/records" class="nav-item">
            <v-list-item
              prepend-icon="mdi-podium"
              title="Records"
              value="records"
            ></v-list-item>
          </nuxt-link>
        </v-list>
      </v-navigation-drawer>

      <v-main><slot></slot></v-main>
    </v-layout>
  </v-card>
</template>
<script>
export default {};
</script>
<style lang="css">
  .nav-item {
    text-decoration: none;
    color: inherit; /* or any color value you prefer */
  }
</style>
