<template>
    <main class="contact">
        <h2 class="contact__header">Contatos</h2>
        <section class="contact__wrapper">
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
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.email }}</td>
                        <td>{{ contact.mobile }}</td>
                        <!-- <td><img :src="editButton" alt=""><img :src="deleteButton" alt=""></td> -->
                        <td>
                            <EditButton />
                            <DeleteButton />
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
    <!-- <pre>{{ results }}</pre> -->
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import EditButton from '@/components/EditButton.vue';
import DeleteButton from '@/components/DeleteButton.vue'
const BearerToken = import.meta.env.VITE_BEARER_TOKEN

export default {

    setup () {
        const loading = ref(true);
        const results = ref([]);
        const error = ref(null);


        const getContacts = async () => {
            try {
                const response = await axios.get('https://api.huggy.app/v3/contacts',
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${BearerToken}`
                        }
                    });
                results.value = response.data
                console.log(results.value);
            } catch (error) {
                console.log(error);
                error.value = error;
            } finally {
                loading.value = false;
            }
        };

        onMounted(getContacts);

        return {
            loading,
            results,
            error,
        };

    },
    components: {
        EditButton,
        DeleteButton
    }
}
</script>

<style lang="scss" scoped>

</style>