<template>
    <div id="search-container">
        <i class="fas fa-search text-secondary" aria-hidden="true" />
        <b-input id="searchInput" v-model="searchText" @keypress.enter="search"
                 :placeholder="$t('searchView.inputSearch')" />
        <b-dropdown :title="$t('searchView.sourceDropdown')" no-caret>
            <template slot="button-content">
                <i id="sourceIcon" class="fas fa-database text-secondary" aria-hidden="true" />
            </template>
            <b-dropdown-form>
                <b-form-group>
                    <b-form-checkbox-group v-model="selectedSources" stacked id="sourcesList">
                        <b-form-checkbox value="bc" disabled>
                            {{$t('searchView.bc')}}
                        </b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
            </b-dropdown-form>
        </b-dropdown>
    </div>
</template>

<script>
    export default {
        name: 'input-search',
        data () {
            return {
                searchText: this.value,
                selectedSources: ['bc']
            };
        },
        methods: {
            search () {
                this.$emit('search', {
                    text: this.searchText,
                    sources: this.selectedSources
                });
            },
            clear () {
                this.searchText = '';
            }
        }
    };
</script>

<style lang="scss">
    #search-container {
        padding: .2rem;
        background-color: #fff;
        box-shadow: 0 0 .25rem .2rem rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 0 .25rem .2rem rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 0 .25rem .2rem rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;

        .fas {
            margin: 0 .75rem;
            font-size: 1.25rem;
        }

        .btn {
            padding: .4rem .05rem;
        }

        .dropdown-menu {
            min-width: max-content;
            padding: .25rem 0;

            &:focus {
                outline: none;
            }

            .custom-checkbox {
                margin: .25rem 0;
            }
        }

        .b-dropdown-form {
            &:focus {
                outline: none !important;
            }

            .form-group {
                margin-bottom: 0;
            }
        }

        fieldset div {
            outline: none;
        }

        input {
            height: 2rem;
            border: none;
            outline: none;
            box-shadow: none;
            background-color: transparent;
        }
    }
</style>
