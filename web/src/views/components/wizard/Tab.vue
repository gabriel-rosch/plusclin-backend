<template>
    <div class="component">
        <div :class="[{circleDefault: !marked}, {circleBeforeMarked: marked},'circle']">
            <i v-if="currentMarked" class="fas fa-check fa-2x" aria-hidden="true"/>
            <span v-else>{{number}}</span>
        </div>
        <span :class="textTab">{{text}}</span>
    </div>
</template>
<script>
    export default {
        name: 'tab',
        props: {
            marked: Boolean,
            text: String,
            number: Number,
            currentMarked: Boolean
        },
        computed: {
            textTab () {
                return {
                    textMarked: this.marked
                };
            }
        }
    };
</script>
<style lang="scss">
    .component {
        display: flex;
        align-items: center;
        .circle {
            height: 2.5rem;
            width: 2.5rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0.4rem;
            font-weight: 700;
        }
        .circleBeforeMarked{
            color: #d8d8d8;
            background-color: #0d47a1;
        }
        .circleDefault{
            color: #7f8c8d;
            background-color: rgba(0,0,0,.15);

        }
        .textMarked{
            font-weight: bold;

        }
    }
</style>
