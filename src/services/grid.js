import fetch from 'isomorphic-fetch'

export function getPopularList(params) {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${params.language}&sort=stars&order=desc&type=Repositories`);
  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => {
      return repos.items
    })
    .catch((error) => {
      console.warn(error);
      return null
    });
}


