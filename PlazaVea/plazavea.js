import puppeteer from "puppeteer";

const browser = await puppeteer.launch({

    headless: 'new',

});

const categoria = async function Categorias() {

    const page = await browser.newPage();

    await page.goto('https://www.plazavea.com.pe/packs');

    const result = await page.evaluate(() => {

        const body = document.querySelectorAll('li[class="dropdown-menu__item has-children"]');

        const data = [...body].map((body) => {

            const category = body.querySelector('div > span.dropdown-menu__item__text > span').innerHTML;
            const subcategory = [...body.querySelectorAll('ul > li.dropdown-menu__item > div > a')].map((sub) => sub.innerHTML);
            const for_subcategory = {};
            subcategory.forEach(sub => {

                for_subcategory[`${sub}`] = {};

            });

            const for_category = {};

            for_category[`${category}`] = for_subcategory;

            return for_category;

        })

        return data;

    });

    return { plazavea:  result };

}

const pa_la_hu = async function Packs_lacteos_huevos(url) {

    const page = await browser.newPage();

    await page.goto(url);

    const result = await page.evaluate(() => {

        const body = document.querySelectorAll('div[class="Showcase__details"]');

        const data = [...body].map((body) => {

            const marca = body.querySelector('div.Showcase__brand > a').innerHTML;
            const texto = body.querySelector('a[class="Showcase__name"]').innerHTML;
            const precios = [...body.querySelectorAll('span.price')].map((price) => price.innerHTML.replace(/[^0-9.]/g, ''));

            if ( precios.length > 0 ) {

                return {

                    marca,
                    texto,
                    precio_fisica: precios[0],
                    precio_virtual: precios[1]
    
                };

            }

        })

        return data;

    });

    return result;

}

const json_formater = async function Final() {

    return categoria().then(async (result) => {

        //Ahorro Packs

        const res = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-lacteos-y-huevos');
        result['plazavea'][0]['Ahorro Packs']['Packs Lácteos y Huevos'] = res.filter((elemento) => elemento != null);
        
        const res2 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-abarrotes');
        result['plazavea'][0]['Ahorro Packs']['Packs Abarrotes'] = res2.filter((elemento) => elemento != null);

        const res3 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-desayunos');
        result['plazavea'][0]['Ahorro Packs']['Packs Desayunos'] = res3.filter((elemento) => elemento != null);

        const res4 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-panaderia-y-pasteleria');
        result['plazavea'][0]['Ahorro Packs']['Packs Panadería y Pastelería'] = res4.filter((elemento) => elemento != null);

        const res5 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-pollo-rostizado-y-comidas-preparadas');
        result['plazavea'][0]['Ahorro Packs']['Packs Pollo rostizado y Comidas preparadas'] = res5.filter((elemento) => elemento != null);

        const res6 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-bebidas');
        result['plazavea'][0]['Ahorro Packs']['Packs Bebidas'] = res6.filter((elemento) => elemento != null);

        const res7 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-bebe-e-infantil');
        result['plazavea'][0]['Ahorro Packs']['Packs Bebé e Infantil'] = res7.filter((elemento) => elemento != null);

        const res8 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-cuidado-personal-y-salud');
        result['plazavea'][0]['Ahorro Packs']['Packs Cuidado personal y salud'] = res8.filter((elemento) => elemento != null);

        const res9 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-limpieza');
        result['plazavea'][0]['Ahorro Packs']['Packs Limpieza'] = res9.filter((elemento) => elemento != null);

        const res10 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-mascotas');
        result['plazavea'][0]['Ahorro Packs']['Packs Mascotas'] = res10.filter((elemento) => elemento != null);

        const res11 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-congelados');
        result['plazavea'][0]['Ahorro Packs']['Packs Congelados'] = res11.filter((elemento) => elemento != null);

        const res12 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-quesos-y-fiambres');
        result['plazavea'][0]['Ahorro Packs']['Packs Quesos y Fiambres'] = res12.filter((elemento) => elemento != null);

        //packs-carnes-aves-y-pescados --> no existe
        // const res13 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-mascotas');
        // result[0]['Ahorro Packs']['Packs Bebidas'] = res13.filter((elemento) => elemento != null);

        //packs-frutas-y-verduras --> no existe
        // const res14 = await pa_la_hu('https://www.plazavea.com.pe/packs/packs-mascotas');
        // result[0]['Ahorro Packs']['Packs Bebidas'] = res14.filter((elemento) => elemento != null);

        //Carnes, Aves y Pescados

        const res15 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pollo');
        result['plazavea'][1]['Carnes, Aves y Pescados']['Pollo'] = res15.filter((elemento) => elemento != null);

        const res16 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/res');
        result['plazavea'][1]['Carnes, Aves y Pescados']['Res'] = res16.filter((elemento) => elemento != null);

        const res17 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/cerdo');
        result['plazavea'][1]['Carnes, Aves y Pescados']['Cerdo'] = res17.filter((elemento) => elemento != null);

        const res18 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pescados-y-mariscos');
        result['plazavea'][1]['Carnes, Aves y Pescados']['Pescados y Mariscos'] = res18.filter((elemento) => elemento != null);

        const res19 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pavo-pavita-y-otras-aves');
        result['plazavea'][1]['Carnes, Aves y Pescados']['Pavo, Pavita y Gallina'] = res19.filter((elemento) => elemento != null);

        const res20 = await pa_la_hu('https://www.plazavea.com.pe/congelados/enrollados');
        result['plazavea'][1]['Carnes, Aves y Pescados']['Enrollados'] = res20.filter((elemento) => elemento != null);

        const res21 = await pa_la_hu('https://www.plazavea.com.pe/congelados/hamburguesas-nuggets-y-apanados');
        result['plazavea'][1]['Carnes, Aves y Pescados']['Hamburguesas, Nuggets y Apanados'] = res21.filter((elemento) => elemento != null);

        //Frutas y Verduras

        const res22 = await pa_la_hu('https://www.plazavea.com.pe/frutas-y-verduras/frutas');
        result['plazavea'][2]['Frutas y Verduras']['Frutas'] = res22.filter((elemento) => elemento != null);

        const res24 = await pa_la_hu('https://www.plazavea.com.pe/frutas-y-verduras/verduras');
        result['plazavea'][2]['Frutas y Verduras']['Verduras'] = res24.filter((elemento) => elemento != null);

        //Congelados

        const res25 = await pa_la_hu('https://www.plazavea.com.pe/congelados/hamburguesas-nuggets-y-apanados');
        result['plazavea'][3]['Congelados']['Hamburguesas, Nuggets y Apanados'] = res25.filter((elemento) => elemento != null);
        
        const res26 = await pa_la_hu('https://www.plazavea.com.pe/congelados/enrollados');
        result['plazavea'][3]['Congelados']['Enrollados'] = res26.filter((elemento) => elemento != null);

        const res27 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pescados-y-mariscos/pescados-congelados');
        result['plazavea'][3]['Congelados']['Pescados Congelados'] = res27.filter((elemento) => elemento != null);

        const res28 = await pa_la_hu('https://www.plazavea.com.pe/carnes-aves-y-pescados/pescados-y-mariscos/mariscos-congelados');
        result['plazavea'][3]['Congelados']['Mariscos Congelados'] = res28.filter((elemento) => elemento != null);

        const res29 = await pa_la_hu('https://www.plazavea.com.pe/frutas-y-verduras/frutas/frutas-congeladas');
        result['plazavea'][3]['Congelados']['Frutas Congeladas'] = res29.filter((elemento) => elemento != null);

        const res30 = await pa_la_hu('https://www.plazavea.com.pe/frutas-y-verduras/verduras/verduras-congeladas');
        result['plazavea'][3]['Congelados']['Verduras Congeladas'] = res30.filter((elemento) => elemento != null);

        const res31 = await pa_la_hu('https://www.plazavea.com.pe/congelados/panes-pastas-bocaditos-y-salsas');
        result['plazavea'][3]['Congelados']['Panes, Pastas, Bocaditos y Salsas'] = res31.filter((elemento) => elemento != null);

        const res32 = await pa_la_hu('https://www.plazavea.com.pe/congelados/helados-y-postres');
        result['plazavea'][3]['Congelados']['Helados y Postres'] = res32.filter((elemento) => elemento != null);

        const res33 = await pa_la_hu('https://www.plazavea.com.pe/bebidas/hielo');
        result['plazavea'][3]['Congelados']['Hielo'] = res33.filter((elemento) => elemento != null);

        //Lacteos y huevos

        const res34 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/leche');
        result['plazavea'][4]['Lácteos y Huevos']['Leche'] = res34.filter((elemento) => elemento != null);

        const res35 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/yogurt');
        result['plazavea'][4]['Lácteos y Huevos']['Yogurt'] = res35.filter((elemento) => elemento != null);

        const res36 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/huevos');
        result['plazavea'][4]['Lácteos y Huevos']['Huevos'] = res36.filter((elemento) => elemento != null);

        const res37 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/mantequilla-y-margarina');
        result['plazavea'][4]['Lácteos y Huevos']['Mantequilla y Margarina'] = res37.filter((elemento) => elemento != null);

        //Quesos y Fiambres

        const res38 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/quesos-blandos');
        result['plazavea'][5]['Quesos y Fiambres']['Quesos Blandos'] = res38.filter((elemento) => elemento != null);

        const res39 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/quesos-semiduros');
        result['plazavea'][5]['Quesos y Fiambres']['Quesos Semiduros'] = res39.filter((elemento) => elemento != null);

        const res40 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/quesos-duros');
        result['plazavea'][5]['Quesos y Fiambres']['Quesos Duros'] = res40.filter((elemento) => elemento != null);

        const res41 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/quesos-procesados');
        result['plazavea'][5]['Quesos y Fiambres']['Quesos Procesados'] = res41.filter((elemento) => elemento != null);

        const res42 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/embutidos');
        result['plazavea'][5]['Quesos y Fiambres']['Embutidos'] = res42.filter((elemento) => elemento != null);

        const res43 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/jamonadas-y-jamones-cocidos');
        result['plazavea'][5]['Quesos y Fiambres']['Jamonadas y Jamones Cocidos'] = res43.filter((elemento) => elemento != null);

        const res44 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/jamones-madurados');
        result['plazavea'][5]['Quesos y Fiambres']['Jamones Madurados'] = res44.filter((elemento) => elemento != null);

        const res45 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/salames-y-salchichones');
        result['plazavea'][5]['Quesos y Fiambres']['Salames y Salchichones'] = res45.filter((elemento) => elemento != null);

        const res46 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/otros-fiambres');
        result['plazavea'][5]['Quesos y Fiambres']['Otros Fiambres'] = res46.filter((elemento) => elemento != null);

        const res47 = await pa_la_hu('https://www.plazavea.com.pe/quesos-y-fiambres/tablas-y-piqueos');
        result['plazavea'][5]['Quesos y Fiambres']['Tablas y Piqueos'] = res47.filter((elemento) => elemento != null);

        //Abarrotes

        const res48 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/arroz');
        result['plazavea'][6]['Abarrotes']['Arroz'] = res48.filter((elemento) => elemento != null);

        const res49 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/aceite');
        result['plazavea'][6]['Abarrotes']['Aceite'] = res49.filter((elemento) => elemento != null);

        const res50 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/azucar-y-endulzantes');
        result['plazavea'][6]['Abarrotes']['Azúcar y Endulzantes'] = res50.filter((elemento) => elemento != null);

        const res51 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/menestras');
        result['plazavea'][6]['Abarrotes']['Menestras'] = res51.filter((elemento) => elemento != null);

        const res52 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/conservas/');
        result['plazavea'][6]['Abarrotes']['Conservas'] = res52.filter((elemento) => elemento != null);

        const res53 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/fideos-pastas-y-salsas');
        result['plazavea'][6]['Abarrotes']['Fideos, Pastas y Salsas'] = res53.filter((elemento) => elemento != null);

        const res54 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/salsas-cremas-y-condimentos');
        result['plazavea'][6]['Abarrotes']['Salsas, Cremas y Condimentos'] = res54.filter((elemento) => elemento != null);

        const res55 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/comidas-instantaneas');
        result['plazavea'][6]['Abarrotes']['Comidas Instantáneas'] = res55.filter((elemento) => elemento != null);

        const res56 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/galletas-y-golosinas');
        result['plazavea'][6]['Abarrotes']['Galletas y Golosinas'] = res56.filter((elemento) => elemento != null);

        const res57 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/chocolateria');
        result['plazavea'][6]['Abarrotes']['Chocolatería'] = res57.filter((elemento) => elemento != null);

        const res58 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/snacks-y-piqueos');
        result['plazavea'][6]['Abarrotes']['Snacks y Piqueos'] = res58.filter((elemento) => elemento != null);

        //Desayunos

        const res59 = await pa_la_hu('https://www.plazavea.com.pe/desayunos/cafe-e-infusiones');
        result['plazavea'][7]['Desayunos']['Café e Infusiones'] = res59.filter((elemento) => elemento != null);

        const res60 = await pa_la_hu('https://www.plazavea.com.pe/desayunos/cereales');
        result['plazavea'][7]['Desayunos']['Cereales'] = res60.filter((elemento) => elemento != null);

        const res61 = await pa_la_hu('https://www.plazavea.com.pe/desayunos/modificadores-de-leche');
        result['plazavea'][7]['Desayunos']['Modificadores de Leche'] = res61.filter((elemento) => elemento != null);

        const res62 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/leche');
        result['plazavea'][7]['Desayunos']['Leche'] = res62.filter((elemento) => elemento != null);

        const res63 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/yogurt');
        result['plazavea'][7]['Desayunos']['Yogurt'] = res63.filter((elemento) => elemento != null);

        const res64 = await pa_la_hu('https://www.plazavea.com.pe/lacteos-y-huevos/mantequilla-y-margarina');
        result['plazavea'][7]['Desayunos']['Mantequilla y Margarina'] = res64.filter((elemento) => elemento != null);

        const res65 = await pa_la_hu('https://www.plazavea.com.pe/desayunos/mermeladas-mieles-y-dulces');
        result['plazavea'][7]['Desayunos']['Mermeladas, Mieles y Dulces'] = res65.filter((elemento) => elemento != null);

        const res66 = await pa_la_hu('https://www.plazavea.com.pe/abarrotes/azucar-y-endulzantes');
        result['plazavea'][7]['Desayunos']['Azúcar y Endulzantes'] = res66.filter((elemento) => elemento != null);

        const res67 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/pan-de-la-casa');
        result['plazavea'][7]['Desayunos']['Pan de la Casa'] = res67.filter((elemento) => elemento != null);

        const res68 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/pan-envasado');
        result['plazavea'][7]['Desayunos']['Pan Envasado'] = res68.filter((elemento) => elemento != null);

        //Panaderia y Pasteleria

        const res69 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/pan-envasado');
        result['plazavea'][8]['Panadería y Pastelería']['Pan Envasado'] = res69.filter((elemento) => elemento != null);

        const res70 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/pan-de-la-casa');
        result['plazavea'][8]['Panadería y Pastelería']['Pan de la Casa'] = res70.filter((elemento) => elemento != null);

        const res71 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/pasteleria');
        result['plazavea'][8]['Panadería y Pastelería']['Pastelería'] = res71.filter((elemento) => elemento != null);

        const res72 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/panetones');
        result['plazavea'][8]['Panadería y Pastelería']['Panetones'] = res72.filter((elemento) => elemento != null);

        const res73 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/postres');
        result['plazavea'][8]['Panadería y Pastelería']['Postres'] = res73.filter((elemento) => elemento != null);

        const res74 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/reposteria');
        result['plazavea'][8]['Panadería y Pastelería']['Repostería'] = res74.filter((elemento) => elemento != null);

        const res75 = await pa_la_hu('https://www.plazavea.com.pe/panaderia-y-pasteleria/tortillas-y-masas');
        result['plazavea'][8]['Panadería y Pastelería']['Tortillas y Masas'] = res75.filter((elemento) => elemento != null);

        //Pollo Rostizado y Comidas Preparadas

        const res76 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/pollo-rostizado');
        result['plazavea'][9]['Pollo Rostizado y Comidas Preparadas']['Pollo Rostizado'] = res76.filter((elemento) => elemento != null);

        const res77 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
        result['plazavea'][9]['Pollo Rostizado y Comidas Preparadas']['Comidas Preparadas'] = res77.filter((elemento) => elemento != null);

        const res78 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
        result['plazavea'][9]['Pollo Rostizado y Comidas Preparadas']['Cremas, Salsas y Condimentos a Granel'] = res78.filter((elemento) => elemento != null);

        const res79 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
        result['plazavea'][9]['Pollo Rostizado y Comidas Preparadas']['Pizzas y Pastas Frescas'] = res79.filter((elemento) => elemento != null);

        const res80 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
        result['plazavea'][9]['Pollo Rostizado y Comidas Preparadas']['Tamales y Humitas'] = res80.filter((elemento) => elemento != null);

        //Bebidas

        

        // const res81 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
        // result[9]['Pollo Rostizado y Comidas Preparadas']['Pastas, Bocaditos Y Salsas'] = res77.filter((elemento) => elemento != null);

        // const res82 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
        // result[9]['Pollo Rostizado y Comidas Preparadas']['Pollo Rostizado'] = res77.filter((elemento) => elemento != null);

        // const res83 = await pa_la_hu('https://www.plazavea.com.pe/pollo-rostizado-y-comidas-preparadas/comidas-preparadas');
        // result[9]['Pollo Rostizado y Comidas Preparadas']['Pollo Rostizado'] = res77.filter((elemento) => elemento != null);

        await browser.close();

        return result;
        
    })

    // categoria()[0]['Ahorro Packs']['Packs Lácteos y Huevos'] = Packs_lacteos_huevos();
}

export {

    json_formater

}