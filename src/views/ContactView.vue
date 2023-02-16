<template>
    <main class="contact">
        <h2 class="contact__header">Contatos</h2>
        <section class="contact__wrapper">
            <article class="contact__actions">
                <input type="text" placeholder="Buscar contato" class="contact__search">
                <button class="contact__create"><span class="contact__create__icon">Adicionar Contato</span></button>
            </article>

            <table>
                <caption class="contact__caption">Lista de contatos</caption>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th></th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="contact in results" :key="contact.id">
                        <td><img class="contact__photo" :src="contact.photo_small" alt="profile photo">
                        </td>
                        <td>{{ contact.name || '-' }} </td>
                        <td>{{ contact.email || '-' }}</td>
                        <td>{{ contact.mobile || '-' }}</td>
                        <td>
                            <EditButton />
                            <DeleteButton @click="deleteContact(contact.id)" />
                        </td>
                    </tr>

                </tbody>
            </table>
        </section>
        <!-- 
        <Modal :showModal="show" @close="show = false">
            <template #header>
                <p>teste</p>
            </template>
            <template #body>
                <p>teste</p>
            </template>
        </Modal>
        <button @click="toggleModal" type="button">Open</button> -->
    </main>
    <!-- <pre>{{ results }}</pre> -->
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import EditButton from '@/components/EditButton.vue';
import DeleteButton from '@/components/DeleteButton.vue'
import Modal from '@/components/Modal.vue'

const BearerToken = import.meta.env.VITE_BEARER_TOKEN

export default {
    components: { EditButton, DeleteButton, Modal },
    setup () {
        const loading = ref(true);
        const results = ref([]);
        const error = ref(null);
        const show = ref(false);


        const toggleModal = () => {
            show.value = !show.value;
        }

        const api = axios.create({
            baseURL: 'https://api.huggy.app/v3',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${BearerToken}`
            }
        })
        const state = reactive({
            id: null,
            isLoading: false,
            error: null,
        })

        const getContacts = async () => {
            try {
                const response = await api.get('/contacts')
                results.value = response.data
                console.log(results.value);
            } catch (error) {
                console.log(error);
                error.value = error;
            } finally {
                loading.value = false;
            }
        };

        const deleteContact = async (id) => {
            state.isLoading = true;
            try {
                await api.delete(`/contacts/${id}`);
                state.isLoading = false;
                state.id = null;
                alert('Deletado')
            } catch (error) {
                state.error = error;
                state.isLoading = false;
            } finally {
                getContacts() // make a call and refresh component

            }
        }

        onMounted(getContacts);

        return {
            state,
            loading,
            results,
            error,
            show,
            toggleModal,
            deleteContact,


        };

    },
}
</script>

<style lang="scss" scoped>

</style>