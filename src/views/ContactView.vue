<template>
    <main class="contact">
        <h2 class="contact__header">Contatos</h2>
        <section class="contact__wrapper">
            <div class="contact__actions">
                <input type="text" placeholder="Buscar contato" class="contact__search" v-model="searchQuery">
                <button class="contact__create"><img src="@/assets/icons/add.svg" class="contact__create__icon"
                        alt="Create icon">Adicionar Contato</button>
            </div>
            <section class="contact__empty" v-if="loading">
                <img src="@/assets/empty-book.svg"
                    alt="Ilustração de um livro vazio, demonstrando que não há nenhum conteúdo">
            </section>
            <table else>
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



                <section class="contact__error" v-if="error">
                    <h2>Stacktrace:</h2>
                    <p>{{ error.error }}</p>
                    <p>{{ error.message }}</p>
                    <div v-if="error.error === 'access_denied'">
                        <p>Por favor, verifique o token de autenticação.</p>
                    </div>

                </section>
                <tbody>
                    <tr v-for="contact in queryResults" :key="contact.id">
                        <td><img class="contact__photo" :src="contact.photo_small" alt="profile photo">
                        </td>
                        <td>{{ contact.name || '-' }} </td>
                        <td>{{ contact.email || '-' }}</td>
                        <td>{{ contact.mobile || '-' }}</td>
                        <td>
                            <EditIcon />
                            <DeleteIcon @click="deleteContact(contact.id)" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>

    <!-- <pre>{{ results }}</pre> -->
</template>

<script>
import { ref, onMounted, reactive, watchEffect } from 'vue';
import axios from 'axios';
import EditIcon from '@/components/EditIcon.vue';
import CreateIcon from '@/components/CreateIcon.vue';
import DeleteIcon from '@/components/DeleteIcon.vue'
import Modal from '@/components/Modal.vue'

const BearerToken = import.meta.env.VITE_BEARER_TOKEN

export default {
    components: { EditIcon, DeleteIcon, CreateIcon, Modal },
    setup () {
        const loading = ref(true);
        const results = ref([]);
        const error = ref(false);
        // const show = ref(false);
        const searchQuery = ref('');
        const queryResults = ref([]);


        const toggleModal = () => {
            show.value = !show.value;
        }

        const state = reactive({
            id: null,
            isLoading: false,
            error: null,
        });

        const api = axios.create({
            baseURL: 'https://api.huggy.app/v3',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${BearerToken}`
            }
        });

        const getContacts = async () => {
            try {
                const response = await api.get('/contacts')
                results.value = response.data
                console.log(results.value);
            } catch (isError) {
                console.log(isError.response.data);
                error.value = isError.response.data;
                console.log(`Error: ${error.response.data.error}, \nhint: ${error.response.data.hint}, \nmessage: ${error.response.data.message}`);
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


        watchEffect(() => {
            const regex = new RegExp(searchQuery.value
                .split(/\s+/)
                .map(word => {
                    return word.replace(/[áàäâ]/gi, '[aáàäâ]')
                        .replace(/[éèëê]/gi, '[eéèëê]')
                        .replace(/[íìïî]/gi, '[iíìïî]')
                        .replace(/[óòöô]/gi, '[oóòöô]')
                        .replace(/[úùüû]/gi, '[uúùüû]');
                })
                .join('\\s+'), 'i');
            queryResults.value = results.value.filter(contact => {
                return regex.test(contact.name) || regex.test(contact.email);
            });
        })

        onMounted(getContacts);

        return {
            state,
            loading,
            results,
            error,
            // show,
            toggleModal,
            deleteContact,
            searchQuery,
            queryResults
        };

    },
}
</script>

<style lang="scss" scoped>

</style>