<template>
  <div>
      <div v-for="(item, index) in preguntas" :key="item.id" style="margin-bottom: 20px;">
        <card>          
          <div style="margin-bottom: 20px;"> <h6> {{ item.pregunta }} </h6> </div>
          
          <div v-if="item.url !== null" style="display: flex; justify-content: center;">            
            <img :src="item.url"  class="rounded-md mb-6"/>
          </div>


          <div v-for="(ite) in item.respuestas" :key="ite.id">
              <div v-if="index === 0">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res1"
                  :value="ite"
                />
              </div>
              <div v-if="index === 1">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res2"
                  :value="ite"
                />
              </div>
              <div v-if="index === 2">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res3"
                  :value="ite"
                />
              </div>
              <div v-if="index === 3">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res4"
                  :value="ite"
                />
              </div>
              <div v-if="index === 4">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res5"
                  :value="ite"
                />
              </div>
              <div v-if="index === 5">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res6"
                  :value="ite"
                />
              </div>
              <div v-if="index === 6">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res7"
                  :value="ite"
                />
              </div>
              <div v-if="index === 7">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res8"
                  :value="ite"
                />
              </div>
              <div v-if="index === 8">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res9"
                  :value="ite"
                />
              </div>
              <div v-if="index === 9">
                <Radio
                  :label="ite.respuesta"
                  class="mb-5"
                  name="jorina"
                  v-model="res.res10"
                  :value="ite"
                />
              </div>
           </div>

        </card>
      </div> 
      

      <Button text="Finalizar Examen Vocacional" btnClass="btn-dark"  @click="GuardarExamen"/>
      <div>
      <!-- <div class="grid grid-cols-1 gap-5" v-for="(item, index) in preguntas" :key="item.id">
          <Pregunta :pregunta="item.pregunta"  :items="item.respuestas" />
      </div> -->
      </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Radio from "@/components/Radio";
import Image from '@/components/Image';
import Button from "@/components/Button";
import { defineComponent, ref } from "vue";

import {
TransitionRoot,
TransitionChild,
Dialog,
DialogPanel,
} from "@headlessui/vue";

// import { advancedTable } from "@/constant/basic-tablle-data";
import axios from 'axios';
//import Pregunta from './pregunta.vue'

export default {
  components: {
    Card,
    Radio,
    Image,
    Button,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,

      //Pregunta
  },

data() {
  return {
    preguntas:[],
    resps:[],
    res:{
      res1:null,
      res2:null,
      res3:null,
      res4:null,
      res5:null,
      res6:null,
      res7:null,
      res8:null,
      res9:null,
      res10:null

    }
  }
},
methods:{
  
  async getPreguntas(){
    let res = await axios.get('https://plankton-app-848ak.ondigitalocean.app/api/preguntas');
    this.preguntas = res.data.datos;
  },

  async GuardarExamen(){
    let res = await axios.post('https://plankton-app-848ak.ondigitalocean.app/api/guardar-examen',this.res);
  },

},

// computed:mapGetters(['allRespuestas']),
mounted() {
  this.getPreguntas();
  // this.fetchrespuestas(); 
},

setup(props) {
  const isOpen = ref(props.activeModal);

  const openModal = () => {
      isOpen.value = !isOpen.value;
  };
  // close
  const closeModal = () => {
      isOpen.value = false;
  };


  return { closeModal, openModal, isOpen };
},

};

</script>