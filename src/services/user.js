import fetch from 'isomorphic-fetch'

export function userLogin(params) {
  return fetch("/api/auth/login", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    credentials: 'same-origin',
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      console.warn(error);
      return null
    });
}

export function userLogout(params) {
  return fetch("/api/auth/logout", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    credentials: 'same-origin',
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      console.warn(error);
      return null
    });
}


