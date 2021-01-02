export function PostSecretData(pid, year) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  year = year.slice(year.length - 4);

  return fetch(
    `${process.env.REACT_APP_SECRET_URL}${pid}&born=${year}`,
    requestOptions
  );
}
