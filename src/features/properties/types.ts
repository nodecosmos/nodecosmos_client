 
enum PropDataTypes {
    Node,
    Text,
    Number,
    Boolean,
    Date,
    Time,
    DateTime,
}

export interface Property {
    title: string;
    dataType: PropDataTypes;
    value: string;
}
