<template>
  <Textinput
    :rules="{}"
    @valid="inputValid.primer_ap = $event"
    label="Primer Apellido"
    type="text"
    placeholder=""
    v-model="FormData.tut_primer_ap"
  />

  <Textinput
    :rules="{}"
    @valid="inputValid.segundo_ap = $event"
    label="Segundo Apellido"
    type="text"
    placeholder=""
    v-model="FormData.tut_segundo_ap"
  />

  <Textinput
    :rules="{}"
    @valid="inputValid.nombres = $event"
    label="Nombres"
    type="text"
    placeholder=""
    v-model="FormData.tut_nombres"
  />

  <Textinput
    :rules="{}"
    @valid="inputValid.dni = $event"
    label="DNI"
    type="text"
    placeholder=""
    v-model="FormData.tut_dni"
  />
</template>

<script setup>
import { computed, watch, ref } from "vue";
import Textinput from "@/components/Textinput";

const props = defineProps({
  modelValue: Object,
});

const form_valid = ref(true);

const emit = defineEmits(["update:modelValue", "valid"]);



const inputValid = ref({
  primer_ap :false,
  segundo_ap :false,
  nombres :false,
  dni :false

});

watch(
  inputValid,
  (value) => {
    if (
      value.primer_ap
      && value.segundo_ap 
      && value.nombres 
      && value.dni 
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
</script>
