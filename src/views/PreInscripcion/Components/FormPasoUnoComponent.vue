<template>
  <Textinput
    label="Primer Apellido"
    type="text"
    placeholder="Primer Apellido"
    v-model="FormData.post_ap_primero"
    :rules="{}"
    @valid="inputValid.ap_primero = $event"
  />

  <Textinput
    label="Segundo Apellido"
    type="text"
    placeholder="Segundo Apellido"
    v-model="FormData.post_ap_segundo"
    :rules="{}"
    @valid="inputValid.ap_segundo = $event"
  />

  <Textinput
    label="Nombre(s)"
    type="text"
    placeholder="Nombre(s)"
    v-model="FormData.post_nombres"
    :rules="{}"
    @valid="inputValid.nombres = $event"
  />

  <Textinput
    label="Numero de Celular"
    type="text"
    placeholder="Numero de Celular"
    v-model="FormData.post_celular"
    :rules="{ long: 9 }"
    @valid="inputValid.celular = $event"
    @keypress="isNumber"
  />

  <Textinput
    label="Correo Electronico"
    type="text"
    placeholder="Correo Electronico"
    v-model="FormData.post_correo"
    :rules="{ email: true }"
    @valid="inputValid.correo = $event"
  />

  <VueSelect
    :options="optcion_sexo"
    label="Sexo"
    v-model="FormData.post_sexo"
    required
  />

  <VueSelect
    :options="optcion_estado_civil"
    label="Estdo civil"
    v-model="FormData.post_estado_civil"
  />

  <Textinput
    label="Dirección Actual"
    type="text"
    placeholder=""
    v-model="FormData.post_direccion_actual"
    :rules="{}"
    @valid="inputValid.direccion_actual = $event"
  />

  <Textinput
    label="Fecha de nacimiento"
    type="date"
    placeholder=""
    v-model="FormData.post_fecha_nacimiento"
    :rules="{}"
    @valid="inputValid.fecha_nacimiento = $event"
  />

  <Textinput
    label="Número de ubigeo"
    type="number"
    placeholder="Número de ubigeo"
    v-model="FormData.post_numero_ubigeo"
    :rules="{ long: 6 }"
    @valid="inputValid.numero_ubigeo = $event"
    @keypress="isNumber"
  />

  <div class="lg:col-span-3 md:col-span-2 col-span-1">
    <h4 class="text-base text-slate-800 dark:text-slate-300 mb-3">
      Lugar de residencia
    </h4>
    <hr />
  </div>

  <SelectUbicacionComponent v-model="FormData.post_residencia" />

  <Textinput
    label="Año de egreso"
    type="date"
    placeholder="Año de egreso"
    v-model="FormData.post_anio_egreso"
    required
  />
</template>

<script setup>
import { ref, computed, watch } from "vue";

import Textinput from "@/components/Textinput";
import VueSelect from "@/components/Select/VueSelect";
import SelectUbicacionComponent from "./SelectUbicacionComponent.vue";
import { isNumber } from "@/helpers/validations";

const props = defineProps({
  modelValue: Object,
});

const form_valid = ref(true);

const emit = defineEmits(["update:modelValue", "valid"]);


const inputValid = ref({
  ap_primero: false,
  ap_segundo: false,
  nombres: false,
  celular: false,
  correo: false,
  direccion_actual: false,
  fecha_nacimiento: false,
  numero_ubigeo: false,
  //anio_egreso: false,
});

watch(
  inputValid,
  (value) => {
    if (
      value.ap_primero == true 
       && value.ap_segundo == true 
       && value.nombres == true 
       && value.celular == true 
       && value.correo == true 
       && value.direccion_actual == true 
       && value.fecha_nacimiento == true 
       && value.numero_ubigeo == true
      //value.anio_egreso
    ) {
      emit("valid", true);
    } else {
      emit("valid", false);
    }
  },
  { deep: true }
);

const optcion_sexo = [
  {
    value: "M",
    label: "Masculino",
  },
  {
    value: "F",
    label: "Femiednino",
  },
  {
    value: "O",
    label: "Otro",
  },
];

const optcion_estado_civil = [
  {
    value: "S",
    label: "soltero",
  },
  {
    value: "C",
    label: "Casado",
  },
  {
    value: "D",
    label: "Divolciado",
  },
  {
    value: "V",
    label: "Viudo",
  },
];

const FormData = computed(
  {
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  },
  { deep: true }
);
</script>
