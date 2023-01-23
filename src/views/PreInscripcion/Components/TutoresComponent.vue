<template>

    <Textinput label="Primer Apellido" type="text" placeholder="" v-model="FormData.tut_primer_ap" />

    <Textinput label="Segundo Apellido" type="text" placeholder="" v-model="FormData.tut_segundo_ap" />

    <Textinput label="Nombres" type="text" placeholder="" v-model="FormData.tut_nombres" />

    <Textinput label="DNI" type="text" placeholder="" v-model="FormData.tut_dni" />

</template>

<script setup>
import { computed } from 'vue';
import Textinput from "@/components/Textinput";

const props = defineProps({
    modelValue: Object,
});

const emit = defineEmits(['update:modelValue']);

const FormData = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
}, { deep: true, })

</script>