export const groupByKey = <T extends object>(array: T[], key: keyof T) => {
    return array.reduce((prev, cur) => {
        return { ...prev, [`${cur[key]}`]: cur };
    }, {});
};
