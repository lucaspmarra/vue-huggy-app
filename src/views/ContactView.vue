<template>
    <main class="contact">
        <h2 class="contact__header">Contatos</h2>
        <section class="contact__wrapper">
            <article>
                <input name="" id="" placeholder="Buscar contato">
                <button>Adicionar Contato</button>
            </article>
            <table>
                <caption class="contact__caption">Lista de contatos</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <hr>
                    <tr v-for="contact in results" :key="contact.id">
                        <td><img class="contact__photo" :src="contact.photo_small" alt="profile photo"></td>
                        <div>
                            <td v-if="contact.name == ''">-</td>
                            <td v-else>{{ contact.name }}</td>
                        </div>
                        <td>{{ contact.email }}</td>
                        <td>{{ contact.mobile }}</td>

                        <td>
                            <EditButton />
                            <DeleteButton @click="deleteContact(contact.id)" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
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
            deleteContact

        };

    },
}
</script>

<style lang="scss" scoped>

</style>