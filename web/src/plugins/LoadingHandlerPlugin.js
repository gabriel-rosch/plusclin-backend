function show () {
    this.instance = this.$loading.show({
        color: '#fff',
        backgroundColor: '#212121'
    }, {
        after: this.$createElement('p', 'Carregando...')
    });
}

function hide () {
    this.instance.hide();
}

const LoadingHandlerPlugin = {
    install (Vue, options) {
        Vue.mixin({
            data () {
                return {
                    instance: null
                };
            },
            beforeCreate () {
                this.$loadingPlugin = {
                    show: show.bind(this),
                    hide: hide.bind(this)
                };
            }
        });
    }
};

export default LoadingHandlerPlugin;
