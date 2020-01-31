<template>
    <div class="grid-page">
        <ai-toolbar/>
        <div class="content" >
            <section class="collections-section-bar">
                <div class="collections-button" @mouseover="handleHoverCollections" @mouseout="handleHoverCollections" @click="handleClickCollections"
                     :class="{'active': selectedCollection === true,
                              'active': hoverCollection === true,
                              'text-hidden-collections': hoverCollection === false}">
                    <div class="divider-collections" >
                        <div class="collections-bar-button" :class="{'selected-collections': selectedCollection === true,
                                                             'text-hidden-collections': hoverCollection === false}">
                            <button class="collections-btn-icon">
                                <em class="fas fa-project-diagram" :title="$t('searchResult.collections')"/>
                            </button>
                        </div>
                        <h6 class="collections-text-button" :class="{'hidden-collections': hoverCollection === false || hoverCollection === true && selectedCollection === true,
                                                        'show-collections': hoverCollection === true && selectedCollection === false}">{{$t('searchResult.collections')}}</h6>
                    </div>
                </div>
            </section>
            <dgt-layout name="collections-section" class="collections-section" :class="{'hidden-collections':selectedCollection === false}">
                <div class="collections-header">
                    <h6 class="collections-title" :title="$t('searchResult.collections')">{{$t('searchResult.collections')}}</h6>
                    <em class="fas fa-minus collections-icon-minimize" @click="handleClickCollections" :title="$t('searchResult.detail.minimize')"/>
                </div>
            </dgt-layout>
            <dgt-layout name="main-section" class="main-section" :horizontal-resizable="selected">
                <div class="main-content">
                    <header class="header-content">
                        <div class="actions-bar">
                            <div class="right-button">
                                <button class="btn-icon" @click="handleSendFor">
                                    <i class="fas fa-share-square" :title="$t('toolbar.sendFor')" aria-hidden="true"/>
                                </button>
                            </div>
                        </div>
                    </header>
                    <section class="grid-content">
                        <h4 class="no-item text-center text-secondary font-italic" v-if="results.length === 0">{{$t('searchResult.noItem')}}</h4>
                        <div class="search-item"
                             :class="{'search-selected': itemSelected.selected === true && result.id === itemSelected.itemId}"
                             v-for="(result) in results" v-else :key="result.id">
                            <generic-grid-line-result class="search-result" :key="result.id"
                                                      @click.native="retrieveDataDetail(result.id) && clickSearch()" :result="result" :header="headers[result.entity]"/>
                        </div>
                    </section>
                    <footer class="footer-content">
                        <dgt-pagination
                        class="search-pagination"
                        :total-registers="this.totalRegisters"
                        :current-page="this.pageNumber"
                        :dictionary="this.dictionary"
                        @paginate="paginate"
                        @change-page-size="changePageSize"/>
                    </footer>
                </div>
            </dgt-layout>
            <dgt-layout name="details-section" class="details-section" :class="{'hidden-detail':selected === false}">
                <div class="detail-header">
                    <h6 class="detail-title" :title="$t('searchResult.detail.details')">{{$t('searchResult.detail.details')}}</h6>
                    <em class="fas fa-minus detail-icon-minimize" @click="handleClickDetails" :title="$t('searchResult.detail.minimize')"/>
                </div>
                <h4 class="detail-no-item text-center text-secondary font-italic" v-if="!itemId || itemId === 0">{{$t('searchResult.detail.noDetail')}}</h4>
                <generic-detail-result :result="this.detailEntity" :key="this.detailEntity.id" v-else />
            </dgt-layout>
            <dgt-layout name="toolbar-details-section" class="toolbar-details-section">
                <div class="details-button" @mouseover="handleHover" @mouseout="handleHover" @click="handleClickDetails"
                     :class="{'active': selected === true,
                              'active': hover === true,
                              'hidden text-hidden': hover === false}">
                    <div class="divider" >
                        <h6 class="text-button" :class="{'hidden': hover === false || hover === true && selected === true,
                                                        'show': hover === true && selected === false}">
                            {{$t('searchResult.detail.details')}}
                        </h6>
                        <div class="bar-button" :class="{'selected': selected === true,
                                                         'bar-hidden': hover === false && selected === false}">
                            <button class="btn-icon">
                                <em class="far fa-address-card" :title="$t('searchResult.detail.details')"/>
                            </button>
                        </div>
                    </div>
                </div>
            </dgt-layout>
        </div>
    </div>
</template>

<script>
    import GenericGridLineResult from '../components/GenericGridLineResult';
    import GenericDetailResult from '../components/GenericDetailResult';
    import AiToolbar from '../components/utils/AiToolbar';
    import dgtLayout from 'dgt-vue-components/dgt-layout';
    import dgtPagination from 'dgt-vue-components/dgt-pagination';
    import { retrieve, retrieveDetail } from '../../api/search';

    export default {
        name: 'SearchResult',
        components: {
            GenericGridLineResult,
            AiToolbar,
            dgtLayout,
            dgtPagination,
            GenericDetailResult
        },
        props: {
            searchId: String
        },
        data () {
            return {
                language: 'pt-br',
                results: [],
                headers: {},
                detailItem: {},
                detailEntity: {},
                totalRegisters: 0,
                hover: false,
                selected: false,
                hoverCollection: false,
                selectedCollection: false,
                itemSelected: {
                    selected: false,
                    itemId: 0
                },
                dictionary: {
                    showing: this.$t('pagination.showing'),
                    first: this.$t('pagination.first'),
                    prev: this.$t('pagination.prev'),
                    page: this.$t('pagination.page'),
                    of: this.$t('pagination.of'),
                    next: this.$t('pagination.next'),
                    last: this.$t('pagination.last'),
                    registers: this.$t('pagination.registers'),
                    currentPage: this.$t('pagination.currentPage'),
                    itemsPerPage: this.$t('pagination.itemsPerPage')
                },
                pageNumber: 1,
                pageSize: 10,
                itemId: 0
            };
        },
        async mounted () {
            this.totalRegisters = 0;
            await this.retrieveData(this.getPayload());
            if (this.results.length) {
                this.itemId = this.results[0].id;
                await this.retrieveDataDetail(this.itemId);
            }
        },
        methods: {
            async retrieveDataDetail (recordId) {
                this.itemSelected.selected = true;
                this.itemSelected.itemId = recordId;
                this.itemId = recordId;
                this.$loadingPlugin.show();
                const response = await retrieveDetail(recordId, this.$i18n.locale);
                this.$loadingPlugin.hide();

                if (!response.ok) {
                    this.detailItem = {};
                    await this.$errorHandler.handleResponse(response);
                } else {
                    this.detailItem = await response.json();
                    this.detailEntity = this.detailItem.entities[0];
                }
            },
            async retrieveData (payload) {
                this.$loadingPlugin.show();
                const response = await retrieve(payload);
                this.$loadingPlugin.hide();

                if (!response.ok) {
                    this.results = [];
                    this.headers = null;
                    await this.$errorHandler.handleResponse(response);
                } else {
                    const data = await response.json();
                    this.results = data.results;
                    this.headers = data.headers;
                    this.totalRegisters = this.headers.total;

                    if (this.headers.error > 0) {
                        this.showErrors();
                    }
                }
            },
            showErrors () {
                this.$notify({
                    group: 'app',
                    text: `Não foi possível exibir ${this.headers.error} registro(s)`,
                    type: 'danger'
                });

                const ignoredKeys = ['total', 'error'];
                for (const entity of Object.keys(this.headers)) {
                    if (ignoredKeys.indexOf(entity) !== -1) {
                        continue;
                    }
                    const entityHeader = this.headers[entity];
                    if (entityHeader.error) {
                        this.$errorHandler.showError(entityHeader.error);
                    }
                }
            },
            getPayload () {
                const start = this.pageNumber === 1 ? 0 : (this.pageNumber - 1) * this.pageSize;
                return JSON.parse(`{ "locale":"${this.$i18n.locale}", "searchID": "${this.searchId}","page": { "start": ${start},"limit": ${this.pageSize}}}`);
            },
            clickSearch () {
                this.selected = true;
            },
            async changePageSize ([pageSize, currentPage]) {
                this.pageSize = pageSize;
                this.pageNumber = 1;
                await this.retrieveData(this.getPayload());
            },
            async paginate ([pageNumber, pageSize]) {
                this.pageNumber = pageNumber;
                await this.retrieveData(this.getPayload());
            },
            handleSendFor () {
            },
            handleClickDetails () {
                this.selected = this.selected === false;
            },
            handleHover () {
                this.hover = this.hover !== true;
            },
            handleClickCollections () {
                this.selectedCollection = this.selectedCollection === false;
            },
            handleHoverCollections () {
                this.hoverCollection = this.hoverCollection !== true;
            }
        }
    };
</script>

<style lang="scss">
    .grid-page {
        width: 100%;
        height: 100%;
        position: absolute;
        .content > * {
            flex: 1 1 auto;
        }
        .content {
            height: 95%;
            overflow: hidden;
            .collections-section-bar {
                position: relative;
                max-width: 2.9rem;
                min-width: 2.9rem;
                border-right: 0.0625rem solid RGBA(0, 0, 0, 0.15);
                .collections-button {
                    z-index: 1;
                    display: flex;
                    position: absolute;
                    outline: 0;
                    .text-hidden-collections {
                        left: 0;
                    }
                    &:hover {
                        border-right: 0;
                        text-align: left;
                        background-color: #e8e8e8;
                    }
                    .divider-collections {
                        display: flex;
                        .selected-collections {
                            border-right: 0.2rem solid rgba(13, 71, 161, 1);
                            padding: 0;
                        }
                        .collections-text-button {
                            padding: .6rem .5rem 0 .5rem;
                            cursor: pointer;
                            text-transform: uppercase;
                            &.hidden-collections {
                                position: relative;
                                display: none;
                                opacity: 0;
                                transition: max-width .2s ease-in-out !important;
                            }
                            &.show-collections {
                                display: block;
                            }
                        }
                        .collections-bar-button {
                            .text-hidden-collections {
                                left: 0 !important;
                            }
                            .collections-btn-icon {
                                background-color: transparent;
                                border: none;
                                text-decoration: none;
                                color: #424242;
                                font-size: 1.3em;
                                padding: .39em .55em .39em .6em;
                                vertical-align: top;
                                cursor: pointer;
                                transition: background-color .2s ease-in-out;
                                .text-hidden-collections {
                                    left: 0 !important;
                                }
                                &:focus {
                                    outline: none !important;
                                }
                            }
                        }
                    }

                }
            }
            .collections-section {
                position: relative;
                grid-template-columns: var(--dgt-layout-grid-template, auto 0px);
                max-width: 15%;
                min-width: 15%;
                width: 0;
                flex-grow: 1;
                opacity: 1;
                transition: min-width .4s cubic-bezier(.465, .183, .153, .946);
                border-right: 0.0625rem solid RGBA(0, 0, 0, 0.15);
                .collections-header {
                    height: 2.35rem;
                    border-bottom: 0.0625rem solid RGBA(0, 0, 0, 0.15);
                    display: flex;
                    text-transform: uppercase;
                    .collections-title {
                        position: relative;
                        top: .53rem;
                        left: .8rem;
                        font-size: .9rem;
                    }
                    .collections-icon-minimize {
                        position: absolute;
                        top: .6rem;
                        right: 1.4em;
                        cursor: pointer;
                    }
                }
                &.hidden-collections {
                    max-width: 0 !important;
                    min-width: 0 !important;
                    opacity: 0;
                    pointer-events: none;
                    transition: min-width .4s cubic-bezier(.465, .183, .153, .946);
                    will-change: flex-basis;
                }
            }
            .main-section{
                flex-basis: 75%;
                align-items: stretch;
                min-width: 600px;
                .main-content {
                    position: relative;
                    .header-content{
                        width: 100%;
                        .actions-bar{
                            border-bottom: 0.0625rem solid RGBA(0, 0, 0, 0.15);
                            height: 2.3125rem;
                            display: flex;
                            .right-button {
                                float: right;
                                position: absolute;
                                right: 0;
                                .btn-icon {
                                    background-color:transparent;
                                    border: none;
                                    text-decoration: none;
                                    color: #424242;
                                    font-size: 1.3em;
                                    padding: .39em .645em;
                                    vertical-align: top;
                                    cursor: pointer;
                                    &:focus {
                                        outline: none !important;
                                    }
                                }
                            }
                        }
                    }
                    .grid-content {
                        position: relative;
                        margin: .1rem 0;
                        padding: .3rem 0;
                        overflow: scroll;
                        overflow-x: hidden;
                        height: auto;
                        background-color: #fff;
                        .no-item {
                            position: relative;
                            top: 1rem;
                        }
                        .card-text {
                            height: 3.9rem;
                            overflow: hidden;
                        }
                        .search-result {
                            &:hover {
                                background-color: rgb(248, 248, 248);
                                box-shadow: 1px 1px 5px 1px rgba(0,0,0,.2)!important;
                                cursor: pointer;
                                .card-text {
                                    &:after {
                                        background: rgb(248, 248, 248);
                                    }
                                }
                            }
                        }
                        .search-item {
                            padding: .4rem 1rem .4rem 1rem;
                            margin: 0 .3rem;
                        }
                        .search-selected {
                            background-color: #cacaca;
                            border-radius: 5px;
                            margin: 0 .3rem;
                            padding: .4rem 1rem .4rem 1rem;
                        }
                    }
                    .footer-content {
                        border-top: .0625rem solid rgba(0, 0, 0, .15);
                        .custom-pagination {
                            --dgt-grid-template-columns: 190px 1fr 210px;
                        }
                    }
                }
            }
            .details-section {
                position: relative;
                max-width: 28%;
                min-width: 0;
                margin-right: -.3rem;
                flex-basis: 25%;
                flex-grow: 1;
                opacity: 1;
                transition: max-width .4s cubic-bezier(.465, .183, .153, .946);
                .detail-header {
                    height: 2.35rem;
                    border-bottom: 0.0625rem solid RGBA(0, 0, 0, 0.15);
                    display: flex;
                    text-transform: uppercase;
                    .detail-title {
                        position: relative;
                        top: .53rem;
                        left: 1.2rem;
                        font-size: .9rem;
                    }
                    .detail-icon-minimize {
                        position: absolute;
                        top: .6rem;
                        right: 1.4em;
                        cursor: pointer;
                    }
                }
                .detail-no-item {
                    position: relative;
                    top: 1rem;
                    font-size: 1rem;
                }
                &.hidden-detail {
                    max-width: 0 !important;
                    min-width: 0 !important;
                    opacity: 0;
                    pointer-events: none;
                    transition: max-width .4s cubic-bezier(.465, .183, .153, .946);
                    will-change: flex-basis;
                }
            }
            .toolbar-details-section {
                border-left: 0.0625rem solid RGBA(0, 0, 0, 0.15);
                position: relative;
                max-width: 2.9rem;
                min-width: 2.9rem;
                .details-button {
                    display: flex;
                    position: absolute;
                    outline: 0;
                    right: 0;
                    &.text-hidden {
                        left: 0;
                    }
                    &:hover {
                        margin-right: .2rem;
                        border-left: 0;
                        padding: 0 .2rem;
                        text-align: left;
                        background-color: #e8e8e8;
                    }
                    .divider {
                        display: flex;
                        .selected{
                            border-left: 0.2rem solid rgba(13, 71, 161, 1);
                        }
                        .text-button {
                            padding: .6rem 0 0 .5rem;
                            cursor: pointer;
                            text-transform: uppercase;
                            &.hidden {
                                position: relative;
                                display: none;
                                opacity: 0;
                            }
                            &.show {
                                padding-left: 1rem;
                                display: block;
                            }
                        }
                        .bar-button {
                            &.bar-hidden {
                                padding-left: .2rem;
                            }
                            .btn-icon {
                                background-color: transparent;
                                border: none;
                                text-decoration: none;
                                color: #424242;
                                font-size: 1.3em;
                                padding: .39em .3em .39em .6em;
                                vertical-align: top;
                                cursor: pointer;
                                transition: background-color .2s ease-in-out;
                                .text-hidden {
                                    left: 0 !important;
                                }
                                &:focus {
                                    outline: none !important;
                                }
                            }
                        }
                    }

                }
            }
            .no-border {
                border: 0 !important;
                padding-right: .2rem;
            }
        }
    }
</style>
