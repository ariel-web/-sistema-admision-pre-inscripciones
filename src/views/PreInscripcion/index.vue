<template>

    <Card title="Pre Inscripcion" subtitle="Ingrese el numoer de documento de identidad" imaClass="rounded-md" noborder>


        <div class="flex flex-wrap mb-4">
            <div class="w-full input-label">Tipo de Documento</div>
            <div class="mr-5">
                <Radio label="DNI" class="mb-5 mx-5" name="x" value="A" v-model="picked1" />
            </div>
            <div>
                <Radio label="Carne de extrangeria" class="mb-5 mx-1.5" name="x" value="B" v-model="picked1" />
            </div>
        </div>
        <Textinput v-model="numDocumento" label="N° Documento" name="h_Fullname" type="text" class="mb-4"
            placeholder="N° Documento" />
        <Button text="Iniciar Postulación" btnClass="btn-primary block-btn" type="button" @click="IrDatosPostulante" />
    </Card>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import Radio from "@/components/Radio";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";

const router = useRouter();
const picked1 = ref('A')
const numDocumento = ref('');
const IrDatosPostulante = () => {
    if (numDocumento.value == "") return; //validar 
    router.push('/datos-postulante/' + numDocumento.value)
}
</script>
