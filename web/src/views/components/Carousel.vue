<template>
    <div class="slider">
        <span @click="scrollLeft()" :class="{'hidden':delta === 0,
                                              'active':delta !== 0}"
                                    class="handle handlePrev"
        >
          <i class="fa fa-chevron-left" aria-hidden="true"/>
        </span>
        <div @mousewheel="handleMouseScroll($event)"  class="row_hidden scroller" >
            <div ref="scroller" class="row_inner_slider" :style="`transform: translateX(calc(calc(${itemWidth()}px + .38rem) * ${-delta}));`">
                <slot name="card">
                </slot>
            </div>
        </div>
        <span @click="scrollRight()" :class="{'hidden':delta === maxDelta,
                                              'active':delta !== maxDelta}" class="handle handleNext" >
          <i class="fa fa-chevron-right" aria-hidden="true"/>
        </span>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                delta: 0,
                maxDelta: 0
            };
        },
        mounted () {
            this.calculateMaxDelta();
            window.addEventListener('resize', this.handleResize);
        },
        updated () {
            this.calculateMaxDelta();
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            itemWidth () {
                if (this.$refs.scroller) {
                    const cardRect = this.$refs.scroller.children[0].getBoundingClientRect();
                    return cardRect.width;
                }
                return 0;
            },
            scrollRight () {
                this.delta = Math.min(this.delta + 1, this.maxDelta);
            },
            scrollLeft () {
                this.delta = Math.max(this.delta - 1, 0);
            },
            handleResize () {
                this.calculateMaxDelta();
                this.delta = Math.min(this.delta, this.maxDelta);
            },
            calculateMaxDelta () {
                const rect = this.$refs.scroller.getBoundingClientRect();
                const iw = this.itemWidth();
                const maxVisibleItems = Math.floor(rect.width / iw);
                this.maxDelta = Math.max(0, this.$refs.scroller.children.length - maxVisibleItems);
            },
            handleMouseScroll (e) {
                const handle = e.deltaY;

                if (handle > 0) {
                    this.scrollLeft();
                } else {
                    this.scrollRight();
                }
            }
        }
    };

</script>

<style lang="scss">
    .slider {
        height: 7.8125rem;
        position: relative;
        margin: 0;
        padding: 0 2.7rem;
        .row_hidden {
            overflow: hidden;
            height: 100%;
            .row_inner_slider {
                font-size: 0.625rem;
                white-space: nowrap;
                display: flex;
                width: 100%;

                > * {
                    margin-right: .38rem;
                    box-sizing:border-box;
                }
            }
        }
        .handle.handlePrev {
            left: 0;
        }
        .handle.handleNext {
            right: 0;
        }
        .handle.active {
            cursor: pointer;
        }
        .handle {
            position: absolute;
            top: 0;
            height: 6.875rem;
            bottom: 0;
            z-index: 20;
            width: 4%;
            text-align: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -moz-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            display: flex;
            color: #a3a3a3;
        }
        .fa{
            font-size: 1.25rem;
            margin-top: 2.1875rem;
        }
        .hidden {
            pointer-events: none;
            opacity: 0.5;
            transition: all .3s ease-out;
        }
        .scroller * {
            transition: all .3s ease-out;
        }
    }

</style>
