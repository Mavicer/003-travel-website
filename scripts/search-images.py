#!/usr/bin/env python3
"""Search Unsplash API for landmark-specific destination images and download them."""
import json, urllib.request, os, hashlib, sys

API_KEY = "Pj9TVoJ2xLE22jYhWRowvoCPi55ePT4Z_zg2-PvxvBA"
DEST_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "destinations")

QUERIES = {
    "kyoto": "Arashiyama bamboo grove Kyoto Japan morning mist",
    "santorini": "Santorini Oia white buildings blue dome church Aegean sea",
    "banff": "Moraine Lake Banff National Park turquoise water mountain reflection",
    "amalfi-coast": "Positano Amalfi Coast colorful cliffside houses Italy Mediterranean",
    "bali": "Tegallalang rice terrace Ubud Bali Indonesia green tropical",
    "patagonia": "Fitz Roy Patagonia mountain peak lake reflection Argentina",
    "shanghai": "Shanghai Bund Lujiazui night skyline Oriental Pearl Tower illuminated",
    "jiuzhaigou": "Jiuzhaigou Five Flower Lake turquoise autumn forest China",
    "chongqing": "Hongyadong Chongqing night stilt houses Jialing River illuminated golden",
    "xian": "Terracotta Warriors Xi'an museum army pit archaeological China",
}

def search_unsplash(query):
    url = f"https://api.unsplash.com/search/photos?query={urllib.parse.quote(query)}&per_page=1&orientation=landscape"
    req = urllib.request.Request(url, headers={"Authorization": f"Client-ID {API_KEY}"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read())

def download(url, path):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    with open(path, 'wb') as f:
        f.write(data)
    return len(data)

def md5(path):
    with open(path, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

results = {}
for dest, query in QUERIES.items():
    print(f"\n=== {dest}: {query[:60]}... ===")
    try:
        data = search_unsplash(query)
        if not data.get('results'):
            print("  NO RESULTS")
            continue

        r = data['results'][0]
        photo_id = r['id']
        alt = r.get('alt_description', '')
        desc = r.get('description', '')
        tags = [t['title'] for t in (r.get('tags_preview') or r.get('tags', []))[:5]]
        photographer = r['user']['name']
        dl_url = r['urls']['raw'] + '&w=1200&q=85&fit=crop'

        print(f"  id: {photo_id}")
        print(f"  alt: {alt}")
        print(f"  desc: {desc}")
        print(f"  tags: {' | '.join(tags)}")
        print(f"  photographer: {photographer}")

        # Download
        path = os.path.join(DEST_DIR, f"{dest}.jpg")
        size = download(dl_url, path)
        file_md5 = md5(path)
        print(f"  SIZE: {size} bytes")
        print(f"  MD5: {file_md5[:16]}...")

        results[dest] = {
            'id': photo_id,
            'alt': alt,
            'desc': desc,
            'tags': tags,
            'photographer': photographer,
            'size': size,
            'md5': file_md5,
        }
    except Exception as e:
        print(f"  ERROR: {e}")

# Check for duplicates
print("\n=== DUPLICATE CHECK ===")
hashes = {}
for dest, info in results.items():
    h = info['md5']
    if h in hashes:
        print(f"  DUPLICATE: {dest} == {hashes[h]}")
    else:
        hashes[h] = dest
print("  No duplicates found." if len(hashes) == len(results) else "")

print(f"\nDone. {len(results)} of {len(QUERIES)} destinations processed.")
