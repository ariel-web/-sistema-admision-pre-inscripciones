<template>
  <Card
    title="Pre Inscripcion"
    subtitle="Ingrese el número de documento de identidad"
    imaClass="rounded-md"
    noborder
  >
    <div class="flex flex-wrap mb-4">
      <div class="w-full input-label">Tipo de Documento</div>
      <div class="mr-5">
        <Radio
          label="DNI"
          class="mb-5 mx-5"
          value="DNI"
          v-model="pickedTypeDocument"
        />
      </div>
      <div>
        <Radio
          label="Carne de extrangeria"
          class="mb-5 mx-1.5"
          value="CARNE"
          v-model="pickedTypeDocument"
        />
      </div>
    </div>
    <Textinput
      v-model="numDocumento"
      label="N° Documento"
      name="h_Fullname"
      type="text"
      class="mb-4"
      placeholder="N° Documento"
      @keypress="isNumber"
      :rules="{ long: pickedTypeDocument == 'DNI' ? 8 : 12 }"
      @valid="form_valid = $event"
    />

    <Button
      text="Iniciar Postulación"
      btnClass="btn-dark block-btn"
      type="button"
      :isDisabled="!form_valid"
      @click="IrDatosPostulante"
    />
  </Card>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Radio from "@/components/Radio";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import { isNumber } from "@/helpers/validations";

const form_valid = ref(true);
const router = useRouter();
const pickedTypeDocument = ref("DNI");
const numDocumento = ref("");
const error_input = ref([]);

const toast = useToast();

const IrDatosPostulante = () => {
  if (pickedTypeDocument.value == "DNI") {
    if (numDocumento.value.length != 8) {
      toast.error("Número de documento no valido.");

      return;
    }
  }
  if (pickedTypeDocument.value == "CARNE") {
    if (numDocumento.value.length != 12) {
      toast.error("Número de documento no valido.");
      return;
    }
  }
  error_input.value = null;
  router.push("/datos-postulante/" + numDocumento.value);
};
</script>
