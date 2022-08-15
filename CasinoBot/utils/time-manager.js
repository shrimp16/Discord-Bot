module.exports = {
    getHours: (time) => {
        return (time / ( 1000 * 60 * 60 )).toFixed(2);
    },
    getDays: (time) => {
        return Math.round(time / ( 1000 * 60 * 60 * 24 )).toFixed(2);
    }
}