<template>
    <div class="component">
        <div class="input">
            <i  v-if="this.icon" class="icon fas fa-search" aria-hidden="true"/>
            <input type="text" class="form-control input-content"
                   v-model="inputText"
                   @keyup="filter"
                   :placeholder="this.placeholder">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'icon-input',
        props: {
            placeholder: String,
            icon: Boolean
        },
        data () {
            return {
                inputText: this.value
            };
        },
        methods: {
            filter () {
                this.$emit('filter', {
                    text: this.inputText
                });
            }
        }
    };
</script>
<style lang="scss">
    .component {
        .input {
            display: flex;
            border-bottom: rgba(0, 0, 0, 0.15) solid .1rem;
            font-size: 1rem;
            width: 100%;
        }
        .icon {
            color: rgba(0, 0, 0, 0.26);
        }
        .input-content {
            background-color: transparent;
            box-shadow: none;
            border: none;
            height: 80%;
            width: 100%;
        }
    }
</style>
