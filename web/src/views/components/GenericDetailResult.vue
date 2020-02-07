<template>
    <div class="detail-result" v-html="processedResult">
    </div>
</template>

<script>
    export default {
        name: 'GenericDetailResult',
        props: {
            result: Object
        },
        data () {
            return {
                processedResult: '',
                resultBackup: Object
            };
        },
        mounted () {
            this.processKeyValueResult(this.result);
        },
        methods: {
            processKeyValueResult (result, parent) {
                let data = result;
                if (result.data) {
                    data = result.data;
                }

                for (const prop of Object.keys(data)) {
                    const value = data[prop];

                    if (value instanceof Array) {
                        for (const item of value) {
                            const key = this.concatPropertyKey(parent, prop);
                            this.processKeyValueResult(item, key);
                        }
                    } else if (value instanceof Object) {
                        this.processKeyValueResult(value);
                    } else {
                        const key = this.concatPropertyKey(parent, prop);
                        this.processedResult += `<div class="row-detail-result row">
                                                <div class="line-header-detail col col-md-3">${key} </div>
                                                <div class="line-detail col col-md-9">${this.inputOnIframe(value) || '-'} </div>
                                                </div>`;
                    }
                }
            },
            inputOnIframe (text) {
                if (text.toLowerCase().includes('<html') || text.toLowerCase().includes('<body')) {
                    return `<iframe class="frame-detail" srcdoc="${this.scapeHTML(text)}"></iframe>`;
                }
                return text;
            },
            scapeHTML (text) {
                return String(text).replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            },
            concatPropertyKey (parent, prop) {
                if (!parent) {
                    return prop;
                }
                return `${parent}.${prop}`;
            }
        }
    };
</script>

<style lang="scss">
.detail-result {
    background-color: white;
    .row-detail-result {
        margin: 0;
    }
    .line-detail {
        word-break: break-all;
        background: #fff;
        padding: .29em;
        border-bottom: 1px solid #bdbdbd;
        color: #000;
        overflow-y: auto;
    }
    .line-header-detail {
        word-break: break-all;
        background: #fff;
        padding: .29em;
        border-bottom: 1px solid #bdbdbd;
        color: #000;
        overflow-y: auto;
    }
}
.frame-detail{
    width: 100%;
    border: none;
}
</style>
