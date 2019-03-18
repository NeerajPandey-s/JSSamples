//Generates a tree structured csv from a complex JSON.
//https://jsfiddle.net/nqwpsvfa/166

var csv = [{
    key: "abc1",
    Record: {
        ActiveInd: "Test112",
        AssetTransfer: [{
            FromAct: "",
            FromParty: "FromParty112"
        },
        {
            FromAct: "FromAct1",
            FromParty: "FromParty1"
        },
        {
            FromAct: "FromAct1",
            FromParty: "FromParty1"
        }
        ]
    },
    Record12: {
        ActiveInd: "Test12",
        AssetTransfer: [{
            FromAct: "FromAct12",
            FromParty: ""
        }],
    },
    Record13: {
        ActiveInd: "Test13",
        AssetTransfer: [{
            FromAct: "",
            FromParty: "FromParty13"
        }]
    }
},
{
    key: "abc2",
    Record: {
        ActiveRecord: "Test2",
        AssetTransfer: [{
            FromAct: "FromAct2",
            FromParty: "FromParty2"
        }]
    }
},
{
    key: "abc3",
    Record: {
        ActiveRecord: "Test3",
        AssetTransfer: [{
            FromAct: "FromAct3",
            FromParty: "FromParty3"
        }]
    }
}
]


function JSON2CSV(array, loopId = 0) {
    array = typeof array == 'object' ? array : "";
    array = array.filter(x => { return !!x })
    if (!array) return;

    var str = '';
    var line = '';

    var currentLoopId = 0;
    if (loopId) currentLoopId = loopId;


    if (Array.isArray(array)) {
        for (var i = 0; i < array.length; i++) {
            if (!array[i]) break;

            line = '';
            line += GetHeadings(array[i], loopId);
            line += ObjectToCSV(array[i], loopId);

            str += line + '\r\n';
        }
    } else {
        if (!array) return;

        line += GetHeadings(array, currentLoopId);
        line += ObjectToCSV(array, currentLoopId);
        str += line + '\r\n';
    }

    return str;
}

function ObjectToCSV(object, loopId) {
    var line = "";
    line += ",".repeat(loopId);
    let i = 0;
    for (var index in object) {
        if (typeof object[index] == 'object') {
            line += JSON2CSV(object[index], loopId + i);
        } else {
            line += (object[index] ? object[index] : "------") + ',';
        }
        i++;
    }

    return line;
}

function GetHeadings(obj, loopId) {
    var headings = [];
    headings = Object.keys(obj);
    var line = "";
    line = '\r\n';
    line += ",".repeat(loopId);

    if (Array.isArray(headings)) {
        line += headings.join(",");
    } else {
        line += headings;
    }
    line += '\r\n';
    return line;
}
console.log()
var result = JSON2CSV(csv.map(x => x.Record));

console.log(result)
