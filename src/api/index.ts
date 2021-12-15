const host = () => {
  switch (window.location.host) {
    case 'localhost:3001':
      return 'http://localhost:3000';
    case '192.168.43.5:3001':
      return 'http://192.168.43.5:3000'
    default: 
      return '';
  };
};

const api = (path : string, method : "POST" | "GET" | "PUT" | "DELETE", body? : iBody) => {
  return fetch(host() + path, {
    method,
    headers: {
      'Content-Type' : 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })
  .then(res => res.json());
};

export default api;