import hashlib
import uuid

def generate_unique_hash():
  unique_id = uuid.uuid4().hex
  hash_object = hashlib.md5(unique_id.encode())
  hex_dig = hash_object.hexdigest()
  
  return hex_dig[:5].lower()