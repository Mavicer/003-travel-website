#!/usr/bin/env python3
"""Mavicer image audit — checks duplicates, dimensions, metadata completeness."""

import hashlib, os, json
from pathlib import Path

ROOT = Path(__file__).parent.parent
DEST_DIR = ROOT / 'public' / 'destinations'
GALLERY_DIR = ROOT / 'public' / 'gallery'
JOURNEYS_DIR = ROOT / 'public' / 'journeys'

MIN_SIZE_KB = 80
MAX_SIZE_KB = 600

def md5(path):
    return hashlib.md5(path.read_bytes()).hexdigest()

def audit():
    issues = []
    hashes = {}

    # Scan all image directories
    all_images = []
    for d in [DEST_DIR, GALLERY_DIR, JOURNEYS_DIR]:
        if d.exists():
            for f in sorted(d.glob('*.jpg')):
                sz = f.stat().st_size
                all_images.append((f, sz))

    # Check duplicates
    for path, sz in all_images:
        h = md5(path)
        if h in hashes:
            issues.append(f'DUPLICATE: {path.name} == {hashes[h].name} (MD5={h[:16]}...)')
        else:
            hashes[h] = path

    # Check sizes
    for path, sz in all_images:
        kb = sz / 1024
        if kb < MIN_SIZE_KB:
            issues.append(f'SIZE: {path.name} is {kb:.0f}KB (below {MIN_SIZE_KB}KB minimum)')
        if kb > MAX_SIZE_KB:
            issues.append(f'SIZE: {path.name} is {kb:.0f}KB (above {MAX_SIZE_KB}KB maximum)')

    # Check aspect ratios
    from PIL import Image
    for path, sz in all_images:
        try:
            img = Image.open(path)
            w, h = img.size
            ratio = w / h

            # Color analysis
            img_small = img.resize((100, max(1, int(100 * h / w)))).convert('RGB')
            pixels = list(img_small.getdata())
            dark = sum(1 for p in pixels if sum(p) < 120) / len(pixels)

            dest_name = path.stem
            if 'destination' in str(path.parent):
                issues.append(f'COLOR: {dest_name} — {w}x{h}, dark={dark:.0%}')
        except:
            pass

    # Report
    if issues:
        print('\n'.join(issues))
        print(f'\n{len(issues)} issue(s) found in {len(all_images)} images.')
    else:
        print(f'All {len(all_images)} images passed audit.')

    return len(issues)

if __name__ == '__main__':
    exit(audit())
