module.exports = {
   lastUpdatedFormat : (lastUpdated) => {
        const date = new Date(lastUpdated)
        let hour = date.getHours()
        let morningOrNight = 'AM'
        if (hour > 11) {
            morningOrNight = 'PM'
            hour = hour - 12
        }
        if (hour === 0) {
            hour = 12
        }

        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${hour}:${date.getMinutes() < 10 ? date.getMinutes() + '0' : date.getMinutes()} ${morningOrNight}`
    }
}