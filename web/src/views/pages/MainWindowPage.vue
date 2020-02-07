<template>
    <b-container class="main-page">
        <b-row id="search-row" align-h="center" >
            <b-col cols="6">
                <input-search ref="inputSearch" @search="handleSearch" />
            </b-col>
        </b-row>
        <b-row id="searches-container" align-h="center" align-content="center">
            <b-col cols="12">
                <carousel v-if="cards.length">
                    <template v-slot:card>
                        <card
                            @click.native="handleCardClick(card)"
                            v-for="(card) in cards"
                            :key="card.id"
                            :card="card"
                        />
                    </template>
                </carousel>
                <div v-else
                     class="text-center text-secondary font-italic"
                >{{$t("searchView.messages.noSearches")}}</div>
            </b-col>
        </b-row>
        <b-dropdown variant="primary" class="btn-new" :text="$t('searchView.new')">
            <b-dropdown-item @click="showModal()">{{$t("searchView.monitoring")}}</b-dropdown-item>
        </b-dropdown>
        <wizard ref="wizard" v-if="showWizard" @close="showWizard=false" />
    </b-container>
</template>

<script>
    import { getMySearches, scheduleSearch } from '../../api/search';
    import InputSearch from '../components/InputSearch';
    import Carousel from '../components/Carousel';
    import Card from '../components/Card';
    import Wizard from '../components/wizard/Wizard';

    export default {
        name: 'main-window',
        components: {
            InputSearch,
            Carousel,
            Card,
            Wizard
        },
        data () {
            return {
                text: '',
                data: '',
                language: 'pt-br',
                cards: [],
                showWizard: false
            };
        },
        async mounted () {
            await this.loadSavedSearchs(true);
        },
        methods: {
            async loadSavedSearchs () {
                this.$loadingPlugin.show();
                const response = await getMySearches();
                this.$loadingPlugin.hide();

                if (!response.ok) {
                    this.cards = [];
                    await this.$errorHandler.handleResponse(response);
                } else {
                    this.cards = await response.json();
                }
            },
            async handleSearch (payload) {
                this.$loadingPlugin.show();
                const response = await scheduleSearch(payload);
                this.$loadingPlugin.hide();

                if (!response.ok) {
                    await this.$errorHandler.handleResponse(response);
                } else {
                    const cardInfo = await response.json();
                    this.$refs.inputSearch.clear();
                    this.$notify({
                        group: 'app',
                        text: this.$t('searchView.messages.success'),
                        type: 'success'
                    });
                    cardInfo.id = new Date().getMilliseconds();
                    this.cards.unshift(cardInfo);
                }
            },
            handleCardClick (card) {
                if (card.status === 'SUCCESS' || card.status === 'PARTIAL_SUCCESS') {
                    this.$router.push(`/grid-window/${card.id}`);
                    return;
                }

                let key = 'searchView.messages.unfinishedSearch';
                if (card.status === 'ERROR') {
                    key = 'searchView.messages.errorSearch';
                }
                this.$notify({
                    group: 'app',
                    text: this.$t(key),
                    type: 'warning'
                });
            },
            showModal () {
                this.showWizard = true;
            }
        }
    };
</script>

<style lang="scss">
    #search-row {
        padding: 3.575rem 0;
    }
    .btn-new{
        margin-left: 2.75rem;
    }
</style>
