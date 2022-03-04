<script>/**
 * Forms component
 */
import {sendInsertTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";


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
    update: {
      type: Boolean,
      default: function () {
        return false;
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
      return dest;
    },
    jsonToArray(src) {
      for (const key in src) {
        this.valuesForm.push(src[key]);
      }
    },
    getUserById() {
      fetch('http://localhost:9000/users/5')
          .then(response => response.json())
          .then((json) => {
            this.jsonToArray(json);
            this.profile = json;
          });
    },
    addTable(table, body) {
      let promise = sendInsertTable(table, body);
      promise.then((res) => {
        if(!validRequest(res))
          this.addTable_v = res.result;
      });
    },
  },
  created() {
    if (this.update)

      this.getUserById();

  },
};
</script>


<template>
  <div v-if="update">
    <div class="card-body">
      <b-form @submit.prevent="addTable(options.route, createObjectWithValues(object_form, forms, valuesForm))">
        <div class="row">
          <b-form-group v-for="form in forms" :key="form.id" class="col-lg-4">
            <label>{{ form.title }} : </label>
            <b-form-input
                v-if="form.id === 0"
                class="form-control"
                v-model="valuesForm[form.id]"
                :type="form.type"
                
            />
            <b-form-input
                v-else-if="form.id === 1"
                class="form-control"
                v-model="valuesForm[form.id]"
                :type="form.type"
            />
            <b-form-input
                v-else-if="form.id === 2"
                class="form-control"
                v-model="valuesForm[form.id]"
                :type="form.type"
                
            />
            <b-form-input
                v-else-if="form.id === 3"
                class="form-control"
                v-model="valuesForm[form.id]"
                :type="form.type"
                onfocus="(this.type='date')"
                
            />
            <b-form-input
                v-else-if="form.id === 4"
                class="form-control"
                v-model="valuesForm[form.id]"
                :type="form.type"
                :pattern="form.pattern"
                
            />
            <b-form-input
                v-else-if="form.id === 5"
                class="form-control"
                v-model="valuesForm[form.id]"
                :type="form.type"
                :pattern="form.pattern"
                
            />
            <b-form-input
                v-else-if="form.id === 6"
                class="form-control"
                v-model="valuesForm[form.id]"
                :type="form.type"
                :pattern="form.pattern"
                
            />
            <select
                v-else-if="form.id === 7"
                class="form-control"
                v-model="valuesForm[form.id]"
                
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
                v-model="valuesForm[form.id]"
                :type="form.type"
                :pattern="form.pattern"
                
            />
          </b-form-group>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="text-right">
              <b-button v-if="update" type="submit" variant="success">Confirmer</b-button>
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
            <p>{{ profile.lastname }}</p>
          </div>
          <div class="col-4">
            <p>{{ profile.mail }}</p>
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
            <p>{{ profile.niceDay }}</p>
          </div>
          <div class="col-4">
            <p>{{ profile.phone }}</p>
          </div>
          <div class="col-4">
            <p>{{ profile.address }}</p>
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
            <p>{{ profile.city }}</p>
          </div>
          <div class="col-4">
            <p>{{ profile.country }}</p>
          </div>
          <div class="col-4">
            <p>{{ profile.postal_code }}</p>
          </div>
        </div>
        <div class="row" style="height: 35px; width: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>