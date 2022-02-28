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
      profile: [],
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
    jsonToArray(src) {
      for (const key in src) {
        this.valuesForm.push(src[key]);
      }
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
    getUserById() {
      fetch('http://localhost:9000/users/5')
          .then(response => response.json())
          .then((json) => {
            this.jsonToArray(json);
            this.profile = json;
          });
    },
  },
  created() {
    this.getUserById();

  },
};
</script>


<template>
  <div v-if="role=== 'update'">
    <div class="card-body">
      <b-form @submit.prevent="addInformation()">
        <div class="row">
          <b-form-group v-for="form in forms" :key="form.id" class="col-lg-4">
            <label>{{ form.title }} : </label>
            <b-form-input
                v-if="form.id === 0"
                class="form-control"
                v-model="valuesForm[1]"
                :type="form.type"
                required
            />
            <b-form-input
                v-else-if="form.id === 1"
                class="form-control"
                v-model="valuesForm[2]"
                :type="form.type"
                required
            />
            <b-form-input
                v-else-if="form.id === 2"
                class="form-control"
                v-model="valuesForm[3]"
                :type="form.type"
                required
            />
            <b-form-input
                v-else-if="form.id === 3"
                class="form-control"
                v-model="valuesForm[16]"
                :type="form.type"
                onfocus="(this.type='date')"
                required
            />
            <b-form-input
                v-else-if="form.id === 4"
                class="form-control"
                v-model="valuesForm[5]"
                :type="form.type"
                :pattern="form.pattern"
                required
            />
            <b-form-input
                v-else-if="form.id === 5"
                class="form-control"
                v-model="valuesForm[9]"
                :type="form.type"
                :pattern="form.pattern"
                required
            />
            <b-form-input
                v-else-if="form.id === 6"
                class="form-control"
                v-model="valuesForm[11]"
                :type="form.type"
                :pattern="form.pattern"
                required
            />
            <select
                v-else-if="form.id === 7"
                class="form-control"
                v-model="valuesForm[10]"
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
                v-else-if="form.id === 8"
                class="form-control"
                v-model="valuesForm[12]"
                :type="form.type"
                :pattern="form.pattern"
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
  </div>
  <div v-else>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-10">
        <div class="row" style="width: 100%;">
          <div class="col-4">
            <label>Nom</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
          <div class="col-4">
            <label>Prénom</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
          <div class="col-4">
            <label>Email</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
        </div>
        <div class="row" style="width: 100%;">
          <div class="col-4">
            <p>{{ profile.firstname }}</p>
          </div>
          <div class="col-4">
            <p>{{profile.lastname}}</p>
          </div>
          <div class="col-4">
            <p>{{profile.mail}}</p>
          </div>
        </div>
        <div class="row" style="height: 35px; width: 100%;"></div>
        <div class="row" style="width: 100%;">
          <div class="col-4">
            <label>Date de naissance</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
          <div class="col-4">
            <label>Téléphone</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
          <div class="col-4">
            <label>Adresse</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
        </div>
        <div class="row" style="width: 100%;">
          <div class="col-4">
            <p>{{profile.niceDay}}</p>
          </div>
          <div class="col-4">
            <p>{{profile.phone}}</p>
          </div>
          <div class="col-4">
            <p>{{profile.address}}</p>
          </div>
        </div>
        <div class="row" style="height: 35px; width: 100%;"></div>
        <div class="row" style="width: 100%;">
          <div class="col-4">
            <label>Ville</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
          <div class="col-4">
            <label>Pays</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
          <div class="col-4">
            <label>Code postal</label>
            <div class="row" style="height: 5px; width: 100%;"></div>
          </div>
        </div>
        <div class="row" style="width: 100%;">
          <div class="col-4">
            <p>{{profile.city}}</p>
          </div>
          <div class="col-4">
            <p>{{profile.country}}</p>
          </div>
          <div class="col-4">
            <p>{{profile.postal_code}}</p>
          </div>
        </div>
        <div class="row" style="height: 35px; width: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>