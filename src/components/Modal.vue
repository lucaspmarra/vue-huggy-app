<template>
    <Transition name="showModal">
        <div v-if="showModal" class="modal_mask">
            <div class="modal_container">
                <div class="modal_header">
                    <slot name="header">
                        <h2>Nome: {{ data.name || '-' }}</h2>
                    </slot>
                </div>

                <div class="modal_body">
                    <slot name="body">
                        <p>Email: {{ data.email || '-' }}</p>
                        <p>Endereço: {{ data.address || '-' }}</p>
                        <p>Bairro: {{ data.district || '-' }}</p>
                        <p>Cidade: {{ data.city || '-' }}</p>
                        <p>Estado: {{ data.state || '-' }}</p>
                    </slot>
                </div>

                <div class="modal_footer">
                    <slot name="footer">
                        <span class="modal__close__button" @click="$emit('close')"></span>
                        <EditIcon />
                        <DeleteIcon @delete-contact="deleteContact(data.id)" />
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { computed } from 'vue';
import DeleteIcon from '@/components/DeleteIcon.vue'
import EditIcon from '@/components/EditIcon.vue';
export default {
    name: 'Modal',
    components: { DeleteIcon, EditIcon },
    props: ({
        showModal: Boolean,
        toggleModal: Boolean,
        data: Object,
    }),
    setup (props) {
        const shouldShow = computed(() => {
            return !!props.data;
        })
        return { shouldShow }
    }
}


</script>
<style>
.modal_mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal_container {
    width: 600px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal_header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal_body {
    margin: 20px 0;
}

.modal__edit__button {
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    float: right;
    background-image: url('@/assets/icons/edit.svg');
}

.modal__delete__buton {
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    float: right;
    background-image: url('@/assets/icons/delete.svg');
}

.modal__close__button {
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    float: right;
    background-image: url('@/assets/icons/close.svg');
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>