<script>
/**
 * Forms component
 */

export default {
  props: {
    forms: {
      type: Object,
      default: function () {
        return {};
      }
    },
    options: {
      type: Object,
      default: function () {
        return {};
      }
    },
    role: {
      type: String,
      default: function () {
        return "";
      }
    }
  },
  data() {
    return {
      showModal: false,
      valuesForm: [],
      object_form: {},

    };
  },
  methods: {
    createObjectWithValues(dest, src, valuesForm) {
      let i = 0;
      for (const key in src) {
        dest[key] = valuesForm[i];
        i++;
      }
      console.log(dest)
    },
    addInformation() {
      this.createObjectWithValues(this.object_form, this.forms, this.valuesForm);
      let url = `http://localhost:9000/${this.options.route}`;
      let header = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.object_form)
      }

      fetch(url, header)
          .then(response => response.json())
          .then((json) => {
            this.users = json;
          })
          .catch((err) => {
            this.debug = err;
          })
    },
  },
  created() {
    if (this.role === "" || this.role === 'insert') {
      console.log("insert");
    } else {
      this.valuesForm[0] = "Hadrien";
      this.valuesForm[1] = "Suryous";
      this.valuesForm[2] = "hsuryous@gmail.com";
      this.valuesForm[3] = "18/07/1997";
      this.valuesForm[4] = "0633193505";
      this.valuesForm[5] = "10 avenue roger salengro";
      this.valuesForm[6] = "Champigny sur Marne";
      this.valuesForm[7] = "France";
      this.valuesForm[8] = "94500"
      console.log("update");
    }
  },
};
</script>


<template>
  <div class="card-body">
    <b-form @submit.prevent="addInformation()">
      <div class="row">
        <b-form-group v-for="form in forms" :key="form.id" class="col-lg-4">
          <label>{{ form.title }} : </label>
          <select
              v-if="form.type === `select`"
              class="form-control"
              v-model="valuesForm[form.id]"
              required
          >
            <option>France</option>
            <option>Suisse</option>
            <option>Belgique</option>
            <option>Luxembourg</option>
            <option>Royaume-Uni</option>
            <option>Irlande</option>
          </select>
          <b-form-input
              v-else-if="form.title === `Date de naissance`"
              class="form-control"
              v-model="valuesForm[form.id]"
              :type="form.type"
              onfocus="(this.type='date')"
              required
          />
          <b-form-input
              v-else-if="form.title === `Code Postal`"
              class="form-control"
              v-model="valuesForm[form.id]"
              :type="form.type"
              :pattern="form.pattern"
              required
          />
          <b-form-input
              v-else-if="form.type=`tel`"
              class="form-control"
              v-model="valuesForm[form.id]"
              :type="form.type"
              :pattern="form.pattern"
              required
          />
          <b-form-input
              v-else
              class="form-control"
              v-model="valuesForm[form.id]"
              :type="form.type"
              :placeholder="form.placeholder"
              required
          />
        </b-form-group>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="text-right">
            <b-button v-if="role === 'update'" type="submit" variant="success">Confirmer</b-button>
            <b-button v-else type="submit" variant="primary" class="w-md">Ajouter un ..</b-button>
          </div>
        </div>
      </div>
    </b-form>
  </div>

</template>

<style scoped>

</style>