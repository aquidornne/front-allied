<template>
  <div>
    <h1>Personagens Star Wars</h1>

    <b-input-group size="sm" class="mb-2">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input
        type="search"
        placeholder="Pesquisa por nome"
        @keyup="search"
        @keydown="search"
      ></b-form-input>
    </b-input-group>

    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Ações</b-th>
          <b-th>Nome</b-th>
          <b-th>Altura</b-th>
          <b-th>Massa</b-th>
          <b-th>Cor do cabelo</b-th>
          <b-th>Cor de pele</b-th>
          <b-th>Cor dos olhos</b-th>
          <b-th>Ano de nascimento</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="item in listFinal" :key="item.name">
          <b-td>
            <b-button variant="dark" @click="openModalPlanet(item)"
              >Ver planeta</b-button
            >
          </b-td>
          <b-td> {{ item.name }} </b-td>
          <b-td> {{ item.height }} </b-td>
          <b-td> {{ item.mass }} </b-td>
          <b-td> {{ item.hair_color }} </b-td>
          <b-td> {{ item.skin_color }} </b-td>
          <b-td> {{ item.eye_color }} </b-td>
          <b-td> {{ item.birth_year }} </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <p v-if="list.length === 0">Nenhum personagem encontrado.</p>

    <modalPlanet
      v-if="pleopleSelected !== null"
      v-model="showModalPlanet"
      :people="pleopleSelected"
      v-on:resetModalPlanet="resetModalPlanet"
    ></modalPlanet>
  </div>
</template>

<script>
import peopleApi from "@/api/people.api.js";
import modalPlanet from "@/components/ModalPlanet.vue";

export default {
  name: "List",
  components: {
    modalPlanet,
  },
  data() {
    return {
      listFinal: [],
      list: [],
      showModalPlanet: null,
      pleopleSelected: null,
    };
  },
  async mounted() {
    await this.getListByPage();
  },
  methods: {
    /**
     * Resgate a lista da api.
     */
    async getListByPage() {
      await peopleApi.getListByPage(1).then((res) => {
        this.list = res.data.results;
        this.listFinal = this.list;
      });
    },
    /**
     * Pesquisa por nome do personagem.
     */
    search(ev) {
      const q = ev.target.value;
      this.listFinal = this.list.filter((item) => {
        return item.name.toLowerCase().includes(q.toLowerCase());
      });
    },
    openModalPlanet(people) {
      this.pleopleSelected = people;
      this.showModalPlanet = true;
    },
    resetModalPlanet() {
      this.pleopleSelected = null;
      this.showModalPlanet = false;
    },
  },
};
</script>