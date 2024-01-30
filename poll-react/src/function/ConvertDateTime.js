function ConvertDateTime(dateTimeArray) {
    if (dateTimeArray && dateTimeArray.length === 6) {
        const year = dateTimeArray[0];
        const month = dateTimeArray[1] - 1; // Months are 0-indexed in JavaScript, so subtract 1
        const day = dateTimeArray[2];
        const hour = dateTimeArray[3];
        const minute = dateTimeArray[4];
        const second = dateTimeArray[5];

        const dateTime = new Date(year, month, day, hour, minute, second);

        // Format the dateTime object for display
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return dateTime.toLocaleString(undefined, options);
    } else {
        return "Invalid Date";
    }
}

export default ConvertDateTime;