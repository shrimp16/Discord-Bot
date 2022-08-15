module.exports = {
    getHours: (time) => {
        return time / ( 1000 * 60 * 60 );
    },
    getDays: (time) => {
        return time / ( 1000 * 60 * 60 * 24 );
    }
}