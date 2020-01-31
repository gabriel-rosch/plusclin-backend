const LevelToType = {
    SEVERE: 'danger',
    WARNING: 'warning',
    INFO: 'info'
};

const LevelToLog = {
    SEVERE: 'error',
    WARNING: 'warn',
    INFO: 'info'
};

async function handleResponse (response) {
    const error = await response.json();
    this.$errorHandler.showError(error);
}

function showError ({ code, level, message }) {
    const func = LevelToLog[level];
    // eslint-disable-next-line no-console
    console[func](code, message);

    this.$notify({
        group: 'app',
        text: message,
        type: LevelToType[level]
    });
}

const ErrorHandlerPlugin = {
    install (Vue, options) {
        Vue.mixin({
            beforeCreate () {
                this.$errorHandler = {
                    handleResponse: handleResponse.bind(this),
                    showError: showError.bind(this)
                };
            }
        });
    }
};

export default ErrorHandlerPlugin;
