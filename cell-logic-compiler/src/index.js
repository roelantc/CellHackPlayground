// @ts-ignore
import { initKeys, onKey } from 'kontra';
initKeys();
onKey('p', function (e) {
    // pause the game
    console.log('pauze' + e);
});
onKey(['enter', 'space'], function (e) {
    // fire gun
    console.log('enter of spazie');
});
