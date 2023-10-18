// Fonction pour obtenir les paramètres de l'URL
const getURLParams = () =>{
  const urlParams = new URLSearchParams(window.location.search);
  return {
    eyeColor: urlParams.get('eyeColor') || '',
    age: urlParams.get('age') || '',
  };
}

// Fonction pour construire l'URL
const buildUrl = (eyeColor, age) => {
  const newUrlParams = new URLSearchParams(window.location.search);
  eyeColor
    ? newUrlParams.set('eyeColor', eyeColor)
    : newUrlParams.delete('eyeColor');
  age ? newUrlParams.set('age', age) : newUrlParams.delete('age');
  return newUrlParams;
}

const urlUtils = {
  getURLParams,
  buildUrl,
};

export default urlUtils;
