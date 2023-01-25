<template>
  <Card title="Pre inscripción">
    <div class="min-w-[80vw]">
      <div class="flex z-[5] items-center relative justify-center md:mx-8">
        <div class="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
          v-for="(item, i) in steps" :key="i">
          <div :class="`   ${stepNumber >= i
          ? 'bg-slate-900 text-white ring-slate-900 ring-offset-2 dark:ring-offset-slate-500 dark:bg-slate-900 dark:ring-slate-900'
          : 'bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 dark:bg-slate-600 dark:ring-slate-600 text-opacity-70'
          }`"
            class="transition duration-150 icon-box md:h-12 md:w-12 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium">
            <span v-if="stepNumber <= i"> {{ i + 1 }}</span>
            <span v-else class="text-3xl">
              <Icon icon="bx:check-double" />
            </span>
          </div>

          <div class="absolute top-1/2 h-[2px] w-full" :class="
            stepNumber >= i
              ? 'bg-slate-900 dark:bg-slate-900'
              : 'bg-[#E0EAFF] dark:bg-slate-700'
          "></div>
          <div
            class="absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100"
            :class="
              stepNumber >= i
                ? ' text-slate-900 dark:text-slate-300'
                : 'text-slate-500 dark:text-slate-300 dark:text-opacity-40'
            ">
            <span class="w-max">{{ item.title }}</span>
          </div>
        </div>
      </div>

      <div class="conten-box mt-14 border-t border-slate-100 dark:border-slate-700 -mx-6 px-6 pt-6">
        <form @submit.prevent="submit">
          <div v-if="stepNumber === 0">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              <div class="lg:col-span-3 md:col-span-2 col-span-1">
                <h4 class="text-base text-slate-800 dark:text-slate-300 mb-3">
                  Registros de Datos Personales
                </h4>
                <hr>
              </div>

              <FormPasoUnoComponent v-model="form_uno" />

            </div>
          </div>
          <div v-if="stepNumber === 1">
            <div class="grid md:grid-cols-3 grid-cols-1 gap-5">
              <div class="md:col-span-3 col-span-1">
                <h4 class="text-base text-slate-800 dark:text-slate-300 mb-3">
                  Datos y ubicación del colegio en el que termino sus estudios
                </h4>
              </div>


              <FormPasoDosComponent v-model="form_dos" />


              <div class="md:col-span-3 col-span-1">
              </div>
            </div>
          </div>
          <div v-if="stepNumber === 2">
            <div class="grid grid-cols-1 gap-5">
              <div class="">
                <h4 class="text-base text-slate-800 dark:text-slate-300 mb-6">
                  Enter Your Address
                </h4>
              </div>

              <FormPasoTresComponent v-model="form_tres" />

            </div>
          </div>


          <div v-if="stepNumber === 3">
            <div class="grid grid-cols-1 gap-5">
              <div class="">
                <h4 class="text-base text-slate-800 dark:text-slate-300 mb-6">
                  FELICITACIONES
                </h4>
              </div>

            </div>
          </div>

          <div class="mt-10" :class="stepNumber > 0 ? 'flex justify-between' : ' text-right'">
            <Button @click.prevent="prev()" text="Atras" btnClass="btn-dark" v-if="stepNumber !== 0" />
            <Button :text="stepNumber !== steps.length - 1 ? 'Siguiente' : 'Guardar'" btnClass="btn-primary" />
          </div>
        </form>
      </div>
    </div>
  </Card>
</template>
<script setup>

import axios from "axios";
import { ref } from "vue";
import { useToast } from "vue-toastification";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

import FormPasoUnoComponent from "./Components/FormPasoUnoComponent.vue";
import FormPasoDosComponent from "./Components/FormPasoDosComponent.vue";
import FormPasoTresComponent from "./Components/FormPasoTresComponent.vue";

let steps = [
  {
    id: 1,
    title: "Datos Personales",
  },
  {
    id: 2,
    title: "Estudios",
  },
  {
    id: 3,
    title: "Programa de estudios",
  },

];

const toast = useToast();
let stepNumber = ref(0);

const tutor = {
  tut_primer_ap: '',
  tut_segundo_ap: '',
  tut_nombres: '',
  tut_dni: '',
};

const form_uno = ref({});
const form_dos = ref({
  cole_pais: '',
  cole_departamento: '',
  cole_provincia: '',
  cole_distrito: '',
  cole_nombre: '',
  tutores: [
    tutor
  ],
});

const form_tres = ref({});

const submit = async () => {
  console.log(form_tres.value);
  console.log(form_dos.value);
  console.log(form_uno.value);

  if (stepNumber.value == 2) {
    console.log('enviando a la vase de datos');
    let res = await axios.post('https://plankton-app-848ak.ondigitalocean.app/api/pre-inscripcion/guardar', setFormData() );
    console.log(res);
  }
  stepNumber.value++;
}


const setFormData = () =>{
  let data = new FormData();
  data.append('datos_postulante', JSON.stringify(form_uno.value));
  data.append('datos_colegio', JSON.stringify(form_dos.value) );

  data.append('plan_estudio', JSON.stringify(form_tres.value.plan_estudio) );
  data.append('pago_1',form_tres.value.pago1 );
  data.append('pago_2',form_tres.value.pago2 );
  data.append('certificado',form_tres.value.certificado );

  return data;
}


const prev = () => {
  stepNumber.value--;
};

</script>
