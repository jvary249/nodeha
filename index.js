const prettyTime = require('pretty-ms');

const sampleAvailabilities = [
    90,
    95,
    97,
    98,
    99,
    99.5,
    99.8,
    99.9,
    99.95,
    99.99,
    99.995,
    99.999,
    99.9999,
    99.99999,
    99.999999,
    99.9999999,
];

const getDowntimes = (availability) => {
    const downtimePerYear = ((100 - availability) * 365 * 86400000) / 100;
    const downtimePerMonth = ((100 - availability) * 30 * 86400000) / 100;
    const downtimePerWeek = ((100 - availability) * 7 * 86400000) / 100;
    const downtimePerDay = ((100 - availability) * 86400000) / 100;

    return {
        'Availability': availability,
        'Downtime per year': prettyTime(downtimePerYear),
        'Downtime per month': prettyTime(downtimePerMonth),
        'Downtime per week': prettyTime(downtimePerWeek),
        'Downtime per day': prettyTime(downtimePerDay),
    }
}

const executeCommand = (availabilities = sampleAvailabilities) => {
    const data = [];
    for (const availability of availabilities) {
        data.push(getDowntimes(availability));
    }
    console.table(data);
}


const run = () => {
    const args = process.argv.slice(2);
    let floatArgs;
    if (args.length) {
        if (args.some(arg => isNaN(parseFloat(arg)))) {
            console.error('One or more args are invalid');
            process.exit(1);
        }
        floatArgs = args.map(e => parseFloat(e));
    } else {
        floatArgs = sampleAvailabilities;
    }
    floatArgs.sort((a,b) => a - b);
    executeCommand(floatArgs);
}

run();