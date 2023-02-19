<template>
    <Transition name="showModal">
        <section v-if="showModal" class="modal__mask">
            <div class="modal__container">
                <div class="modal__header">
                    <slot name="header">
                        <div class="modal__title">
                            <img class="contact__photo" :src="data.photo_small" alt="profile photo">
                            <h2 class="modal__name">{{ data.name || '-' }}</h2>
                        </div>
                        <div class="modal__buttons">
                            <EditIcon />
                            <DeleteIcon @click="$emit(data.id)" />
                            <span class="modal__close__button" @click="$emit('close')"></span>
                        </div>
                    </slot>
                </div>
                <hr class="modal__hr">
                <div class="modal__body">
                    <slot name="body">
                        <section class="modal__body__first">
                            <p>Email</p>
                            <p>Endereço</p>
                            <p>Bairro</p>
                            <p>Cidade</p>
                            <p>Estado</p>
                        </section>

                        <section class="modal__body__second">
                            <p>{{ data.email || '-' }}</p>
                            <p>{{ data.address || '-' }}</p>
                            <p>{{ data.district || '-' }}</p>
                            <p>{{ data.city || '-' }}</p>
                            <p>{{ data.state || '-' }}</p>
                        </section>
                    </slot>
                </div>
            </div>
        </section>
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
