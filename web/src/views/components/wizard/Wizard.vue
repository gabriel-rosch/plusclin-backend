<template>
    <b-modal id="wizard" :hide-header="true" size="lg" :hide-footer="true" :centered="true"
             :no-close-on-backdrop="true" :no-close-on-esc="true" :visible="true" >
        <div class="wizard">
            <div id="tabs">
                <tab name="tab" :number=tab1 :marked="tab1 <= tabCurrent" :currentMarked="tabCurrent === tab1"
                     :text="$t('wizard.body.origin')" />
                <div class="separator"/>
                <tab name="tab" :number=tab2 :marked="tab2 <= tabCurrent" :currentMarked="tabCurrent === tab2"
                     :text="$t('wizard.body.criterion')"/>
                <div class="separator"/>
                <tab name="tab" :number=tab3 :marked="tab3 <= tabCurrent" :currentMarked="tabCurrent === tabMax"
                     :text="$t('wizard.body.configuration')" />
            </div>
            <content-wizard-origin
                    :fonts="fonts"
                    :terms="terms"
                    :profiles="profiles"
                    class="content-wizard"
                    :currentPage="tabCurrent"
                    v-if="tabCurrent === tab1"
            />
            <content-wizard-criterion
                    class="content-wizard"
                    v-if="tabCurrent === tab2"/>
            <content-wizard-config
                    @onSelectedPhonesChange="handleSelectedPhonesChange"
                    class="content-wizard"
                    v-if="tabCurrent === tab3"/>
            <div id="footer">
                <b-button @click="backTab()" variant="secundary" class="btn-back">
                    <i v-if="tabCurrent !== tab1" class="fas fa-arrow-left fa-2x" aria-hidden="true"/>
                </b-button>
                <b-button @click="close()" variant="secundary" class="btn-cancel">{{$t('wizard.body.cancel')}}</b-button>
                <b-button @click="nextTab()" variant="primary" class="btn-next">
                    <i v-if="tabCurrent !== tab3" class="fas fa-arrow-right fa-2x" aria-hidden="true"/>
                    <span v-else>{{$t('wizard.body.monitoring')}}</span>
                </b-button>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import tab from './Tab';
    import contentWizardOrigin from './ContentWizardOrigin';
    import contentWizardCriterion from './ContentWizardCriterion';
    import contentWizardConfig from './ContentWizardConfig';
    import mockFonts from '../../../mocks/fonts';
    import mockTerms from '../../../mocks/terms';
    import mockProfiles from '../../../mocks/profiles';

    export default {
        name: 'wizard',
        components: {
            tab,
            contentWizardOrigin,
            contentWizardCriterion,
            contentWizardConfig
        },
        data () {
            return {
                tab1: 1,
                tab2: 2,
                tab3: 3,
                tabMax: 3,
                tabCurrent: 1,
                fonts: mockFonts.fonts,
                terms: mockTerms.terms,
                profiles: mockProfiles.profiles,
                selectedPhoneIds: []
            };
        },
        methods: {
            nextTab () {
                if (this.tabCurrent + 1 <= this.tabMax) {
                    this.tabCurrent++;
                }
            },
            backTab () {
                if (this.tabCurrent - 1 !== 0) {
                    this.tabCurrent--;
                }
            },
            close () {
                this.$emit('close');
            },
            handleSelectedPhonesChange (selectedPhonesIds) {
                this.selectedPhoneIds = selectedPhonesIds;
            }
        }
    };
</script>

<style lang="scss">
        .modal-body {
            padding: 0;
            border-radius: 0;
            background-color: #eee;

            .wizard {
                height: 40rem;

                #tabs {
                    height: 13%;
                    display: flex;
                    justify-content: space-around;
                    padding: 0 5.5rem;

                    .separator {
                        height: 50%;
                        width: 10%;
                        border-bottom: rgba(0, 0, 0, .15) solid .1rem;
                    }
                }

                .content-wizard {
                    height: 80%;
                    align-items: flex-start;
                    display: flex;
                }

                #footer {
                    height: 8%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #0D47A1;
                    border-radius: 0;

                    button {
                        background-color: #0D47A1;
                        color: #d8d8d8;
                        height: 100%;
                        text-decoration: none;
                        cursor: pointer;
                        border: none;
                        box-shadow: none;
                        font: 0.9rem Roboto, Arial sans-serif;
                        font-weight: 500;
                    }

                    .btn-next, .btn-back {
                        width: 13%;
                    }

                    .btn-cancel {
                        width: 20%;
                    }

                    .btn-next:hover, .btn-back:hover, .btn-cancel:hover {
                        border: none;
                        color: white;
                        font-size: 0.94rem;
                    }
                }
            }
        }
</style>
