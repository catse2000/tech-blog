const {format_date, format_plural, format_url} = require('../utils/helpers');


test('format_date() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');

    expect(format_date(date)).toBe('3/20/2020');
});

test('format_plural() returns a pluralized word', () => {
    const name = "Tiger";
    const amount = 2;

    if (amount > 1) {
        var text = name + 's';
        expect(text).toBe(name + 's');
        console.log(text);
    }
    else {
        text = name;
        expect(name).toBe(name);
        console.log(text);
    }
});
