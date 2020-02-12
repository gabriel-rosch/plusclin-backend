<template>
    <div class="app-container">
        <notifications group="app"
                       position="top center"
                       id="appMessage"
                       :ignoreDuplicates="true"
        >
            <template slot="body" slot-scope="props">
                <b-alert :variant="props.item.type" show class="m-2 text-center">{{props.item.text}}</b-alert>
            </template>
        </notifications>
        <router-view v-if="loaded"/>
        <b-row v-if="auditinError" class="align-items-center h-100">
            <b-col cols="12">
                <h3 class="errorText text-center text-danger font-italic"
                >{{$t("app.loadingError")}}</h3>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import { auditModuleLoaded } from './api/audit';

    export default {
        name: 'app',

        created () {
            this.loadModule();
        },

        methods: {
            async loadModule () {
                this.$loadingPlugin.show();
                const response = await auditModuleLoaded();
                if (!response.ok) {
                    this.$errorHandler.handleResponse(response);
                    this.auditinError = true;
                    this.$loadingPlugin.hide();
                } else {
                    this.$loadingPlugin.hide();
                    this.loaded = true;
                }
            }
        },

        data () {
            return {
                loaded: false,
                auditinError: false
            };
        }
    };
</script>

<style lang="scss">
    /* Import Font Awesome Icons Set */
    $fa-font-path: '~@fortawesome/fontawesome-free/webfonts';
    @import '~@fortawesome/fontawesome-free/scss/fontawesome';
    @import '~@fortawesome/fontawesome-free/scss/solid';
    @import '~@fortawesome/fontawesome-free/scss/regular';
    @import '~@fortawesome/fontawesome-free/scss/brands';
    /* Import Simple Line Icons Set */
    /* Import Main styles for this application */
    @import 'assets/scss/style';

    .app-container {
        height: 100vh;
        width: 100vw;
        overflow-x: hidden;
    }

    #appMessage {
        width: 100% !important;
        max-width: $alert-width;
        left: calc(50% - #{$alert-width} / 2) !important;

        .vue-notification-wrapper {
            overflow: visible;
        }
    }
</style>
