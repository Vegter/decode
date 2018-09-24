const DECODE_SERVER = "http://127.0.0.1:5000/";

export async function get_data(path) {
  var url = DECODE_SERVER + path;
  var result = await fetch(url);
  return result;
}
