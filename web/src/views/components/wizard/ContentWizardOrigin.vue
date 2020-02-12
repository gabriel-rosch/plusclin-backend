<template>
    <div class="component">
        <div class="content-1">
            <div class="header">
                <b-button @click="btnTwitter" :class="[{btnTwitter: btnTwitterCheck},'btn-twitter']">
                    {{$t('wizard.tab1.twitter')}}
                </b-button>
                <b-button @click="btnNews" :class="[{btnNews: btnNewsCheck},'btn-news']">
                    {{$t('wizard.tab1.news')}}
                </b-button>
            </div>
            <div class="main" v-if="btnTwitterCheck">
                <div class="main-left">
                    <icon-input  @filter="handleFilterProfile" class="input-profiles" :placeholder="$t('wizard.tab1.font')" :icon="true"/>
                    <div style="position:relative; height:350px; overflow-y:auto">
                        <div class="check">
                                <b-form-checkbox
                                        v-model="profile.check"
                                        v-for="(profile) in filterProfiles"
                                        :key="profile.id"
                                        class="check-box"
                                >{{profile.text}}</b-form-checkbox>
                        </div>
                    </div>
                </div>
                <div class="main-right">
                    <icon-input @filter="handleFilterTerm" class="input-term" :placeholder="$t('wizard.tab1.term')" :icon="true"/>
                    <div class="input-button">
                        <icon-input class="input-include-term" :placeholder="$t('wizard.tab1.includeTerm')" :icon="false"/>
                        <b-button class="btn-include" variant="primary">{{$t('wizard.tab1.include')}}</b-button>
                    </div>
                    <div style="position:relative; height:350px; overflow-y:auto">
                        <div class="check" v-if="terms.length">
                            <b-form-checkbox
                                    v-model="term.check"
                                    v-for="(term) in filterTerms"
                                    :key="term.id"
                                    class="check-box"
                            >{{term.text}}</b-form-checkbox>
                        </div>
                        <div v-else class="no-terms">
                            <span>{{$t('wizard.tab1.noTerms')}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main" v-if="btnNewsCheck">
                <div class="main-left">
                    <icon-input @filter="handleFilterFont" class="input-font" :placeholder="'Fonte'" :icon="true"/>
                    <div  style="position:relative; height:350px; overflow-y:auto">
                        <div class="check">
                            <b-form-group>
                                <b-form-checkbox
                                        v-model="font.check"
                                        v-for="(font) in filterFonts"
                                        :key="font.id"
                                        class="check-box"
                                >{{font.text}}</b-form-checkbox>
                            </b-form-group>
                        </div>
                    </div>
                </div>
                <div class="main-left">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import IconInput from './IconInput';
    import { listTwitterTerms } from '../../../api/monitoring';
    export default {
        name: 'content-wizard-origin',
        props: {
            fonts: Array,
            terms: Array,
            profiles: Array
        },
        async mounted () {
            // eslint-disable-next-line no-console
            console.log(await (await listTwitterTerms()).json());
        },
        components: {
            IconInput
        },
        data () {
            return {
                btnTwitterCheck: true,
                btnNewsCheck: false,
                searchTextFont: '',
                searchTextProfile: '',
                searchTextTerm: ''
            };
        },
        computed: {
            filterProfiles () {
                return this.profiles.filter((profile) => {
                    return profile.text.toLowerCase()
                        .match(this.searchTextProfile.toLowerCase());
                });
            },
            filterTerms () {
                return this.terms.filter((term) => {
                    return term.text.toLowerCase()
                        .match(this.searchTextTerm.toLowerCase());
                });
            },
            filterFonts () {
                return this.fonts.filter((font) => {
                    return font.text.toLowerCase()
                        .match(this.searchTextFont.toLowerCase());
                });
            }
        },
        methods: {
            btnTwitter () {
                if (!this.btnTwitterCheck) {
                    this.btnTwitterCheck = !this.btnTwitterCheck;
                    if (this.btnTwitterCheck) {
                        this.btnNewsCheck = false;
                    }
                }
            },
            btnNews () {
                if (!this.btnNewsCheck) {
                    this.btnNewsCheck = !this.btnNewsCheck;
                    if (this.btnNewsCheck) {
                        this.btnTwitterCheck = false;
                    }
                }
            },
            handleFilterProfile (payload) {
                this.searchTextProfile = payload.text;
            },
            handleFilterTerm (payload) {
                this.searchTextTerm = payload.text;
            },
            handleFilterFont (payload) {
                this.searchTextFont = payload.text;
            }
        }
    };
</script>
<style lang="scss" >
    .content-1{
        width: 100%;
        height: 100%;
        .header {
            width: 100%;
            height: 10%;
            .btn-twitter, .btn-news, input-profile{
                width: 50%;
                height: 2.2rem;
                border: none;
                border-radius: 0.1rem;
                border-bottom:  .17rem solid rgba(0, 0, 0, 0.15);
            }
            .btnTwitter, .btnNews {
                border-bottom: #0D47A1 solid .2rem;
                box-shadow: none;
            }
        }
        .main{
            height: 90%;
            display: flex;
            .main-left, .main-right{
                width: 50%;
                display: flex;
                flex-direction: column;
                padding: 1rem;
                .check {
                    padding: .5rem;
                    .check-box {
                        margin-left: 0.4rem;
                        margin-bottom: 1rem;
                    }
                }
            }
            .main-right{
                .no-terms{
                    display: flex;
                    width: 100%;
                    height: 30%;
                    justify-content: center;
                    align-items: center;
                }
                .no-terms span{
                    font-style: italic;
                    color: #6c757d;
                }
            }
            .input-term{
                margin-bottom: 1rem;
            }
            .input-button{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 2rem;
                .input-include-term{
                    display: flex;
                    align-items: center;
                    width: 70%;
                }
                .btn-include{
                    display: flex;
                    width: 23%;
                    justify-content: center;
                    height: 100%;
                    background-color: #0D47A1;
                    color: #d8d8d8;
                    text-decoration: none;
                    cursor: pointer;
                    border: none;
                    box-shadow: none;
                    font: 0.9rem  Roboto, Arial sans-serif;
                    font-weight: 500;
                }
                .btn-include:hover{
                    border: none;
                    color: white;
                    font-size: 0.94rem;
                }
            }
        }
    }

</style>
