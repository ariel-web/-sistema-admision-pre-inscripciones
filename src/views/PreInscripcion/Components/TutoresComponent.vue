<template>
  <Textinput
    :rules="{}"
    @valid="form_valid = $event"
    label="Primer Apellido"
    type="text"
    placeholder=""
    v-model="FormData.tut_primer_ap"
  />

  <Textinput
    :rules="{}"
    @valid="form_valid = $event"
    label="Segundo Apellido"
    type="text"
    placeholder=""
    v-model="FormData.tut_segundo_ap"
  />

  <Textinput
    :rules="{}"
    @valid="form_valid = $event"
    label="Nombres"
    type="text"
    placeholder=""
    v-model="FormData.tut_nombres"
  />

  <Textinput
    :rules="{}"
    @valid="form_valid = $event"
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

watch(form_valid, (value) => {
  emit("valid", value);
});

const FormData = computed(
  {
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  },
  { deep: true }
);
</script>
