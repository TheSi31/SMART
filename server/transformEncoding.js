const iconv = require('iconv-lite');

function transformEncoding(rows) {
    return rows.map(row => {
        const transformedRow = {};

        for (const [key, value] of Object.entries(row)) {
            if (typeof value === 'string') {
                // Преобразование из UTF-8 в windows-1251
                const windows1251Text = iconv.encode(value, 'windows-1251');
                // Преобразование из windows-1251 в CP866
                transformedRow[key] = iconv.decode(windows1251Text, 'cp866');
            } else {
                transformedRow[key] = value;
            }
        }

        return transformedRow;
    });
}

module.exports = transformEncoding;
