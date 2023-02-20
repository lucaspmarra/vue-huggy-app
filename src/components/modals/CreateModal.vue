<template>
    <Transition name="createModal">
        <section v-if="createModal" class="modal__mask">
            <div class="modal__container">

                <!-- <EditIcon /> -->
                <!-- <DeleteIcon @click="deleteContact(result.id)" /> -->
                <div class="modal__header">
                    <slot name="header">Adicionar novo contato</slot>
                </div>

                <div class="modal__body">
                    <slot name="body">
                        <form @submit.prevent="submitContact" class="modal__form">
                            <label class="label" for="name">Nome</label>
                            <input id="name" name="name" type="text" v-model="name" placeholder="Nome completo" required>




                            <label class="label" for="email">Email</label>
                            <input id="email" name="email" type="email" v-model="email" placeholder="Email" required>




                            <label class="label" for="phone">Telefone</label>
                            <input id="phone" name="phone" type="text" placeholder="Telefone" v-model="phone">




                            <label class="label" for="mobile">Celular</label>
                            <input id="mobile" name="mobile" type="text" placeholder="Celular" v-model="mobile">



                            <label class="label" for="address">Endereço</label>
                            <input id="address" name="address" type="text" placeholder="Endereço" v-model="address">


                            <div>
                                <ul class="form__ul">
                                    <li class="form__li">
                                        <label class="label" for="district">Bairro</label>
                                        <input id="district" name="distric" type="text" placeholder="Bairro"
                                            v-model="district">
                                    </li>
                                    <li><label class="label" for="state">Estado</label>
                                        <input id="state" name="state" type="text" placeholder="Estado" v-model="state">
                                    </li>
                                </ul>
                            </div>

                            <button class="cancel_button" @click="$emit('close')">Cancelar</button>
                            <button id="createModal" class="contact__create" type="submit">Salvar</button>
                        </form>

                    </slot>
                </div>




            </div>
        </section>
    </Transition>
</template>

<script>
import DeleteIcon from '@/components/DeleteIcon.vue'
import EditIcon from '@/components/EditIcon.vue';
import { ref } from 'vue';
export default {
    name: 'CreateModal',
    components: { DeleteIcon, EditIcon },
    props: ({
        createModal: Boolean,
        toggleCreateModal: Boolean,
    }),
    emits: ['contact-data'],
    setup (props, { emit }) {
        const name = ref('');
        const email = ref('');
        const phone = ref('');
        const mobile = ref('');
        const address = ref('');
        const district = ref('');
        const state = ref('');

        const submitContact = () => {
            const payload = {
                name: name.value,
                email: email.value,
                phone: phone.value,
                mobile: mobile.value,
                address: address.value,
                district: district.value,
                state: state.value
            };
            emit('contact-data', payload);
            name.value = '';
            email.value = '';
            phone.value = '';
            mobile.value = '';
            address.value = '';
            district.value = "";
            state.value = "";
        }

        return {
            name,
            email,
            phone,
            mobile,
            address,
            district,
            state,
            submitContact
        }
    }
}
</script>
