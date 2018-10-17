data = read_json(DATA)
keys = read_json(KEYS)

header = msgunpack(base64(data.header))

server_key = ECDH.new()
server_key:private(base64(keys.private))

payload = decrypt(server_key, base64(header.pub_key), map(data, base64))

print(JSON.encode(msgunpack(payload.text)))
