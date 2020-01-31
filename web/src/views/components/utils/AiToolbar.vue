<template>
    <div class="toolbar">
        <span class="toolbar-title" @click="handleHomeClick">
            {{ $t('project.title')}}
        </span>
        <div class="toolbar-action-section">
        </div>
        <div class="toolbar-action-section last-section">
            <em @click="handleListClick" class="fas fa-list active" :title="$t('toolbar.gridView')"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AiToolbar',
        methods: {
            handleHomeClick () {
                this.$router.push('/main-window');
            },
            handleListClick () {
            }
        }
    };
</script>

<style lang="scss">
    @media (min-height: 900px) {
        .toolbar {
            height: 4% !important;
            .last-section {
                padding: .8rem 1rem .8rem 1rem  !important;
            }
        }
    }
    .toolbar {
        border-bottom: 0.0625rem solid RGBA(0, 0, 0, 0.15);
        height: 5%;
        display: flex;
        .toolbar-title {
            display: inline-block;
            padding: .6rem 2rem 1rem 1rem;
            font-size: .999rem;
            font-weight: 500;
            cursor: pointer;
        }
        .toolbar-action-section {
            display: inline-block;
            border-left: 0.0625rem solid RGBA(0, 0, 0, 0.15);
            padding: .6rem 1rem .49rem 1rem;

            .mdi-home-outline {
                color: #0D47A1;
            }

            .disabled {
                pointer-events: none;
                opacity: 0.4;
            }

            & div {
                display: inline-block;
            }

            .select-area {
                display: inline;

                select {
                    vertical-align: middle;
                    width: 8.75rem;
                }
            }
        }
        .last-section {
            right: 0;
            position: absolute;
        }
        .popover-item {
            img.with-result{
                opacity: .5;
            }
        }
        .popover-item:hover {
            cursor: pointer;
            opacity: 1;
            width: auto;
            & i {
                opacity: 1;
            }
            & img {
                opacity: 1;
                filter: invert(1) grayscale(100%) brightness(30%) sepia(100%)
                hue-rotate(-180deg) saturate(1000%) brightness(60%) contrast(1);
            }
        }
        .popover-item.disabled,
        .popover-item:hover.disabled {
            cursor: default;
            opacity: 0.4;
            background-color: #ffffff;
            & i {
                opacity: 0.4;
            }
            & img {
                opacity: 0.3;
            }
        }

        .mdi-bookmark.default {
            color: blue;
        }
    }
</style>
