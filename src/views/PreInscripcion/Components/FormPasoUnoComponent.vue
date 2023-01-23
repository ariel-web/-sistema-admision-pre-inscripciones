<template>


    <Textinput label="Primer Apellido" type="text" placeholder="Primer Apellido" v-model="FormData.post_ap_primero" />

    <Textinput label="Segundo Apellido" type="text" placeholder="Segundo Apellido" v-model="FormData.post_ap_segundo" />

    <Textinput label="Nombre(s)" type="text" placeholder="Nombre(s)" v-model="FormData.post_nombres" />

    <Textinput label="Numero de Celular" type="text" placeholder="Numero de Celular" v-model="FormData.post_celular" />

    <Textinput label="Correo Electronico" type="text" placeholder="Correo Electronico" v-model="FormData.post_correo" />

    <VueSelect :options="optcion_sexo" label="Sexo" v-model="FormData.post_sexo" />

    <VueSelect :options="optcion_estado_civil" label="Estdo civil" v-model="FormData.post_estado_civil" />

    <Textinput label="Dirección Actual" type="text" placeholder="" v-model="FormData.post_direccion_actual" />

    <Textinput label="Fecha de nacimiento" type="date" placeholder="" v-model="FormData.post_fecha_nacimiento" />

    <Textinput label="Número de ubigeo" type="number" placeholder="Número de ubigeo"
        v-model="FormData.post_numero_ubigeo" />

    <div class="lg:col-span-3 md:col-span-2 col-span-1">
        <h4 class="text-base text-slate-800 dark:text-slate-300 mb-3">
            Lugar de residencia
        </h4>
        <hr>
    </div>

    <SelectUbicacionComponent v-model="FormData.post_residencia" />

    <Textinput label="Año de egreso" type="date" placeholder="Año de egreso" v-model="FormData.post_anio_egreso" />

</template>

<script setup>


import { ref, computed, onMounted, watch } from 'vue';

import Textinput from "@/components/Textinput";
import VueSelect from "@/components/Select/VueSelect";
import SelectUbicacionComponent from './SelectUbicacionComponent.vue';


const props = defineProps({
    modelValue: Object,
});

const emit = defineEmits(['update:modelValue']);

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



const FormData = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
}, { deep: true, })

</script>