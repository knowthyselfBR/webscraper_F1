import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

//function to fetch data
async function getF1Drivers () {
    try {
        const response = await fetch('https://www.formula1.com/en/drivers.html');
        const responseText = await response.text();

        //load to cherio
        const $ = cheerio.load(responseText);

        //array organize info
        const drivers = [];

        //get each item with class col-12
        $('.listing-items--wrapper > .row > .col-12').map((i, el) => {
            //test with rank class

            const firstName = $(el).find('.listing-item--name span:first').text();
            const lastName = $(el).find('.listing-item--name span:last').text();
            const team = $(el).find('.listing-item--team').text();
            const photo = $(el).find('.listing-item--photo img').attr('data-src');

            //push to array
            drivers.push({
                firstName,
                lastName,
                team,
                photo
            });
        });

        //log array
        console.log(drivers);


    } catch (error) {
        console.log(error);
    }
}

//execute function
getF1Drivers();