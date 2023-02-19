<template>
    <Transition name="createModal">
        <section v-if="createModal" class="modal__mask">
            <div class="modal__container">
                <span class="modal__close__button" @click="$emit('close')"></span>
                <!-- <EditIcon /> -->
                <!-- <DeleteIcon @click="deleteContact(result.id)" /> -->
                <div class="modal__header">
                    <slot name="header">Adicionar contato</slot>
                </div>

                <div class="modal__body">
                    <slot name="body">
                        <form @submit.prevent="submitContact">
                            <label for="name">Nome:</label>
                            <input name="name" type="text" v-model="nome">

                            <label for="email">Email:</label>
                            <input name="email" type="email" v-model="email">

                            <br>

                            <label for="phone">Telefone:</label>
                            <input name="phone" type="text" v-mode="phone">

                            <label for="mobile">Celular:</label>
                            <input name="mobile" type="text" v-model="mobile">

                            <button type="submit">Enviar</button>
                        </form>

                    </slot>
                </div>

                <div class="modal__footer">
                    <slot name="footer">
                        default footer
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
        const nome = ref('');
        const email = ref('');
        const phone = ref('');
        const mobile = ref('');

        const submitContact = () => {
            const payload = {
                name: nome.value,
                email: email.value,
                phone: phone.value,
                mobile: mobile.value
            };
            emit('contact-data', payload);
            nome.value = '';
            email.value = '';
            phone.value = '';
            mobile.value = '';
        }

        return {
            nome,
            email,
            phone,
            mobile,
            submitContact
        }
    }
}
</script>
