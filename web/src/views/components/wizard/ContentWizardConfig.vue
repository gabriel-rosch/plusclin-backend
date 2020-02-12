<template>
    <div class="component">
        <div class="content-3">
            <div class="header">
                <div class="main-text">
                    <span>{{$t('wizard.tab3.periodMonitoring')}}</span>
                </div>
                <div class="input-dates">
                    <div class="input-date">
                    <span class="span">
                        Inicio:
                    </span>
                        <div class="input-content">
                            <input type="text" class="input"/>
                            <i class="icon far fa-calendar fa-2x" aria-hidden="true"/>
                        </div>
                    </div>
                    <div class="input-date">
                    <span class="span">
                        Final:
                    </span>
                        <div class="input-content">
                            <input type="text" class="input"/>
                            <i class="icon far fa-calendar fa-2x" aria-hidden="true"/>
                        </div>
                    </div>
                </div>
                <div class="check-box">
                    <b-form-checkbox>{{$t('wizard.tab3.GenerateAlertsInterface')}}</b-form-checkbox>
                </div>
            </div>
            <div class="main">
                <div class="main-left">
                    <b-form-checkbox>{{$t('wizard.tab3.SendEmailAlert')}}</b-form-checkbox>
                    <div class="options">
                        <span class="text">{{$t('wizard.tab3.Frequency')}}</span>
                        <b-form-select class="form-select" size="sm" />
                    </div>
                    <span class="span-emails">{{$t('wizard.tab3.RegisteredEmails')}}</span>
                    <b-form-tags
                        id="form-tags-email"
                        tag-pills
                        size="lg"
                        placeholder="Digite um novo e-mail" />
                    <b-form-checkbox>
                        {{$t('wizard.tab3.SendToMyEmails')}}
                    </b-form-checkbox>
                </div>
                <div class="line"/>
                <div class="main-right">
                    <b-form-checkbox>{{$t('wizard.tab3.SendAlertBySMS')}}</b-form-checkbox>
                    <div class="options">
                        <span class="text">{{$t('wizard.tab3.Frequency')}}</span>
                        <b-form-select class="form-select" size="sm"/>
                    </div>
                    <span class="span-emails">{{$t('wizard.tab3.RegisteredSMS')}}</span>
                    <b-form-group>
                        <b-form-tags
                            @input="handleInputPhone"
                            v-model="selectedPhones"
                            size="lg"
                            no-outer-focus
                            add-on-change
                            class="mb-2">
                            <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag}">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                        <b-form-tag
                                            @custom-input-event="inputHandlers.input($event)"
                                            @remove="removeTag(tag)"
                                            :title="tag"
                                            :pill="true"
                                            :disabled="disabled"
                                            variant="info">
                                            {{ tag }}
                                        </b-form-tag>
                                    </li>
                                </ul>
                                <b-form-select
                                    v-bind="inputAttrs"
                                    v-on="inputHandlers"
                                    :disabled="disabled || availableOptions.length === 0"
                                    :options="availableOptions">
                                    <template v-slot:first>
                                        <option disabled value="">{{$t('wizard.tab3.SelectANewSMS')}}</option>
                                    </template>
                                </b-form-select>
                            </template>
                        </b-form-tags>
                    </b-form-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { listUserPhones } from '../../../api/monitoring';

    export default {
        name: 'content-wizard-config',
        data () {
            return {
                userPhones: [],
                phoneOptions: [],
                selectedPhones: []
            };
        },
        async mounted () {
            this.$loadingPlugin.show();
            this.userPhones = await (await listUserPhones()).json();
            this.phoneOptions = this.userPhones.map(phone => phone.phone);
            this.$loadingPlugin.hide();
        },
        methods: {
            handleInputPhone () {
                const selectedPhoneIds = this.selectedPhones.map(phone => {
                    return this.userPhones.find(userPhone => userPhone.phone === phone).id;
                });
                this.$emit('onSelectedPhonesChange', selectedPhoneIds);
            }
        },
        computed: {
            availableOptions () {
                return this.phoneOptions.filter(opt => this.selectedPhones.indexOf(opt) === -1);
            }
        }
    };
</script>

<style lang="scss">
    .content-3 {
        width: 100%;
        height:100%;

        .header {
            width: 100%;
            margin-bottom: 1.8rem;

            .main-text {
                display: flex;
                justify-content: center;
                height: 13%;

                span {
                    color: #0D47A1;
                    font: 0.9rem Roboto, Arial sans-serif;
                }
            }

            .input-dates {
                display: flex;
                justify-content: space-around;
                margin: 1.2rem 0;
                padding: 0 1.5rem;

                .input-date {
                    display: flex;
                    width: 15rem;

                    .span {
                        display: flex;
                        align-items: center;
                        color: #212529;
                        height: 100%;
                        font: 0.9rem Roboto, Arial sans-serif;
                        margin-right: .2rem;
                    }

                    .input-content {
                        display: flex;
                        border: 1px solid #ced4da;
                        background-color: #fff;
                        height: 2rem;
                        border-radius: .2rem;

                        .input {
                            border: none;
                            height: 100%;
                            padding: .1rem .3rem;
                        }

                        .icon {
                            margin: .1rem;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }

            .check-box {
                display: flex;
                justify-content: center;
            }
        }

        .main {
            height: 70%;
            width: 100%;
            display: flex;

            .main-left, .main-right {
                width: 50%;
                height: 100%;
                padding: .3rem 1.5rem;

                .options {
                    display: flex;
                    margin: 1.2rem 0;

                    .text {
                        display: flex;
                        align-items: center;
                    }

                    .form-select {
                        display: flex;
                        margin: .3rem 0 .3rem .7rem;

                        height: 2rem;
                    }
                }
            }

            .line {
                height: 93%;
                background-color: #cacaca;
                width: .1rem;
            }

            .main-left {
                .b-form-tags {
                    max-height: 12rem;
                    min-height: 12rem;
                    overflow: auto;
                    margin-bottom: 1rem;
                    margin-top: .3rem;
                }
            }

            .main-right {
                .b-form-tags {
                    max-height: 12rem;
                    min-height: 12rem;
                    overflow: auto;
                    margin-bottom: 1rem;
                    margin-top: .3rem;
                }

                .b-form-tag {
                    background-color: #6c757d;
                }
            }
        }
    }
</style>
