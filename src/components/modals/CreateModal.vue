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
                        <label for="name">Nome:</label>
                        <input name="name" type="text" v-model="nome">
                        {{ nome }}
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

    setup () {
        const nome = ref('');

        return {
            nome,
        }
    }
}
</script>
