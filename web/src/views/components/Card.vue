<template>
    <div class="gui-card">
        <div class="row_inner">
            <div ref="cardStatus"
                 :class="`${card.status.toLowerCase()} status-bar`"
                 :title="$t(`status.${card.status}`)"/>
            <div @mouseover="hover = true"
                 @mouseleave="hover = false" :class="{'card-body hover': hover === true,
                                                      'card-body': hover === false}">
                <p class="gui-card-search">
                    {{$t('searchView.search')}}
                    <i :class="`${icons[card.status]} text-secondary gui-card-icon`"
                       :title="$t(`status.${card.status}`)"
                       aria-hidden="true"/>
                </p>
                <h4 class="gui-card-title" :title="card.text"> {{card.text}}</h4>
                <p class="gui-card-source" :title="card.sources.join(', ')">
                    {{$t('searchView.source')}}: {{card.sources.join(', ')}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { getStatus } from '../../api/status';

    export default {
        props: ['card'],
        data () {
            return {
                hover: false,
                icons: {
                    SCHEDULED: 'fas fa-clock',
                    EXECUTING: 'fas fa-search',
                    SUCCESS: 'fas fa-check-circle',
                    PARTIAL_SUCCESS: 'fas fa-exclamation-triangle',
                    ERROR: 'fas fa-exclamation-circle'
                }
            };
        },
        created () {
            this.checkAndUpdateStatus();
        },
        methods: {
            checkAndUpdateStatus () {
                if (this.card.status === 'SCHEDULED' || this.card.status === 'EXECUTING') {
                    setTimeout(async () => {
                        const response = await getStatus(this.card.id);

                        if (response.ok) {
                            this.card.status = await response.text();
                            this.checkAndUpdateStatus();
                        } else {
                            this.$errorHandler.handleResponse(response);
                        }
                    }, 2000);
                }
            }
        }
    };
</script>

<style lang="scss">
    .gui-card {
        position: relative;
        display: inline-block;
        width: 11.95rem;
        min-width: 11.95rem;
        max-width: 11.95rem;
        height: 5.3125rem;
        font-size: 1.25rem;
        cursor: pointer;
        -webkit-transition: 450ms all;
        transition: 450ms all;
        box-shadow: 0.125rem 0.125rem 0.125rem rgba(0, 0, 0, .1);

        .status-bar {
            width: 0.5rem;
            height: 5.3125rem;
            background-color: #ecf0f1;
        }

        .scheduled {
            background-color: #FF9933;
        }

        .executing {
            background-color: #CCCC00;
        }

        .success {
            background-color: #009900;
        }

        .partial_success {
            background-color: #fff22f;
        }

        .error {
            background-color: #CC0000;
        }

        .row_inner {
            -webkit-transition: 450ms -webkit-transform;
            transition: 450ms transform, 450ms -webkit-transform;
            font-size: 0.625rem;
            white-space: nowrap;
            display: flex;
            width: 100%;

            .hover {
                background-color: rgb(250, 250, 250) !important;
                -webkit-box-shadow: 1px 3px 10px 3px rgba(0, 0, 0, 0.1) !important;
                -moz-box-shadow: 1px 3px 10px 3px rgba(0, 0, 0, 0.1) !important;
                box-shadow: 1px 3px 10px 3px rgba(0, 0, 0, 0.1) !important;
            }

            .card-body {
                width: 9.6875rem;
                height: 100%;
                padding: 0.3125rem 0.3125rem 0.3125rem 0;
                background-color: #ffffff;

                .gui-card-search {
                    bottom: 0;
                    padding-left: 0.3125rem
                }

                .gui-card-icon {
                    position: absolute;
                    top: 0.3125rem;
                    right: 0.3125rem;
                }

                .gui-card-title {
                    bottom: 0;
                    padding: 0.575rem 0.625rem 0 0.3125rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .gui-card-source {
                    bottom: 0;
                    padding: 0 0.625rem 0.575rem 0.3125rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }

                h4 {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 1.1rem;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }

                p {
                    text-align: left;
                    width: 100%;
                    color: #7f8c8d;
                    max-width: 31.25rem;
                    margin: auto;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            }
        }
    }
</style>
