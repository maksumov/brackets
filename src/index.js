const finalReducer = (result) => (result.stack.length ? false : result.res);

module.exports = check = (str, bracketsConfig) => {
    const config = {};
    bracketsConfig.forEach((pair) => (config[pair[0]] = pair[1]));

    return finalReducer(
        str.split("").reduce(
            (acc, char) => ({
                res:
                    acc.res &&
                    ((acc.stack.length > 0 &&
                        acc.stack[acc.stack.length - 1] === char) ||
                        Object.keys(config).includes(char)),
                stack:
                    acc.stack.length > 0 &&
                    acc.stack[acc.stack.length - 1] === char
                        ? acc.stack.slice(0, acc.stack.length - 1)
                        : Object.keys(config).includes(char)
                        ? acc.stack.concat([config[char]])
                        : acc.stack,
            }),
            { res: true, stack: [] }
        )
    );
};
