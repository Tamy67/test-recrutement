import urlUtils from '../url/url.js';
import renderTable from '../table/table.js';

// Fonction pour récupérer et filtrer les données
async function fetchData() {
    try {
        const response = await fetch('../datas.json');
        const data = await response.json();
        const { eyeColor, age } = urlUtils.getURLParams();

        if (eyeColor) {
            document.getElementById('eyeColorFilter').value = eyeColor;
        }
        if (age) {
            document.getElementById('ageFilter').value = age;
        }

        const validEyeColors = ['blue', 'brown', 'green'];

        const filteredData = data.filter((item) => {
            let eyeColorMatch = true;
            let ageMatch = true;

            if (eyeColor) {
                eyeColorMatch =
                    validEyeColors.includes(eyeColor) &&
                    item.eyeColor === eyeColor;
            }

            if (age) {
                switch (age) {
                    case '20-25':
                        ageMatch = item.age >= 20 && item.age <= 25;
                        break;
                    case '26-30':
                        ageMatch = item.age >= 26 && item.age <= 30;
                        break;
                    case '31-35':
                        ageMatch = item.age >= 31 && item.age <= 35;
                        break;
                    case '36-41':
                        ageMatch = item.age >= 36 && item.age <= 41;
                        break;
                    default:
                        ageMatch = true;
                }
            }
            return eyeColorMatch && ageMatch;
        });

        renderTable(filteredData);
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
}

export default fetchData;
