const DECODE_SERVER = "http://185.54.115.75:5000/";

export async function get_data(path) {
  var url = DECODE_SERVER + path;
  var result = await fetch(url);
  return result;
}

export async function getSession() {
  const url = DECODE_SERVER + "init_disclosure";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      attribute_request: "ouderdan18",
      description: "Ben je 18 jaar of ouder?"
    })
  });
  return response.json();
}

export async function getSessionStatus(sessionId) {
  const url = DECODE_SERVER + "get_session_status";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId
    })
  });
  return response.json();
}

export async function getRequest(sessionId) {
  const url = DECODE_SERVER + "get_session";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId
    })
  });
  return response.json();
}
