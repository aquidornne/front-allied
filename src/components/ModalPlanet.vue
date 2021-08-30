<template>
  <div>
    <b-modal
      hide-header
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      id="modalPlanet"
      title="Planeta"
      v-model="show"
    >
      <h2>Dados do planeta do personagem: {{ people.name }}</h2>

      <p class="my-4"><b>Nome:</b> {{ planet.name }}</p>
      <p class="my-4">
        <b>Período de rotação:</b> {{ planet.rotation_period }}
      </p>
      <p class="my-4"><b>Período orbital:</b> {{ planet.orbital_period }}</p>
      <p class="my-4"><b>Diâmetro:</b> {{ planet.diameter }}</p>
      <p class="my-4"><b>Clima:</b> {{ planet.climate }}</p>
      <p class="my-4"><b>Gravidade:</b> {{ planet.gravity }}</p>
      <p class="my-4"><b>Terreno:</b> {{ planet.terrain }}</p>
      <p class="my-4"><b>Superfície:</b> {{ planet.surface_water }}</p>
      <p class="my-4"><b>População:</b> {{ planet.population }}</p>

      <b-button variant="dark" @click="$emit('resetModalPlanet')">Ok</b-button>
    </b-modal>
  </div>
</template>

<script>
import planetApi from "@/api/planet.api.js";

export default {
  name: "ModalPlanet",
  props: {
    people: {},
  },
  data() {
    return {
      planet: {
        name: "",
        rotation_period: "",
        orbital_period: "",
        diameter: "",
        climate: "",
        gravity: "",
        terrain: "",
        surface_water: "",
        population: "",
      },
    };
  },
  async mounted() {
    await this.getListByPage();
  },
  computed: {
    show: {
      get() {
        return !!this.$attrs.value;
      },
      set(value) {
        this.$attrs.value = value.value;
        this.$emit("input", value);
      },
    },
  },
  methods: {
    /**
     * Resgate os dados do planeta da api.
     */
    async getListByPage() {
      let planetID = this.people.homeworld;

      planetID = planetID.replace("https://swapi.dev/api/planets/", "");
      planetID = planetID.replace("/", "");

      await planetApi.getPlanetByID(planetID).then((res) => {
        this.planet = res.data;
      });
    },
  },
};
</script>