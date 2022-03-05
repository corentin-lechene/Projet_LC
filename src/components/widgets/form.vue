<script>/**
 * Forms component
 */
import {sendInsertTable, sendGetDataTable} from "@/components/requests-bdd";
import {createObject, validRequest} from "@/components/my-functions";


export default {
  props: {
    forms: {
      type: Object,
      default: function () {
        return {};
      }
    },
    insert: {
      route: {
        type: String,
        default() {
          return false;
        }
      }
    },
    update: {
      id: {
        type: Number,
        default() {
          return null;
        }
      },
      route: {
        type: String,
        default() {
          return false;
        }
      },
    },
    display: {
      id: {
        type: Number,
        default() {
          return null;
        }
      },
      route: {
        type: String,
        default() {
          return false;
        }
      },
    },

  },
  data() {
    return {
      showModal: false,

      route: null,
      methodReq: null,
      id: null,

      valuesForm: [],
      object_form: {},
      profile: [],
      test: {}
    };
  },
  methods: {
    createValue(src, layer = false) {
      let values = [];
      let keys_layer = layer ? Object.keys(layer) : undefined;
      let keys_src = Object.keys(src);

      if(layer) {
        for (let i = 0; i < keys_layer.length; i++) {
          for (let j = i; j < keys_src.length; j++) {
            if (keys_layer[i] === keys_src[j]) {
              values.push(src[keys_src[j]]);
              break;
            }
          }
        }
      } else {
        for (const key in src) {
          values.push(src[key]);
        }
      }

      return values;
    },

    addTable(table, body) {
      console.log(createObject(this.forms, body));
      console.log(createObject(this.forms, body, true));
      let promise = sendInsertTable(table, createObject(this.forms, body));
      promise.then((res) => {
        if (!validRequest(res))
          console.log(res.result);
      })
    },

    getUsers(table, id) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res))
          this.valuesForm = this.createValue(res.result, this.forms);
      })
    }


  },
  mounted() {
    this.route = this.insert ? this.insert.route : this.update ? this.update.route : this.display ? this.display.route : null;
    this.methodReq = this.insert ? 'post' : this.update ? 'put' : null;
    this.id = this.update ? this.update.id : this.display ? this.display.id : null;

    if(this.update || this.display) {
      this.getUsers(this.route, this.id);
    }
  },
};
</script>


<template>
  <div>
    <div class="card-body">
      <b-form @submit.prevent="!display ? addTable(route, valuesForm) : ''">
        <div class="row">
          <b-form-group v-for="form in forms" :key="form.id" class="col-lg-4">
            <label>{{ form.title }} : </label>
            <div v-if="form.type === 'select'">
              <b-form-select
                  v-model="valuesForm[form.id]"
                  :options="form.options"
                  :value="null"
                  :disabled="!!display"
              />
            </div>

            <div v-else>
              <b-form-input
                  v-model="valuesForm[form.id]"
                  class="form-control"
                  :type="form.type"
                  :value="null"
                  :disabled="!!display"
              />
            </div>
          </b-form-group>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="text-right">
              <b-button v-if="insert" type="submit" variant="success">Ajouter un nouvel utilisateur</b-button>
              <b-button v-else-if="update" type="submit" variant="primary" class="w-md">Modifier</b-button>
            </div>
          </div>
        </div>
      </b-form>
    </div>
  </div>

</template>

<style scoped>

</style>