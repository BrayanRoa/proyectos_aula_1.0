// Generated by https://quicktype.io

export interface SQLResponse {
    data:    Datum[];
}

export interface Datum {
    target:      Target;
    value:       string;
    property:    string;
    children:    any[];
    constraints: Constraints;
}

export interface Constraints {
    contains: string;
}

export interface Target {
    correo_institucional: string;
    nombres:              string;
    apellidos:            string;
    cod_rol:              number;
    codigo:               string;
}