
export const partialTimestamp = (rawDate) => {
    let dateObj = new Date(rawDate);
    return dateObj.toLocaleTimeString() + " on " + dateObj.toLocaleDateString();
};

export const dateStamp = (rawDate) => {
    let dateObj = new Date(rawDate);
    return dateObj.toLocaleDateString();
}

export const fullTimestamp = (record) => {
    if (record.createdAt === record.updatedAt) {
        return partialTimestamp(record.createdAt);
    } else {
        return partialTimestamp(record.createdAt) + " | Modified at " + partialTimestamp(record.updatedAt);
    }
};
