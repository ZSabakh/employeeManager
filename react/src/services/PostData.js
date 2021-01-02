export function PostData(url, params, isFile) {
  var myHeaders = new Headers();
  if (localStorage.getItem("token")) {
    myHeaders.append("Authorization", localStorage.getItem("token"));
  }
  if (isFile !== true) {
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  }

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: params,
    redirect: "follow",
  };

  return fetch(
    "http://localhost:4000/" + url,
    requestOptions
  ).then((response) => response.json());
}
