from pathlib import Path
p=Path('app/page.tsx')
b=p.read_bytes().replace(bytes.fromhex('e28099'),bytes([146]))
s=b.decode('utf-8',errors='surrogateescape')
s=''.join(bytes([ord(c)-0xdc00]).decode('cp1252') if 0xdc80<=ord(c)<=0xdcff else c for c in s)
p.write_text(s,encoding='utf-8')
