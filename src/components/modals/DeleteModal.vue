<template>
    <Transition name="deleteModal">
        <section v-if="deleteModal" class="modal__mask">
            <div class="modal__container">
                <div class="modal__header">
                    <slot name="header">
                        <div class="modal__title">
                            <h2>Excluir este contato?</h2>
                        </div>
                        <div class="modal__buttons">
                            <span class="modal__close__button" @click="$emit('close')"></span>
                        </div>
                    </slot>
                </div>
                <hr class="modal__hr">
                <div class="modal__body">
                    <slot name="body">
                        <p>Deletar?</p>
                        <p>ID: {{ data.id }}</p>
                        <p>Nome: {{ data.name }}</p>
                        <button @click="$emit('delete-contact')">Deletar</button>
                    </slot>
                </div>
            </div>
        </section>
    </Transition>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'DeleteModal',
    props: ({
        deleteModal: Boolean,
        toggleDeleteModal: Boolean,
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
