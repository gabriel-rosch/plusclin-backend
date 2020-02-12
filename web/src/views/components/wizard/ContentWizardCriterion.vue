<template>
    <div class="component">
        <div class="content-2">
            <div class="main-left">
                <b-form-radio class="radio-left" name="radio-size">
                    {{$t('wizard.tab2.textualMonitoring')}}
                </b-form-radio>
                <b-form-textarea class="text-area"/>
                <b-form-checkbox class="checkbox-text">
                    {{$t('wizard.tab2.exactText')}}
                </b-form-checkbox>
            </div>
            <div class="line"/>
            <div class="main-right">
                <b-form-radio class="radio-left" name="radio-size">
                    {{$t('wizard.tab2.subjectsMonitoring')}}
                </b-form-radio>
                <div style="position:relative; height:100%; overflow-y:auto">
                    <tree
                            class="tree--small"
                            :data="treeData"
                            :options="treeOptions"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LiquorTree from 'liquor-tree';
    import { listDomains } from '../../../api/monitoring';

    export default {
        name: 'content-wizard-criterion',
        components: {
            [LiquorTree.name]: LiquorTree
        },
        data () {
            return {
                treeData: [
                    {
                        text: 'JS: The Right Way',
                        children: [
                            { text: 'Getting Started (NOT DRAGGABLE)' },
                            { text: 'JavaScript Code Style' },
                            { text: 'MVC Pattern (NOT DROPABLE)' },
                            { text: 'MVP Pattern' },
                            { text: 'MVVM Pattern' },
                            {
                                text: 'The Good Parts',
                                children: [
                                    { text: 'OBJECT ORIENTED' },
                                    { text: 'ANONYMOUS FUNCTIONS' },
                                    { text: 'FUNCTIONS AS FIRST-CLASS OBJECTS' },
                                    { text: 'LOOSE TYPING' }
                                ]
                            },
                            {
                                text: 'Patterns',
                                children: [
                                    {
                                        text: 'DESIGN PATTERNS',
                                        children: [
                                            {
                                                text: 'Creational Design Patterns',
                                                children: [
                                                    { text: 'Factory' },
                                                    { text: 'Prototype' },
                                                    { text: 'Mixin' },
                                                    { text: 'Singleton' }
                                                ]
                                            },
                                            { text: 'Structural Design Patterns' }
                                        ]
                                    },
                                    {
                                        text: 'MV* PATTERNS',
                                        cildren: [
                                            { text: 'MVC Pattern' },
                                            { text: 'MVP Pattern' },
                                            { text: 'MVVM Pattern' }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                treeOptions: {
                    checkbox: true,
                    showChildren: true
                }
            };
        },
        async mounted () {
            // eslint-disable-next-line no-console
            console.log(await (await listDomains()).json());
        }
    };

</script>

<style lang="scss">

        .content-2 {
            width: 100%;
            height: 100%;
            display: flex;
            .header {
                height: 10%;
            }

            .main-left, .main-right {
                width: 50%;
                height: 90%;
                display: flex;
                flex-direction: column;
                .custom-control-label::after{
                    height: 0;
                }
            }

            .main-left {
                padding: 1rem 3rem;

                .radio-left {
                    margin-bottom: 1.2rem;
                }

                .text-area {
                    width: 100%;
                    height: 40%;
                    margin-bottom: 1.2rem;
                }

                .checkbox-text {
                    align-items: center;
                    display: flex;
                }
            }

            .line {
                height: 93%;
                background-color: #cacaca;
                width: .1rem;
            }

            .main-right {
                padding: 1rem 0rem 0rem 4rem;
                height: 100%;

                .radio-left {
                    margin-bottom: 1.2rem;
                }

                .tree-checkbox {
                    height: 1rem;
                    width: 1rem;
                    border-radius: .15em;
                    border-color: rgba(80, 80, 80, 0.38);
                }

                .tree-checkbox.checked, .tree-checkbox.indeterminate {
                    background-color: #0D47A1;
                    display: flex;
                }

                .tree-checkbox.checked:after {
                    left: 3px;
                    top: 0px;
                    height: 7px;
                    width: 4px;
                }
            }
        }

</style>
