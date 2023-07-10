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

const pa_la_hu = async function Packs_lacteos_huevos(url) {

    const page = await browser.newPage();

    await page.goto(url);

    const result = await page.evaluate(() => {

        const body = document.querySelectorAll('div[class="Showcase__content"]');

        const data = [...body].map((body) => {

            const ouo = 'http://ouo.io/qs/OkALzxzz?s=';
            const marca = body.querySelector('div.Showcase__brand > a').innerHTML;
            const title = body.getAttribute('title');
            const precios = [...body.querySelectorAll('span.price')].map((price) => price.innerHTML.replace(/[^0-9.]/g, ''));
            const element_href = body.querySelector('a[class="Showcase__name"]');
            const link = ouo + element_href.getAttribute("href").substring(12, element_href.getAttribute("href").length);
            const img = body.querySelector('div.Showcase__productImage > a > figure > img').getAttribute("src");

            if (precios[0] != undefined) {

                precios[0] = precios[0].substring(0, 5);

            } else if (precios[1] != undefined) {

                precios[1] = precios[1].substring(0, 5);

            }

            if (precios.length > 0) {

                return {

                    marca,
                    title,
                    precio_fisica: precios[0],
                    precio_virtual: precios[1],
                    link,
                    img

                };

            }

        })

        return data;

    });

    return result;

}

const json_formater = async function Final() {

    //Carnes, Aves y Pescados

    const res15 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pollo');
    json['Carnes, Aves y Pescados']['Pollo'] = res15.filter((elemento) => elemento != null);

    const res16 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/res');
    json['Carnes, Aves y Pescados']['Res'] = res16.filter((elemento) => elemento != null);

    const res17 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/cerdo');
    json['Carnes, Aves y Pescados']['Cerdo'] = res17.filter((elemento) => elemento != null);

    const res18 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pescados-y-mariscos');
    json['Carnes, Aves y Pescados']['Pescados y Mariscos'] = res18.filter((elemento) => elemento != null);

    const res19 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pavo-pavita-y-otras-aves');
    json['Carnes, Aves y Pescados']['Pavo, Pavita y Gallina'] = res19.filter((elemento) => elemento != null);

    const res20 = await pa_la_hu('https://www.plazavea.com.pe/congelados/enrollados');
    json['Carnes, Aves y Pescados']['Enrollados'] = res20.filter((elemento) => elemento != null);

    const res21 = await pa_la_hu('https://www.plazavea.com.pe/congelados/hamburguesas-nuggets-y-apanados');
    json['Carnes, Aves y Pescados']['Hamburguesas, Nuggets y Apanados'] = res21.filter((elemento) => elemento != null);

    //Frutas y Verduras

    const res22 = await pa_la_hu('https://www.plazavea.com.pe/frutas-y-verduras/frutas');
    json['Frutas y Verduras']['Frutas'] = res22.filter((elemento) => elemento != null);

    const res24 = await pa_la_hu('https://www.plazavea.com.pe/frutas-y-verduras/verduras');
    json['Frutas y Verduras']['Verduras'] = res24.filter((elemento) => elemento != null);

    //Congelados

    const res25 = await pa_la_hu('https://www.plazavea.com.pe/congelados/hamburguesas-nuggets-y-apanados');
    json['Congelados']['Hamburguesas, Nuggets y Apanados'] = res25.filter((elemento) => elemento != null);

    const res26 = await pa_la_hu('https://www.plazavea.com.pe/congelados/enrollados');
    json['Congelados']['Enrollados'] = res26.filter((elemento) => elemento != null);

    const res27 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pescados-y-mariscos/pescados-congelados');
    json['Congelados']['Pescados Congelados'] = res27.filter((elemento) => elemento != null);

    const res28 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pescados-y-mariscos/mariscos-congelados');
    json['Congelados']['Mariscos Congelados'] = res28.filter((elemento) => elemento != null);

    const res29 = await pa_la_hu('https://www.plazavea.com.pe/frutas-y-verduras/frutas/frutas-congeladas');
    json['Congelados']['Frutas Congeladas'] = res29.filter((elemento) => elemento != null);

    const res30 = await pa_la_hu('https://www.plazavea.com.pe/frutas-y-verduras/verduras/verduras-congeladas');
    json['Congelados']['Verduras Congeladas'] = res30.filter((elemento) => elemento != null);

    const res31 = await pa_la_hu('https://www.plazavea.com.pe/congelados/panes-pastas-bocaditos-y-salsas');
    json['Congelados']['Panes, Pastas, Bocaditos y Salsas'] = res31.filter((elemento) => elemento != null);

    const res32 = await pa_la_hu('https://www.plazavea.com.pe/congelados/helados-y-postres');
    json['Congelados']['Helados y Postres'] = res32.filter((elemento) => elemento != null);

    //Lacteos y huevos

    const res34 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/leche');
    json['Lácteos y Huevos']['Leche'] = res34.filter((elemento) => elemento != null);

    const res35 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/yogurt');
    json['Lácteos y Huevos']['Yogurt'] = res35.filter((elemento) => elemento != null);

    const res36 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/huevos');
    json['Lácteos y Huevos']['Huevos'] = res36.filter((elemento) => elemento != null);

    const res37 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/mantequilla-y-margarina');
    json['Lácteos y Huevos']['Mantequilla y Margarina'] = res37.filter((elemento) => elemento != null);

    //Quesos y Fiambres

    const res38 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/quesos-blandos');
    json['Quesos y Fiambres']['Quesos Blandos'] = res38.filter((elemento) => elemento != null);

    const res39 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/quesos-semiduros');
    json['Quesos y Fiambres']['Quesos Semiduros'] = res39.filter((elemento) => elemento != null);

    const res40 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/quesos-duros');
    json['Quesos y Fiambres']['Quesos Duros'] = res40.filter((elemento) => elemento != null);

    const res41 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/quesos-procesados');
    json['Quesos y Fiambres']['Quesos Procesados'] = res41.filter((elemento) => elemento != null);

    const res42 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/embutidos');
    json['Quesos y Fiambres']['Embutidos'] = res42.filter((elemento) => elemento != null);

    const res43 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/jamonadas-y-jamones-cocidos');
    json['Quesos y Fiambres']['Jamonadas y Jamones Cocidos'] = res43.filter((elemento) => elemento != null);

    const res44 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/jamones-madurados');
    json['Quesos y Fiambres']['Jamones Madurados'] = res44.filter((elemento) => elemento != null);

    const res45 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/salames-y-salchichones');
    json['Quesos y Fiambres']['Salames y Salchichones'] = res45.filter((elemento) => elemento != null);

    const res46 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/otros-fiambres');
    json['Quesos y Fiambres']['Otros Fiambres'] = res46.filter((elemento) => elemento != null);

    const res47 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/tablas-y-piqueos');
    json['Quesos y Fiambres']['Tablas y Piqueos'] = res47.filter((elemento) => elemento != null);

    //Abarrotes

    const res48 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/arroz');
    json['Abarrotes']['Arroz'] = res48.filter((elemento) => elemento != null);

    const res49 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/aceite');
    json['Abarrotes']['Aceite'] = res49.filter((elemento) => elemento != null);

    const res50 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/azucar-y-endulzantes');
    json['Abarrotes']['Azúcar y Endulzantes'] = res50.filter((elemento) => elemento != null);

    const res51 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/menestras');
    json['Abarrotes']['Menestras'] = res51.filter((elemento) => elemento != null);

    const res52 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/conservas/');
    json['Abarrotes']['Conservas'] = res52.filter((elemento) => elemento != null);

    const res53 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/fideos-pastas-y-salsas');
    json['Abarrotes']['Fideos, Pastas y Salsas'] = res53.filter((elemento) => elemento != null);

    const res54 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/salsas-cremas-y-condimentos');
    json['Abarrotes']['Salsas, Cremas y Condimentos'] = res54.filter((elemento) => elemento != null);

    const res55 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/comidas-instantaneas');
    json['Abarrotes']['Comidas Instantáneas'] = res55.filter((elemento) => elemento != null);

    const res56 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/galletas-y-golosinas');
    json['Abarrotes']['Galletas y Golosinas'] = res56.filter((elemento) => elemento != null);

    const res57 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/chocolateria');
    json['Abarrotes']['Chocolatería'] = res57.filter((elemento) => elemento != null);

    const res58 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/snacks-y-piqueos');
    json['Abarrotes']['Snacks y Piqueos'] = res58.filter((elemento) => elemento != null);

    //Panaderia y Pasteleria

    const res69 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/pan-envasado');
    json['Panadería y Pastelería']['Pan Envasado'] = res69.filter((elemento) => elemento != null);

    const res70 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/pan-de-la-casa');
    json['Panadería y Pastelería']['Pan de la Casa'] = res70.filter((elemento) => elemento != null);

    const res71 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/pasteleria');
    json['Panadería y Pastelería']['Pastelería'] = res71.filter((elemento) => elemento != null);

    const res72 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/panetones');
    json['Panadería y Pastelería']['Panetones'] = res72.filter((elemento) => elemento != null);

    const res73 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/postres');
    json['Panadería y Pastelería']['Postres'] = res73.filter((elemento) => elemento != null);

    const res74 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/reposteria');
    json['Panadería y Pastelería']['Repostería'] = res74.filter((elemento) => elemento != null);

    const res75 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/tortillas-y-masas');
    json['Panadería y Pastelería']['Tortillas y Masas'] = res75.filter((elemento) => elemento != null);

    //Pollo Rostizado y Comidas Preparadas

    const res76 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/pollo-rostizado');
    json['Pollo Rostizado y Comidas Preparadas']['Pollo Rostizado'] = res76.filter((elemento) => elemento != null);

    const res77 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
    json['Pollo Rostizado y Comidas Preparadas']['Comidas Preparadas'] = res77.filter((elemento) => elemento != null);

    const res78 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
    json['Pollo Rostizado y Comidas Preparadas']['Cremas, Salsas y Condimentos a Granel'] = res78.filter((elemento) => elemento != null);

    const res79 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
    json['Pollo Rostizado y Comidas Preparadas']['Pizzas y Pastas Frescas'] = res79.filter((elemento) => elemento != null);

    const res80 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
    json['Pollo Rostizado y Comidas Preparadas']['Tamales y Humitas'] = res80.filter((elemento) => elemento != null);

    // Bebidas

    const res81 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/licores');
    json['Bebidas']['Licores'] = res81.filter((elemento) => elemento != null);

    const res82 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/vinos');
    json['Bebidas']['Vinos'] = res82.filter((elemento) => elemento != null);

    const res83 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/espumantes');
    json['Bebidas']['Espumantes'] = res83.filter((elemento) => elemento != null);

    const res84 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/cervezas');
    json['Bebidas']['Cervezas'] = res84.filter((elemento) => elemento != null);

    const res85 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/gaseosas');
    json['Bebidas']['Gaseosas'] = res85.filter((elemento) => elemento != null);

    const res86 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/aguas');
    json['Bebidas']['Aguas'] = res86.filter((elemento) => elemento != null);

    const res87 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/jugos-y-otras-bebidas');
    json['Bebidas']['Jugos y Otras Bebidas'] = res87.filter((elemento) => elemento != null);

    const res88 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/bebidas-funcionales');
    json['Bebidas']['Bebidas Funcionales'] = res88.filter((elemento) => elemento != null);

    //Cuidado del Bebé

    const res91 = await pa_la_hu('https://www.plazavea.com.pe/bebe-e-infantil/panales-y-toallitas-para-bebe');
    json['Cuidado del Bebé']['Pañales y Toallitas para Bebé'] = res91.filter((elemento) => elemento != null);

    const res92 = await pa_la_hu('https://www.plazavea.com.pe/bebe-e-infantil/alimentacion-del-bebe');
    json['Cuidado del Bebé']['Alimentación del Bebé'] = res92.filter((elemento) => elemento != null);

    const res93 = await pa_la_hu('https://www.plazavea.com.pe/bebe-e-infantil/cuidado-y-aseo-del-bebe');
    json['Cuidado del Bebé']['Cuidado y Aseo del Bebé'] = res93.filter((elemento) => elemento != null);

    //Cuidado Personal y Salud

    const res94 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/cuidado-del-cabello');
    json['Cuidado Personal y Salud']['Cuidado del Cabello'] = res94.filter((elemento) => elemento != null);

    const res95 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/higiene-personal');
    json['Cuidado Personal y Salud']['Higiene Personal'] = res95.filter((elemento) => elemento != null);

    const res96 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/cuidado-bucal');
    json['Cuidado Personal y Salud']['Cuidado Bucal'] = res96.filter((elemento) => elemento != null);

    const res97 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/cuidado-de-la-piel');
    json['Cuidado Personal y Salud']['Cuidado de la Piel'] = res97.filter((elemento) => elemento != null);

    const res98 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/proteccion-femenina');
    json['Cuidado Personal y Salud']['Protección Femenina'] = res98.filter((elemento) => elemento != null);

    const res99 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/proteccion-adulta');
    json['Cuidado Personal y Salud']['Protección Adulta'] = res99.filter((elemento) => elemento != null);

    const res100 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/afeitado-y-depilacion');
    json['Cuidado Personal y Salud']['Afeitado y Depilación'] = res100.filter((elemento) => elemento != null);

    const res103 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/salud');
    json['Cuidado Personal y Salud']['Salud'] = res103.filter((elemento) => elemento != null);

    const res104 = await pa_la_hu('https://www.plazavea.com.pe/cuidado-personal-y-salud/vitaminas-y-nutricion');
    json['Cuidado Personal y Salud']['Vitaminas y Nutrición'] = res104.filter((elemento) => elemento != null);

    //Mercado Saludable

    const res114 = await pa_la_hu('https://www.plazavea.com.pe/mercado-saludable/alimentos-organicos/');
    json['Mercado Saludable']['Alimentos Orgánicos'] = res114.filter((elemento) => elemento != null);

    const res117 = await pa_la_hu('https://www.plazavea.com.pe/mercado-saludable/desayunos-organicos/');
    json['Mercado Saludable']['Desayunos Orgánicos'] = res117.filter((elemento) => elemento != null);

    const res118 = await pa_la_hu('https://www.plazavea.com.pe/mercado-saludable/snacks-organicos/');
    json['Mercado Saludable']['Snacks Orgánicos'] = res118.filter((elemento) => elemento != null);

    const res119 = await pa_la_hu('https://www.plazavea.com.pe/mercado-saludable/vitaminas-y-suplementos-organicos/');
    json['Mercado Saludable']['Vitaminas y Suplementos Orgánicos'] = res119.filter((elemento) => elemento != null);

    await browser.close()

    return json

}

export {

    json_formater

}