export class Producto 
{
    codProd:string;
    descrip: string;
    codInst: number;
    marca: string;
    costo: number;
    precio1: number;
    precio2: number;
    precio3: number;
    codigoAux: string;
    refBase: string;
    imagenes: Imagenes;
    adicionales: Adicionales;
    caracteristicas: CaracteristicasBaterias;
    tipos: ProductoTipo[];
}

export class Instancia
{
    codInst: number;
    descrip: string;
    insPadre: number;
    hijos: string;
}

export class Imagenes
{
    codProd: string;
    principal: string;
    adicionales: string;
    texturas: string;
}

export class Adicionales
{
    codProd: string;
    precio_4: number;
    precio_Puntos_V: number;
    precio_Medellin: number;
    precio_Bogota: number;
    precio_Internet: number;
    precio_Oficial: number;
    precio_Sin_Iva: number;
    precio_A: number;
    p_T1: number;
    p_T2: number;
    p_T3: number;
    p_T4: number;
    p_TE: number;
    precio_Publicidad: number;
    precio_Publicidad2: number;
    precio_Publicidad3: number;
    precio_WA: number;
    precio1_W: number;
    precio2_W: number;
    precio3_W: number;
    precio_Especial_W: number;
    precio_Especial: number;
    precio_Codificado: string;
    descAmpliada: string;
}

export class CaracteristicasBaterias
{
    CodProd:string;
    Material:string;
    Voltaje:string;
    Diametro:string;
    Altura:string;
    mAh:string;
    Dimensiones:string;
    Peso:string;
    Caracteristicas:string;
}

export class ProductoTipo
{
    CodProd:string;
    IDTipo:number;
}