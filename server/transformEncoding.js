const iconv = require('iconv-lite');

function transformEncoding(rows) {
    const transformValue = (value) => {
        if (typeof value === 'string' || typeof value === 'text') {
            const windows1251Text = iconv.encode(value, 'windows-1251');
            return iconv.decode(windows1251Text, 'cp866');
        } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
            // Рекурсивно обрабатываем объекты/массивы
            return transformEncoding([value])[0];
        }
        return value;
    };

    return rows.map(row => {
        const transformedRow = {};

        for (const [key, value] of Object.entries(row)) {
            transformedRow[key] = transformValue(value);
        }

        return transformedRow;
    });
}


module.exports = transformEncoding;

