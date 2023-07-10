import puppeteer from "puppeteer";

const browser = await puppeteer.launch({

    headless: 'new',

});

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

const products = async function Productos(url) {

    const page = await browser.newPage();

    await page.goto(url);

    await page.setViewport({ width: 1800, height: 1800 });

    const result = await page.evaluate(() => {

        const section = [...document.querySelectorAll('div[data-pod="catalyst-pod"]')];

        const data = [...section].map(section => {

            const ouo = 'http://ouo.io/qs/OkALzxzz?s=';
            const marca = section.querySelector('a > div > b').innerHTML;
            const title = section.querySelector('a > span:nth-child(2) > b').innerHTML;
            const link = ouo + section.querySelector('a').getAttribute("href").substring(8, section.querySelector('a').getAttribute("href").length);
            // const image = section.querySelector('img').getAttribute("src");
            const price = section.querySelector('a > div:nth-child(1) > ol > li.jsx-2112733514.prices-0 > div > span').innerHTML.replace(/[^0-9.]/g, '');

            return {
                marca,
                title,
                link,
                // image,
                price
            };

        })

        return data

    });

    return result

}

const json_formater_wong = async function Final() {

    //Carnes, Aves y Pescados

    const pollo = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pollo&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11955%7C%7CCarnes&store=tottus');
    json['Carnes, Aves y Pescados']['Pollo'] = pollo;

    const res = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=res&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11955%7C%7CCarnes&store=tottus');
    json['Carnes, Aves y Pescados']['Res'] = res;

    const cerdo = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=cerdo&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Carnes, Aves y Pescados']['Cerdo'] = cerdo;

    const pescados_mariscos = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pescados+y+Mariscos&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Carnes, Aves y Pescados']['Pescados y Mariscos'] = pescados_mariscos;

    const pavo_pavita_gallina = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pavo+Pavita+y+Gallina&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Carnes, Aves y Pescados']['Pavo, Pavita y Gallina'] = pavo_pavita_gallina;

    const enrollados = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Enrollados+de+Carne&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11955%7C%7CCarnes&store=tottus');
    json['Carnes, Aves y Pescados']['Enrollados'] = enrollados;

    const ham_nu_apa = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Hamburguesas+Nuggets&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Carnes, Aves y Pescados']['Hamburguesas, Nuggets y Apanados'] = ham_nu_apa;

    //Frutas y Verduras

    const frutas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=frutas&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11958%7C%7CFrutas+y+verduras&store=tottus');
    json['Frutas y Verduras']['Frutas'] = frutas;

    const verduras = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=verduras+linea&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11958%7C%7CFrutas+y+verduras&store=tottus&subdomain=tottus');
    json['Frutas y Verduras']['Verduras'] = verduras;

    // Congelados

    json['Congelados']['Hamburguesas, Nuggets y Apanados'] = ham_nu_apa;
    json['Congelados']['Enrollados'] = enrollados;
    
    const pescados_congelados = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Mariscos+Congelados&f.product.L2_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11956%7C%7CCongelados%2FCATG14179%7C%7CPescado+y+mariscos&store=tottus');
    json['Congelados']['Pescados Congelados'] = pescados_congelados;
    
    const mariscos_congelados = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Mariscos+Congelados&f.product.L2_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11956%7C%7CCongelados%2FCATG14179%7C%7CPescado+y+mariscos&store=tottus');
    json['Congelados']['Mariscos Congelados'] = mariscos_congelados;
    
    const frutas_congelados = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Mariscos+Congelados&f.product.L2_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11956%7C%7CCongelados%2FCATG14183%7C%7CVegetales+congelados&store=tottus&subdomain=tottus');
    json['Congelados']['Frutas Congeladas'] = frutas_congelados;
    
    const verduras_congelados = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Mariscos+Congelados&f.product.L2_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11956%7C%7CCongelados%2FCATG14183%7C%7CVegetales+congelados&store=tottus&subdomain=tottus');
    json['Congelados']['Verduras Congeladas'] = verduras_congelados;
    
    const panes_pastas_bocaditos_salsas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Panes+Pastas+Bocaditos+y+Salsas');
    json['Congelados']['Panes, Pastas, Bocaditos y Salsas'] = panes_pastas_bocaditos_salsas;
    
    const helados_postres = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Helados+y+Postres'); 
    json['Congelados']['Helados y Postres'] = helados_postres;

    // Lácteos y Huevos

    const leche = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Leche&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Lácteos y Huevos']['Leche'] = leche;

    const yogurt = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Yogurt&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Lácteos y Huevos']['Yogurt'] = yogurt;

    const huevos = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Huevos&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Lácteos y Huevos']['Huevos'] = huevos;

    const mantequilla_margarina = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Mantequilla+y+Margarina&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus'); 
    json['Lácteos y Huevos']['Mantequilla y Margarina'] = mantequilla_margarina;

    // Quesos y Fiambres

    const quesos_blandos = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Quesos+Blandos&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Quesos y Fiambres']['Quesos Blandos'] = quesos_blandos;

    const quesos_semiduros = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Quesos+Semiduros&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Quesos y Fiambres']['Quesos Semiduros'] = quesos_semiduros;

    const quesos_duros = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Quesos+Duros&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Quesos y Fiambres']['Quesos Duros'] = quesos_duros;

    const quesos_procesados = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Quesos+Procesados&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Quesos y Fiambres']['Quesos Procesados'] = quesos_procesados;

    const embutidos = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=HotDogs&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Quesos y Fiambres']['Embutidos'] = embutidos;

    const jamonadas_cocidos = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Jamonadas+y+Jamones+Cocidos&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Quesos y Fiambres']['Jamonadas y Jamones Cocidos'] = jamonadas_cocidos;

    const jamones_madurados = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Jamones+Madurados&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Quesos y Fiambres']['Jamones Madurados'] = jamones_madurados;

    const salames_salchichones = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Salames+y+Salchichones&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Quesos y Fiambres']['Salames y Salchichones'] = salames_salchichones;

    const otro_fiambres = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Otros+Fiambres&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Quesos y Fiambres']['Otros Fiambres'] = otro_fiambres;

    const tablas_piqueos = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Piqueo&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Quesos y Fiambres']['Tablas y Piqueos'] = tablas_piqueos;

    // Abarrotes

    const arroz = await products('https://www.falabella.com.pe/falabella-pe/category/CATG14739/Arroz');
    json['Abarrotes']['Arroz'] = arroz;

    const aceite = await products('https://www.falabella.com.pe/falabella-pe/category/cat13380480/Aceites');
    json['Abarrotes']['Aceite'] = aceite;

    const azucar_endulzantes = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Az%C3%BAcar+y+Endulzantes&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Abarrotes']['Azúcar y Endulzantes'] = azucar_endulzantes;

    const menestras = await products('https://www.falabella.com.pe/falabella-pe/category/CATG14741/Legumbres---menestras');
    json['Abarrotes']['Menestras'] = menestras;

    const conservas = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Conservas&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Abarrotes']['Conservas'] = conservas;

    const fideos_pastas_salsas = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Fideos+Pastas+y+Salsas');
    json['Abarrotes']['Fideos, Pastas y Salsas'] = fideos_pastas_salsas;

    const salsas_cremas_condimientos = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Salsas+Cremas+y+Condimentos');
    json['Abarrotes']['Salsas, Cremas y Condimentos'] = salsas_cremas_condimientos;

    const comidas_instantaneas = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Sopa+instant%C3%A1nea&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Abarrotes']['Comidas Instantáneas'] = comidas_instantaneas;

    const galletas_golosinas = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Galletas+y+Golosinas&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Abarrotes']['Galletas y Golosinas'] = galletas_golosinas;

    const chocolatería = await products('https://www.falabella.com.pe/falabella-pe/category/CATG14197/Chocolates');
    json['Abarrotes']['Chocolatería'] = chocolatería;

    const snacks = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Snacks+y+Piqueos');
    json['Abarrotes']['Snacks y Piqueos'] = snacks;

    //Panaderia y Pasteleria

    const pan_envasado = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pan+Envasado&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus&subdomain=tottus');
    json['Panadería y Pastelería']['Pan Envasado'] = pan_envasado;

    const pan_casa = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pan&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Panadería y Pastelería']['Pan de la Casa'] = pan_casa;

    const pasteleria = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pasteler%C3%ADa&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Panadería y Pastelería']['Pastelería'] = pasteleria;

    const panetones = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Panetones&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Panadería y Pastelería']['Panetones'] =  panetones;

    const postres = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Postres&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Panadería y Pastelería']['Postres'] = postres;

    const reposteria = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Reposter%C3%ADa&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Panadería y Pastelería']['Repostería'] = reposteria;

    const tortillas_masas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Tortillas+y+Masas&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Panadería y Pastelería']['Tortillas y Masas'] = tortillas_masas;

    //Pollo Rostizado y Comidas Preparadas

    const pollo_rostizado = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pollo+Rostizado&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Pollo Rostizado y Comidas Preparadas']['Pollo Rostizado'] = pollo_rostizado;

    const comidas_preparadas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Comidas+Preparadas&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Pollo Rostizado y Comidas Preparadas']['Comidas Preparadas'] = comidas_preparadas;

    const cremas_salsas_condimentos = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Cremas+Salsas+y+Condimentos&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Pollo Rostizado y Comidas Preparadas']['Cremas, Salsas y Condimentos a Granel'] = cremas_salsas_condimentos;

    const pizzas_pastas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pizzas+y+Pastas+Frescas');
    json['Pollo Rostizado y Comidas Preparadas']['Pizzas y Pastas Frescas'] = pizzas_pastas;

    const tamales_humitas = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=maiz&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json['Pollo Rostizado y Comidas Preparadas']['Tamales y Humitas'] = tamales_humitas;


    // Bebidas

    const licores = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Licores');
    json['Bebidas']['Licores'] = licores;

    const vinos = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Vinos');
    json['Bebidas']['Vinos'] = vinos;

    const espumantes = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Espumantes');
    json['Bebidas']['Espumantes'] = espumantes;

    const cervezas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Cervezas');
    json['Bebidas']['Cervezas'] = cervezas;

    const gaseosas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Gaseosas');
    json['Bebidas']['Gaseosas'] = gaseosas;

    const aguas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Aguas');
    json['Bebidas']['Aguas'] = aguas;

    const jugos = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Jugos+y+Otras+Bebidas');
    json['Bebidas']['Jugos y Otras Bebidas'] = jugos;

    const bebidas_funcionales = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Bebidas+Funcionales&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json['Bebidas']['Bebidas Funcionales'] = bebidas_funcionales;

    // Cuidado del Bebé

    const pañales_toallitas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pa%C3%B1ales+y+Toallitas+para+Beb%C3%A9');
    json['Cuidado del Bebé']['Pañales y Toallitas para Bebé'] = pañales_toallitas;
    
    const alimentacion_bebe = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Alimentaci%C3%B3n+del+Beb%C3%A9');
    json['Cuidado del Bebé']['Alimentación del Bebé'] = alimentacion_bebe;
    
    const cuidado_aseo_bebe = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Cuidado+y+Aseo+del+Beb%C3%A9&f.product.L0_category_paths=cat40498%7C%7CBelleza%2C+higiene+y+salud&store=tottus');
    json['Cuidado del Bebé']['Cuidado y Aseo del Bebé'] = cuidado_aseo_bebe;


    await browser.close()

    return json

}

export {

    json_formater_wong

}