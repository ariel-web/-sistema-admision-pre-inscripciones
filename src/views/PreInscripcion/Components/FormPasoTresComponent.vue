<template>
    <VueSelect :options="data_programa_estudios" label="Seleccione el programa de " v-model="FormData.plan_estudio" />
    <div class="grid md:grid-cols-2 grid-cols-1 gap-5">
        <Card subtitle="Comprobante de pago">
            <Fileinput preview name="preview" @change="previewPago" />
        </Card>
        <Card subtitle="Comprobante por constancia de Examen medico">
            <Fileinput preview name="preview2" @change="previewCertificado" />
        </Card>
    </div>

    <Card subtitle="Certificado de estudios">
        <Fileinput name="preview3" @change="previewCertificadoPdf" />
    </Card>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted,  watch, ref } from 'vue';
import VueSelect from '@/components/Select/VueSelect.vue';
import Card from '@/components/Card';
import Fileinput from '@/components/Fileinput';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from "@headlessui/vue";


const isOpen = ref(props.activeModal);

// open
const openModal = () => {
    isOpen.value = !isOpen.value;
};
// close
const closeModal = () => {
    isOpen.value = false;
};


const props = defineProps({
    modelValue: Object,
});

const emit = defineEmits(['update:modelValue']);
const FormData = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),

}, { deep: true });

const previewPago = (event) => {
    FormData.value.pago1 = event.target.files[0];
    console.log(event.target.files);
    console.log('cambio');
}
const previewCertificado = (event) => {
    FormData.value.pago2 = event.target.files[0];
    console.log(event.target.files);
    console.log('cambio');
}
const previewCertificadoPdf = (event) => {
    FormData.value.certificado = event.target.files[0];
    console.log(event.target.files);
    console.log('cambio');
}

onMounted(async () => {
    let res = await axios.get('https://plankton-app-848ak.ondigitalocean.app/api/select-data/get-programa-estudios');
    console.log(res.data);
    data_programa_estudios.value = res.data.datos;
});
const data_programa_estudios = ref([]);

watch(props.modelValue, async (newVal) => {
    if(newVal == null) return;
    console.log("Abrir Modal");

});

</script>