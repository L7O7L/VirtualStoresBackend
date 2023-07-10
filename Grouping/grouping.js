import plazavea from '../plazavea.json' assert { type: 'json' };
import tottus from '../tottus.json' assert { type: 'json' };
import stringSimilarity from 'string-similarity';
const json_plazavea = plazavea;
const json_tottus = tottus;

const json = {

    "Carnes, Aves y Pescados": {
        "Pollo": [],
        "Res": [],
        "Cerdo": [],
        "Pescados y Mariscos": [],
        "Pavo, Pavita y Gallina": [],
        "Enrollados": [],
        "Hamburguesas, Nuggets y Apanados": []
    },

    "Frutas y Verduras": {
        "Frutas": [],
        "Verduras": []
    },

    "Congelados": {
        "Hamburguesas, Nuggets y Apanados": [],
        "Enrollados": [],
        "Pescados Congelados": [],
        "Mariscos Congelados": [],
        "Frutas Congeladas": [],
        "Verduras Congeladas": [],
        "Panes, Pastas, Bocaditos y Salsas": [],
        "Helados y Postres": []
    },

    "Lácteos y Huevos": {
        "Leche": [],
        "Yogurt": [],
        "Huevos": [],
        "Mantequilla y Margarina": []
    },

    "Quesos y Fiambres": {
        "Quesos Blandos": [],
        "Quesos Semiduros": [],
        "Quesos Duros": [],
        "Quesos Procesados": [],
        "Embutidos": [],
        "Jamonadas y Jamones Cocidos": [],
        "Jamones Madurados": [],
        "Salames y Salchichones": [],
        "Otros Fiambres": [],
        "Tablas y Piqueos": []
    },

    "Abarrotes": {
        "Arroz": [],
        "Aceite": [],
        "Azúcar y Endulzantes": [],
        "Menestras": [],
        "Conservas": [],
        "Fideos, Pastas y Salsas": [],
        "Salsas, Cremas y Condimentos": [],
        "Comidas Instantáneas": [],
        "Galletas y Golosinas": [],
        "Chocolatería": [],
        "Snacks y Piqueos": []
    },

    "Desayunos": {
        "Café e Infusiones": [],
        "Cereales": [],
        "Modificadores de Leche": [],
        "Leche": [],
        "Yogurt": [],
        "Mantequilla y Margarina": [],
        "Mermeladas, Mieles y Dulces": [],
        "Azúcar y Endulzantes": [],
        "Pan de la Casa": [],
        "Pan Envasado": []
    },

    "Panadería y Pastelería": {
        "Pan Envasado": [],
        "Pan de la Casa": [],
        "Pastelería": [],
        "Panetones": [],
        "Postres": [],
        "Repostería": [],
        "Tortillas y Masas": []
    },

    "Pollo Rostizado y Comidas Preparadas": {
        "Pollo Rostizado": [],
        "Comidas Preparadas": [],
        "Cremas, Salsas y Condimentos a Granel": [],
        "Pizzas y Pastas Frescas": [],
        "Tamales y Humitas": [],
        "Pastas, Bocaditos Y Salsas": []
    },

    "Bebidas": {
        "Licores": [],
        "Vinos": [],
        "Espumantes": [],
        "Cervezas": [],
        "Gaseosas": [],
        "Aguas": [],
        "Jugos y Otras Bebidas": [],
        "Bebidas Funcionales": []
    },

    "Cuidado del Bebé": {
        "Pañales y Toallitas para Bebé": [],
        "Alimentación del Bebé": [],
        "Cuidado y Aseo del Bebé": []
    },

    "Cuidado Personal y Salud": {
        "Cuidado del Cabello": [],
        "Higiene Personal": [],
        "Cuidado Bucal": [],
        "Cuidado de la Piel": [],
        "Protección Femenina": [],
        "Protección Adulta": [],
        "Afeitado y Depilación": [],
        "Salud": []
    },

    "Mercado Saludable": {
        "Alimentos Orgánicos": [],
        "Desayunos Orgánicos": [],
        "Snacks Orgánicos": [],
        "Vitaminas y Suplementos Orgánicos": []
    }

}

function GroupingMarcas(categoria, subcategoria) {

    const formater = {};

    const plazavea = json_plazavea[categoria][subcategoria];
    const tottus = json_tottus[categoria][subcategoria];

    const all_marcas_plazavea = plazavea.map(marca => marca.marca);
    const all_marcas_tottus = tottus.map(marca => marca.marca);

    const marcas_plazavea = all_marcas_plazavea.filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);
    const marcas_tottus = all_marcas_tottus.filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);

    const all_marcas = marcas_plazavea.concat(marcas_tottus).filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);

    const products = {};

    all_marcas.forEach((mc) => {

        formater[`${mc}`] = {};

    });

    all_marcas.forEach((mc) => {

        plazavea.forEach((product_plazavea) => {

            tottus.forEach((product_tottus) => {

                const similary_products = stringSimilarity.compareTwoStrings(product_plazavea.title, product_tottus.title);
                // console.log(similary_products);


                if (product_plazavea.marca == mc && product_tottus.marca == mc) {

                    if (similary_products > 0.15) {

                        products[`${product_plazavea.title}`] = {

                            plazavea: [],
                            tottus: []

                        };

                        products[`${product_plazavea.title}`].plazavea.push(product_plazavea);
                        products[`${product_plazavea.title}`].tottus.push(product_tottus);

                    } else {

                        products[`${product_tottus.title}`] = {

                            plazavea: [],
                            tottus: []

                        };

                        products[`${product_tottus.title}`].tottus.push(product_tottus);

                    }

                } else if (product_plazavea.marca == mc && !product_tottus.marca) {

                    products[`${product_plazavea.title}`] = {

                        plazavea: [],
                        tottus: []

                    };

                    products[`${product_plazavea.title}`].plazavea.push(product_plazavea);

                }

            });

        });

    });

    return products;

}

const formating = async function Formating() {

    // Carnes, Aves y Pescados

    json['Carnes, Aves y Pescados']['Pollo'] = GroupingMarcas("Carnes, Aves y Pescados", "Pollo");
    json['Carnes, Aves y Pescados']['Res'] = GroupingMarcas("Carnes, Aves y Pescados", "Res");
    json['Carnes, Aves y Pescados']['Cerdo'] = GroupingMarcas("Carnes, Aves y Pescados", "Cerdo");
    json['Carnes, Aves y Pescados']['Pescados y Mariscos'] = GroupingMarcas("Carnes, Aves y Pescados", "Pescados y Mariscos");
    json['Carnes, Aves y Pescados']['Pavo, Pavita y Gallina'] = GroupingMarcas("Carnes, Aves y Pescados", "Pavo, Pavita y Gallina");
    json['Carnes, Aves y Pescados']['Enrollados'] = GroupingMarcas("Carnes, Aves y Pescados", "Enrollados");
    json['Carnes, Aves y Pescados']['Hamburguesas, Nuggets y Apanados'] = GroupingMarcas("Carnes, Aves y Pescados", "Hamburguesas, Nuggets y Apanados");

    // Frutas y Verduras

    json['Frutas y Verduras']['Frutas'] = GroupingMarcas("Frutas y Verduras", "Frutas");
    json['Frutas y Verduras']['Verduras'] = GroupingMarcas("Frutas y Verduras", "Verduras");

    //Congelados

    json['Congelados']['Hamburguesas, Nuggets y Apanados'] = GroupingMarcas("Congelados", "Hamburguesas, Nuggets y Apanados");
    json['Congelados']['Enrollados'] = GroupingMarcas("Congelados", "Enrollados");
    json['Congelados']['Pescados Congelados'] = GroupingMarcas("Congelados", "Pescados Congelados");
    json['Congelados']['Mariscos Congelados'] = GroupingMarcas("Congelados", "Mariscos Congelados");
    json['Congelados']['Frutas Congeladas'] = GroupingMarcas("Congelados", "Frutas Congeladas");
    json['Congelados']['Verduras Congeladas'] = GroupingMarcas("Congelados", "Verduras Congeladas");
    json['Congelados']['Panes, Pastas, Bocaditos y Salsas'] = GroupingMarcas("Congelados", "Panes, Pastas, Bocaditos y Salsas");
    json['Congelados']['Helados y Postres'] = GroupingMarcas("Congelados", "Helados y Postres");

    //Lacteos y huevos

    json['Lácteos y Huevos']['Leche'] = GroupingMarcas("Lácteos y Huevos", "Leche");
    json['Lácteos y Huevos']['Yogurt'] = GroupingMarcas("Lácteos y Huevos", "Yogurt");
    json['Lácteos y Huevos']['Huevos'] = GroupingMarcas("Lácteos y Huevos", "Huevos");
    json['Lácteos y Huevos']['Mantequilla y Margarina'] = GroupingMarcas("Lácteos y Huevos", "Mantequilla y Margarina");

    // //Quesos y Fiambres

    json['Quesos y Fiambres']['Quesos Blandos'] = GroupingMarcas("Quesos y Fiambres", "Quesos Blandos");
    json['Quesos y Fiambres']['Quesos Semiduros'] = GroupingMarcas("Quesos y Fiambres", "Quesos Semiduros");
    json['Quesos y Fiambres']['Quesos Duros'] = GroupingMarcas("Quesos y Fiambres", "Quesos Duros");
    json['Quesos y Fiambres']['Quesos Procesados'] = GroupingMarcas("Quesos y Fiambres", "Quesos Procesados");
    json['Quesos y Fiambres']['Embutidos'] = GroupingMarcas("Quesos y Fiambres", "Embutidos");
    json['Quesos y Fiambres']['Jamonadas y Jamones Cocidos'] = GroupingMarcas("Quesos y Fiambres", "Jamonadas y Jamones Cocidos");
    json['Quesos y Fiambres']['Jamones Madurados'] = GroupingMarcas("Quesos y Fiambres", "Jamones Madurados");
    json['Quesos y Fiambres']['Salames y Salchichones'] = GroupingMarcas("Quesos y Fiambres", "Salames y Salchichones");
    json['Quesos y Fiambres']['Otros Fiambres'] = GroupingMarcas("Quesos y Fiambres", "Otros Fiambres");
    json['Quesos y Fiambres']['Tablas y Piqueos'] = GroupingMarcas("Quesos y Fiambres", "Tablas y Piqueos");

    //Abarrotes

    json['Abarrotes']['Arroz'] = GroupingMarcas("Abarrotes", "Arroz");
    json['Abarrotes']['Aceite'] = GroupingMarcas("Abarrotes", "Aceite");
    json['Abarrotes']['Azúcar y Endulzantes'] = GroupingMarcas("Abarrotes", "Azúcar y Endulzantes");
    json['Abarrotes']['Menestras'] = GroupingMarcas("Abarrotes", "Menestras");
    json['Abarrotes']['Conservas'] = GroupingMarcas("Abarrotes", "Conservas");
    json['Abarrotes']['Fideos, Pastas y Salsas'] = GroupingMarcas("Abarrotes", "Fideos, Pastas y Salsas");
    json['Abarrotes']['Salsas, Cremas y Condimentos'] = GroupingMarcas("Abarrotes", "Salsas, Cremas y Condimentos");
    json['Abarrotes']['Comidas Instantáneas'] = GroupingMarcas("Abarrotes", "Comidas Instantáneas");
    json['Abarrotes']['Galletas y Golosinas'] = GroupingMarcas("Abarrotes", "Galletas y Golosinas");
    json['Abarrotes']['Chocolatería'] = GroupingMarcas("Abarrotes", "Chocolatería");
    json['Abarrotes']['Snacks y Piqueos'] = GroupingMarcas("Abarrotes", "Snacks y Piqueos");


    //Panaderia y Pasteleria

    json['Panadería y Pastelería']['Pan Envasado'] = GroupingMarcas("Panadería y Pastelería", "Pan Envasado");
    json['Panadería y Pastelería']['Pan de la Casa'] = GroupingMarcas("Panadería y Pastelería", "Pan de la Casa");
    json['Panadería y Pastelería']['Pastelería'] = GroupingMarcas("Panadería y Pastelería", "Pastelería");
    json['Panadería y Pastelería']['Panetones'] =  GroupingMarcas("Panadería y Pastelería", "Panetones");
    json['Panadería y Pastelería']['Postres'] = GroupingMarcas("Panadería y Pastelería", "Postres");
    json['Panadería y Pastelería']['Repostería'] = GroupingMarcas("Panadería y Pastelería", "Repostería");
    json['Panadería y Pastelería']['Tortillas y Masas'] = GroupingMarcas("Panadería y Pastelería", "Tortillas y Masas");


    //Pollo Rostizado y Comidas Preparadas

    json['Pollo Rostizado y Comidas Preparadas']['Pollo Rostizado'] = GroupingMarcas("Pollo Rostizado y Comidas Preparadas", "Pollo Rostizado");
    json['Pollo Rostizado y Comidas Preparadas']['Comidas Preparadas'] = GroupingMarcas("Pollo Rostizado y Comidas Preparadas", "Comidas Preparadas");
    json['Pollo Rostizado y Comidas Preparadas']['Cremas, Salsas y Condimentos a Granel'] = GroupingMarcas("Pollo Rostizado y Comidas Preparadas", "Cremas, Salsas y Condimentos a Granel");
    json['Pollo Rostizado y Comidas Preparadas']['Pizzas y Pastas Frescas'] = GroupingMarcas("Pollo Rostizado y Comidas Preparadas", "Pizzas y Pastas Frescas");
    json['Pollo Rostizado y Comidas Preparadas']['Tamales y Humitas'] = GroupingMarcas("Pollo Rostizado y Comidas Preparadas", "Tamales y Humitas");


    // Bebidas

    json['Bebidas']['Licores'] = GroupingMarcas("Bebidas", "Licores");
    json['Bebidas']['Vinos'] = GroupingMarcas("Bebidas", "Vinos");
    json['Bebidas']['Espumantes'] = GroupingMarcas("Bebidas", "Espumantes");
    json['Bebidas']['Cervezas'] = GroupingMarcas("Bebidas", "Cervezas");
    json['Bebidas']['Gaseosas'] = GroupingMarcas("Bebidas", "Gaseosas");
    json['Bebidas']['Aguas'] = GroupingMarcas("Bebidas", "Aguas");
    json['Bebidas']['Jugos y Otras Bebidas'] = GroupingMarcas("Bebidas", "Jugos y Otras Bebidas");
    json['Bebidas']['Bebidas Funcionales'] = GroupingMarcas("Bebidas", "Bebidas Funcionales");


    //Cuidado del Bebé

    json['Cuidado del Bebé']['Pañales y Toallitas para Bebé'] = GroupingMarcas("Cuidado del Bebé", "Pañales y Toallitas para Bebé");
    json['Cuidado del Bebé']['Alimentación del Bebé'] = GroupingMarcas("Cuidado del Bebé", "Alimentación del Bebé");
    json['Cuidado del Bebé']['Cuidado y Aseo del Bebé'] = GroupingMarcas("Cuidado del Bebé", "Cuidado y Aseo del Bebé");


    // //Cuidado Personal y Salud

    // json['Cuidado Personal y Salud']['Cuidado del Cabello'] = GroupingMarcas("Cuidado Personal y Salud", "Cuidado del Cabello");
    // json['Cuidado Personal y Salud']['Higiene Personal'] = GroupingMarcas("Cuidado Personal y Salud", "Higiene Personal");
    // json['Cuidado Personal y Salud']['Cuidado Bucal'] = GroupingMarcas("Cuidado Personal y Salud", "Cuidado Bucal");
    // json['Cuidado Personal y Salud']['Cuidado de la Piel'] = GroupingMarcas("Cuidado Personal y Salud", "Cuidado de la Piel");
    // json['Cuidado Personal y Salud']['Protección Femenina'] = GroupingMarcas("Cuidado Personal y Salud", "Protección Femenina");
    // json['Cuidado Personal y Salud']['Protección Adulta'] = GroupingMarcas("Cuidado Personal y Salud", "Protección Adulta");
    // json['Cuidado Personal y Salud']['Afeitado y Depilación'] = GroupingMarcas("Cuidado Personal y Salud", "Afeitado y Depilación");
    // json['Cuidado Personal y Salud']['Salud'] = GroupingMarcas("Cuidado Personal y Salud", "Salud");
    // json['Cuidado Personal y Salud']['Vitaminas y Nutrición'] = GroupingMarcas("Cuidado Personal y Salud", "Vitaminas y Nutrición");


    // //Mercado Saludable

    // json['Mercado Saludable']['Alimentos Orgánicos'] = GroupingMarcas("Mercado Saludable", "Alimentos Orgánicos");
    // json['Mercado Saludable']['Desayunos Orgánicos'] = GroupingMarcas("Mercado Saludable", "Desayunos Orgánicos");
    // json['Mercado Saludable']['Snacks Orgánicos'] = GroupingMarcas("Mercado Saludable", "Snacks Orgánicos");
    // json['Mercado Saludable']['Vitaminas y Suplementos Orgánicos'] = GroupingMarcas("Mercado Saludable", "Vitaminas y Suplementos Orgánicos");


    return json;

}

export {

    formating

}