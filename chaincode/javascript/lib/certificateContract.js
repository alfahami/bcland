/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class TitreContract extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const titres = [
            {
                
                fullName: 'Zineb Ghayyati',
                cin: 'MA2150124K',
                address: '132 Rue 2 Hay Maamora Kenitra',
                email: 'zineb.ghayyaty@gmail.com ',
                index: '41',
                city_fonc: 'Kenitra',
                special_index: 'BIS'
                
            },
            {
                
                fullName: 'Mehdi Kaghat',
                cin: 'MA215457JK',
                address: '132 Rue 2 Hay Saknia Kenitra',
                email: 'mehdi.ghayyaty@gmail.com ',
                index: '45',
                city_fonc: 'Kenitra',
                special_index: 'BIS1'
                
            },
            {
                
                fullName: 'Ilyass Mohammed',
                cin: 'MA214788M',
                address: '8 Rue 2 Era Fes',
                email: 'il.moh@gmail.com ',
                index: '43',
                city_fonc: 'Meknes',
                special_index: 'BIS3'
                
            },
            {
                
                fullName: 'Soufiane Mter',
                cin: 'MA457154P',
                address: 'Rue 7 Hay Annaim Sale',
                email: 'souf.mtery@gmail.com ',
                index: '53',
                city_fonc: 'Safi',
                special_index: 'BIS4'
                
            },
            {
                
                fullName: 'Irchad Ayoub',
                cin: 'MA412357PM',
                address: '7E Rue Al Karaouine, Fes',
                email: 'irchad.ayouby@gmail.com ',
                index: 'K',
                city_fonc: 'Kenitra',
                special_index: 'BIS5'
                
            },
            {
                
                fullName: 'Mahamet Soukaina',
                cin: 'MA2204578JH',
                address: '70 AV Rachad Narjis, Kenitra',
                email: 'soukaina.mahamat@gmail.com ',
                index: '4F',
                city_fonc: 'Beni Melal',
                special_index: 'BIS6'
                
            },
            {
                
                fullName: 'Aya Samadi',
                cin: 'MA85461OP',
                address: '12 Rue AV Alizee, Maamora Kenitra',
                email: 'aya.samadi@gmail.com ',
                index: '41F',
                city_fonc: 'Rabat',
                special_index: 'BIS7'
                
            },
            {
                
                fullName: 'Mourad Said',
                cin: 'MA2612458YK',
                address: '12e Rue Hay Rais, Tanger',
                email: 'mourad.said@gmail.com ',
                index: '51J',
                city_fonc: 'Marrakech',
                special_index: 'BIS8'
                
            },
            {
                
                fullName: 'Hiba Jeon',
                cin: 'MA2045132KM',
                address: 'Rue 5 Maarif Marrakech',
                email: 'hiba.jeon@gmail.com ',
                index: '27L',
                city_fonc: 'Fes',
                special_index: 'BIS9'
                
            }
        ];

        for (let i = 0; i < titres.length; i++) {
            titres[i].docType = 'titre';
            await ctx.stub.putState('TITRE' + i, Buffer.from(JSON.stringify(titres[i])));
            console.info('Added <--> ', titres[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryTitres(ctx, titreNumber) {
        const titreAsBytes = await ctx.stub.getState(titreNumber); // get the titre from chaincode state
        if (!titreAsBytes || titreAsBytes.length === 0) {
            throw new Error(`${titreNumber} does not exist`);
        }
        console.log(titreAsBytes.toString());
        return titreAsBytes.toString();
    }

    async createTitre(ctx, titreNumber, fullName, cin, address, email, index, city_fonc, special_fonc) {
        console.info('============= START : Create Titre ===========');

        const titre = {
            fullName,
            docType: 'titre',
            cin,
            address,
            email,
            index,
            city_fonc,
            special_fonc,
        };

        await ctx.stub.putState(titreNumber, Buffer.from(JSON.stringify(titre)));
        console.info('============= END : Create titre ===========');
    }

    async queryAllTitres(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeOwnerName(ctx, titreNumber, newName) {
        console.info('============= START : changeOwnerName ===========');

        const titreAsBytes = await ctx.stub.getState(titreNumber); // get the titre from chaincode state
        if (!titreAsBytes || titreAsBytes.length === 0) {
            throw new Error(`${titreNumber} does not exist`);
        }
        const titre = JSON.parse(titreAsBytes.toString());
        titre.fullName = newName;

        await ctx.stub.putState(titreNumber, Buffer.from(JSON.stringify(titre)));
        console.info('============= END : changeOwnerName ===========');
    }

}

module.exports = TitreContract;
