<template>
    <Transition name="createModal">
        <div v-if="showModal" class="modal_mask">
            <div class="modal_container">

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

<script setup>

</script>

<style lang="scss" scoped>

</style>