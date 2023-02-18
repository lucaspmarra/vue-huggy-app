<template>
    <Transition name="createModal">
        <div v-if="createModal" class="modal_mask">
            <div class="modal_container">
                <span class="modal__close__button" @click="$emit('close')"></span>
                <EditIcon />
                <DeleteIcon @click="deleteContact(result.id)" />
                <div class="modal_header">
                    <slot name="header">default header</slot>
                </div>

                <div class="modal_body">
                    <slot name="body">default body</slot>
                </div>

                <div class="modal_footer">
                    <slot name="footer">
                        default footer
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import DeleteIcon from '@/components/DeleteIcon.vue'
import EditIcon from '@/components/EditIcon.vue';
export default {
    components: { DeleteIcon, EditIcon },
    props: ({
        createModal: Boolean,
        toggleModal: Boolean,
    }),
}
</script>
<style lang="scss" scoped>
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