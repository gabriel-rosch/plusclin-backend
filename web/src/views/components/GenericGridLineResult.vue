<template>
        <b-card no-body class="overflow-hidden line-grid">
            <b-row no-gutters>
                <b-col md="2" class="search-card-image">
                    <b-card-img v-if="result && result.image" :src="result.image" class="rounded-0"/>
                    <em v-else class="far fa-image large"/>
                </b-col>
                <b-col md="10" class="card-body">
                    <b-card-header class="search-card-header">
                        <b-col md="7" class="no-paddings">
                        <h4 class="search-card-title" :title="result.title"> {{result.title}}</h4>
                        </b-col>
                        <b-col md="3" class="no-paddings">
                        <p class="search-card-date" v-if="result.refDate" :title="result.refDate | datetime('long')" > {{ result.refDate | datetime('long')}}</p>
                        <p class="search-card-date" v-else :title="$t('searchResult.noDate')" > {{$t('searchResult.noDate')}}</p>
                        </b-col>
                        <b-col md="1" class="no-paddings"/>
                        <b-col md="1" class="no-paddings">
                        <em :class="{
                        'fab fa-wikipedia-w source-card-icon':result.source === 'wikipedia',
                        'fas fa-database source-card-icon':result.source === 'bc',
                        'fas fa-question-circle source-card-icon':result.source === 'g1'}" class="" :title="$t(`sources.${result.source}`)"/>
                        <em :class="`${header.config.icon} search-card-icon`" :title="header.config.title"/>
                        </b-col>
                    </b-card-header>
                    <b-card-text v-if="header.config.template.type === 'key-value'">
                        <div v-html="processedResult" class="search-card-description"/>
                    </b-card-text>
                    <p class="search-card-text search-card-description" :title="processedResult" v-else>{{processedResult}}</p>
                </b-col>
            </b-row>
        </b-card>
</template>

<script>

    export default {
        name: 'genericGridLineResult',
        props: {
            result: Object,
            header: Object
        },
        data () {
            return {
                processedResult: ''
            };
        },
        mounted () {
            if (this.header.config.template.type === 'text') {
                this.processTextResult();
            } else {
                this.processKeyValueResult(this.result);
            }
        },
        methods: {
            processTextResult () {
                const { data } = this.result;
                const field = this.header.config.template.fields[0];
                this.processedResult = data[field];
            },
            processKeyValueResult (result, parent) {
                let data = result;
                if (result.data) {
                    data = result.data;
                }

                for (const prop of Object.keys(data)) {
                    const value = data[prop];

                    if (value instanceof Array) {
                        for (const item of value) {
                            const key = this.concatPropertyKey(parent, prop);
                            this.processKeyValueResult(item, key);
                        }
                    } else if (value instanceof Object) {
                        this.processKeyValueResult(value, prop);
                    } else {
                        const key = this.concatPropertyKey(parent, prop);
                        this.processedResult += `<strong>${(this.header.i18n && this.header.i18n[key]) || key}: </strong>${this.scapeHTML(value)} `;
                    }
                }
            },
            concatPropertyKey (parent, prop) {
                if (!parent) {
                    return prop;
                }
                return `${parent}.${prop}`;
            },
            scapeHTML (text) {
                return String(text).replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            }
        }
    };
</script>

<style lang="scss">
    .card {
        margin-bottom: 0.625rem;
        &.line-grid {
            &:last-child {
                margin-bottom: 0;
            }
            .card-body {
                max-height: 8rem;
                min-height: 8rem;
                padding: 0;
            }
        }
        .search-card-header{
            display: flex;
            margin: 0;
            .no-paddings {
                padding: 0!important;
            }
            .search-card-title {
                bottom: 0;
                padding: 0.575rem 0.625rem 0 0.5125rem;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 35rem;
                white-space: nowrap;
                font-size: 1.1rem;
            }
            .search-card-date {
                position: relative;
                top: .7rem;
                right: -1rem;
            }
            .source-card-icon {
                position: relative;
                top: .5rem;
                right: 0;
                font-size: 1.25rem;
            }
            .search-card-icon {
                position: relative;
                top: .5rem;
                right: -1rem;
                font-size: 1.25rem;
            }
        }
        .search-card-text {
            width: 100%;
            color: #7f8c8d;
            padding: 0 1.625rem 0 1.3125rem;
            overflow: hidden;
            position: relative;
            max-height: 3.5rem;
            &:before {
                content: '...';
                position: absolute;
                right: 0.8rem;
                bottom: 0;
            }
            &:after {
                content: '';
                position: absolute;
                right: 0.8rem;
                width: 1em;
                height: 1em;
                margin-top: 0.2em;
                background: white;
            }
        }
        .card-text {
            color: #7f8c8d;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: .3rem;
            max-height: 3.5rem !important;
            padding: 0 1.625rem 0 1.4125rem;
            &:before {
                content: '...';
                color: #7f8c8d;
                position: absolute;
                right: 0.8rem;
                bottom: 0;
            }
            &:after {
                content: '';
                position: absolute;
                right: 0.8rem;
                width: 1em;
                height: 1em;
                margin-top: 0.2em;
                background: white;
            }
        }
        .search-card-image {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 7rem;
            border-right: 1px solid #c7c7c7f5;
            .card-img {
                height: 100%;
                width: 100%;
            }
            .large {
                font-size: 5rem;
                color: #d8d8d8;
            }
        }
    }
</style>
