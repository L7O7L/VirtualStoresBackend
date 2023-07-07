import puppeteer from "puppeteer";

const browser = await puppeteer.launch({

    headless: 'new',

});

const json = {
    "id": 2,
    "TOTTUS": [
        {
            "Carnes, Aves y Pescados": {
                "Pollo": [],
                "Res": [],
                "Cerdo": [],
                "Pescados y Mariscos": [],
                "Pavo, Pavita y Gallina": [],
                "Enrollados": [],
                "Hamburguesas, Nuggets y Apanados": []
            }
        },
        {
            "Frutas y Verduras": {
                "Frutas": [],
                "Verduras": []
            }
        },
        {
            "Congelados": {
                "Hamburguesas, Nuggets y Apanados": [],
                "Enrollados": [],
                "Pescados Congelados": [],
                "Mariscos Congelados": [],
                "Frutas Congeladas": [],
                "Verduras Congeladas": [],
                "Panes, Pastas, Bocaditos y Salsas": [],
                "Helados y Postres": []
            }
        },
        {
            "Lácteos y Huevos": {
                "Leche": [],
                "Yogurt": [],
                "Huevos": [],
                "Mantequilla y Margarina": []
            }
        },
        {
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
            }
        },
        {
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
            }
        },
        {
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
            }
        },
        {
            "Panadería y Pastelería": {
                "Pan Envasado": [],
                "Pan de la Casa": [],
                "Pastelería": [],
                "Panetones": [],
                "Postres": [],
                "Repostería": [],
                "Tortillas y Masas": []
            }
        },
        {
            "Pollo Rostizado y Comidas Preparadas": {
                "Pollo Rostizado": [],
                "Comidas Preparadas": [],
                "Cremas, Salsas y Condimentos a Granel": [],
                "Pizzas y Pastas Frescas": [],
                "Tamales y Humitas": [],
                "Pastas, Bocaditos Y Salsas": []
            }
        },
        {
            "Bebidas": {
                "Licores": [],
                "Vinos": [],
                "Espumantes": [],
                "Cervezas": [],
                "Gaseosas": [],
                "Aguas": [],
                "Jugos y Otras Bebidas": [],
                "Bebidas Funcionales": []
            }
        },
        {
            "Cuidado del Bebé": {
                "Pañales y Toallitas para Bebé": [],
                "Alimentación del Bebé": [],
                "Cuidado y Aseo del Bebé": []
            }
        },
        {
            "Cuidado Personal y Salud": {
                "Cuidado del Cabello": [],
                "Higiene Personal": [],
                "Cuidado Bucal": [],
                "Cuidado de la Piel": [],
                "Protección Femenina": [],
                "Protección Adulta": [],
                "Afeitado y Depilación": [],
                "Salud": []
            }
        },
        {
            "Mercado Saludable": {
                "Alimentos Orgánicos": [],
                "Desayunos Orgánicos": [],
                "Snacks Orgánicos": [],
                "Vitaminas y Suplementos Orgánicos": []
            }
        }
    ]
}

const products = async function Productos(url) {

    const page = await browser.newPage();

    await page.goto(url);

    await page.setViewport({width: 1800, height: 1800});

    const result = await page.evaluate(() => {

        const section = [ ... document.querySelectorAll('div[data-pod="catalyst-pod"]')];

        const data = [... section].map(section => {

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

    const pollo = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pollo&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11955%7C%7CCarnes&store=tottus');
    json.TOTTUS[0]['Carnes, Aves y Pescados']['Pollo'] = pollo;

    const res = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=res&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11955%7C%7CCarnes&store=tottus');
    json.TOTTUS[0]['Carnes, Aves y Pescados']['Res'] = res;

    const cerdo = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=cerdo&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json.TOTTUS[0]['Carnes, Aves y Pescados']['Cerdo'] = cerdo;

    const pescados_mariscos = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pescados+y+Mariscos&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json.TOTTUS[0]['Carnes, Aves y Pescados']['Pescados y Mariscos'] = pescados_mariscos;

    const pavo_pavita_gallina = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Pavo+Pavita+y+Gallina&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas&store=tottus');
    json.TOTTUS[0]['Carnes, Aves y Pescados']['Pavo, Pavita y Gallina'] = pavo_pavita_gallina;

    const enrollados = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=Enrollados+de+Carne&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11955%7C%7CCarnes&store=tottus');
    json.TOTTUS[0]['Carnes, Aves y Pescados']['Enrollados'] = enrollados;

    const ham_nu_apa = await products('https://www.falabella.com.pe/falabella-pe/search?Ntt=Hamburguesas+Nuggets&f.product.L0_category_paths=cat7040473%7C%7CAlimentos+y+bebidas');
    json.TOTTUS[0]['Carnes, Aves y Pescados']['Hamburguesas, Nuggets y Apanados'] = ham_nu_apa;

    const frutas = await products('https://tottus.falabella.com.pe/tottus-pe/search?Ntt=frutas&f.product.L1_category_paths=cat7040473%7C%7CAlimentos+y+bebidas%2FCATG11958%7C%7CFrutas+y+verduras&store=tottus');
    json.TOTTUS[1]['Frutas y Verduras']['Frutas'] = frutas;

    await browser.close()

    return json

}

export {

    json_formater_wong

}