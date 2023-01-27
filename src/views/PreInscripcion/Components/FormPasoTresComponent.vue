<template>

    <TransitionRoot :show="isOpen" as="template">
    <Dialog
      as="div"
      @close="closeModal"
      class="relative z-[99999]"
      v-if="disableBackdrop === false"
    >
      <TransitionChild
        :enter="noFade ? '' : 'duration-300 ease-out'"
        :enter-from="noFade ? '' : 'opacity-0'"
        :enter-to="noFade ? '' : 'opacity-100'"
        :leave="noFade ? '' : 'duration-300 ease-in'"
        :leave-from="noFade ? '' : 'opacity-100'"
        :leave-to="noFade ? '' : 'opacity-0'"
      >
        <div
          class="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full justify-center text-center p-4"
          :class="centered ? 'items-center' : 'items-start '"
        >
          <TransitionChild
            as="template"
            :enter="noFade ? '' : 'duration-300  ease-out'"
            :enter-from="noFade ? '' : 'opacity-0 scale-95'"
            :enter-to="noFade ? '' : 'opacity-100 scale-100'"
            :leave="noFade ? '' : 'duration-200 ease-in'"
            :leave-from="noFade ? '' : 'opacity-100 scale-100'"
            :leave-to="noFade ? '' : 'opacity-0 scale-95'"
          >
            <DialogPanel
              class="w-full transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all"
              :class="sizeClass"
            >
              <div
                class="relative overflow-hidden py-4 px-5 text-white flex justify-between"
                :class="themeClass"
              >
                <h2
                  v-if="title"
                  class="capitalize leading-6 tracking-wider font-medium text-base text-white"
                >
                  Examen Vocacional
                </h2>
                <button @click="closeModal" class="text-[22px]">
                  <Icon icon="heroicons-outline:x" />
                </button>
              </div>
              <div
                class="px-6 py-8"
                :class="scrollContent ? 'overflow-y-auto max-h-[400px]' : ''"
              >
              
                  <ExamenVocacionalComponent/>
                </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

        











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
import { computed, onMounted, watch, ref } from 'vue';
import VueSelect from '@/components/Select/VueSelect.vue';
import Card from '@/components/Card';
import Fileinput from '@/components/Fileinput';
import http from '@/helpers/http';
import {  TransitionRoot, TransitionChild, Dialog,  DialogPanel } from "@headlessui/vue";
import ExamenVocacionalComponent from './ExamenVocacionalComponent.vue';


const props = defineProps({
    modelValue: Object,
    labelClass: {
      type: String,
      default: "btn-primary",
    },
    centered: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Basic Modal",
    },
    label: {
      type: String,
      default: "Basic Modal",
    },
    disableBackdrop: {
      type: Boolean,
      default: false,
    },
    noFade: {
      type: Boolean,
      default: false,
    },
    themeClass: {
      type: String,
      default:
        "bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700",
    },
    sizeClass: {
      type: String,
      default: "max-w-xl",
    },
    scrollContent: {
      type: Boolean,
      default: false,
    },
    activeModal: {
      type: Boolean,
      default: false,
    },
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
    let res = await http.get('/select-data/get-programa-estudios');
    console.log(res.data);
    data_programa_estudios.value = res.data.datos;
});
const data_programa_estudios = ref([]);

watch(props.modelValue, async (newVal) => {
    if (newVal == null) return;
    console.log("Abrir Modal");
    const x = openModal();
});

const isOpen = ref(props.activeModal);
// open
const openModal = () => {
  isOpen.value = !isOpen.value;
}
// close
const closeModal = () => {
  isOpen.value = false;
}   

</script>