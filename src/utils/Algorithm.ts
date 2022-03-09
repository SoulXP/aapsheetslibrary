// Stefan Olivier
// Description: Various algorithms

export function get_type(obj: any, show_full_class: boolean = false): string {
    const deep_type: string = Object.prototype.toString.call(obj).toLowerCase();
    const object_deep_type: string = Object.prototype.toString.call({}).toLowerCase();
    const re_types: RegExp = /(array|bigint|date|error|function|generatorfunction|regexp|symbol|number|string|null|undefined)/;

    if (show_full_class) {
        if (deep_type.match(re_types)) return deep_type;
        else return object_deep_type;
    } else {
        if (deep_type.match(re_types)) return deep_type.slice(8,-1);
        else return object_deep_type.slice(8,-1);
    }
}
