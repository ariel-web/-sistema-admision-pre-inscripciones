<template>

    <VueSelect :options="data_departamentos" label="Departamento" v-model="departamento" />

    <VueSelect :options="data_provincias" label="Provincia" v-model="provincia" />

    <VueSelect :options="data_distritos" label="Distrito" v-model="distrito" />

</template>

<script setup>
import axios from 'axios';
import { watch, onMounted, computed, ref } from 'vue';
import VueSelect from "@/components/Select/VueSelect";

const props = defineProps({
    modelValue: String,
})
const emit = defineEmits(['update:modelValue']);

const data_departamentos = ref([]);
const data_provincias = ref([]);
const data_distritos = ref([]);

const departamento = ref('');
const provincia = ref('');
const distrito = ref('');

onMounted(async () => {
    await getDepartamentos();
});

watch(departamento, async (newVal) => {

    if(newVal == null)return;
    await getProvincias();
    provincia.value = '';
    distrito.value = '';
});

watch(provincia, async (newVal) => {
    if(newVal == null) return;
    await getDistritos();
    distrito.value = '';
});

watch(distrito, async (newVal) => {
    if(newVal == null) return;
    console.log(distrito.value);
    emit('update:modelValue', distrito.value.value);
});

const getDepartamentos = async () => {
    let res = await axios.get('https://plankton-app-848ak.ondigitalocean.app/api/select-data/get-departamentos');
    data_departamentos.value = res.data.datos;
}

const getProvincias = async () => {
    let res = await axios.get('https://plankton-app-848ak.ondigitalocean.app/api/select-data/get-provincias/' + departamento.value.value);
    data_provincias.value = res.data.datos;
}

const getDistritos = async () => {
    let res = await axios.get('https://plankton-app-848ak.ondigitalocean.app/api/select-data/get-distritos/' + departamento.value.value + provincia.value.value);
    data_distritos.value = res.data.datos;
}


</script>