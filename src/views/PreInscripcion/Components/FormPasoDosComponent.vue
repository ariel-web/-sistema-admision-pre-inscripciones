<template>
  <Textinput
    label="Pais"
    type="text"
    placeholder=""
    v-model="FormData.cole_pais"
    :rules="{}"
    @valid="inputValid.pais = $event"
  />

  <SelectUbicacionComponent v-model="cole_ubucacion" />

  <VueSelect
    :options="data_colegios"
    label="Nombre del colegio"
    v-model="FormData.cole_nombre"
  />

  <div class="card lg:col-span-3 md:col-span-3 col-span-1">
    <h4
      class="text-base text-slate-800 dark:text-slate-300 mb-3 flex justify-between"
    >
      Datos de los padres o Tutor
      <Button
        type="button"
        @click="AddTutor"
        text="Agregar tutor"
        btnClass="btn-primary btn-sm"
        :isDisabled="FormData.tutores.length == 2"
      />
    </h4>

    <div
      class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 bg-slate-50 p-4 my-4 rounded-lg"
      v-for="(item, index) in FormData.tutores"
    >
      <div
        class="card lg:col-span-3 md:col-span-3 col-span-1 flex justify-between"
      >
        <h4 class="text-base text-slate-800 dark:text-slate-300 mb-2">
          Datos del Padre o Tutor
        </h4>

        <Button
          type="button"
          @click="RemoveTutor(index)"
          text="Quitar"
          btnClass="btn-danger btn-sm"
        />
      </div>
      <TutoresComponent
        v-model="FormData.tutores[index]"
        @valid="inputValid.tutores = $event"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import TutoresComponent from "./TutoresComponent.vue";
import SelectUbicacionComponent from "./SelectUbicacionComponent.vue";
import VueSelect from "@/components/Select/VueSelect.vue";
import http from "@/helpers/http";

const props = defineProps({
  modelValue: Object,
});

const form_valid = ref(true);

const emit = defineEmits(["update:modelValue", "valid"]);

const inputValid = ref({
  tutores: false,
  pais: false,

});

watch(
  inputValid,
  (value) => {
    if (
      value.tutores  &&
      value.pais 
    ) {
      emit("valid", true);
    } else {
      emit("valid", false);
    }
  },
  { deep: true }
);

const FormData = computed(
  {
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  },
  { deep: true }
);

const cole_ubucacion = ref("");
const data_colegios = ref([]);

watch(cole_ubucacion, async (newVal) => {
  let res = await http.get("/select-data/get-colegios/" + newVal);
  data_colegios.value = res.data.datos;
  FormData.value.cole_ubigeo = newVal;
});

const AddTutor = () => {
  console.log(FormData.value.tutores.length);
  if (FormData.value.tutores.length == 2) return;
  FormData.value.tutores.push({
    tut_primer_ap: "",
    tut_segundo_ap: "",
    tut_nombres: "",
    tut_dni: "",
  });
};

const RemoveTutor = (index) => {
  FormData.value.tutores.splice(index, 1);
};
</script>
