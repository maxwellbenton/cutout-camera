"""Build scripts/vocab.txt: the object names the detector can output.

Merges the LVIS, Objects365 and Open Images class lists that ship with
Ultralytics, plus scripts/vocab_extra.txt (yard, garden and text-bearing
things). Edit vocab_extra.txt, rerun this, then rerun export_model.py.
"""
import re
from pathlib import Path

import yaml
import ultralytics

here = Path(__file__).resolve().parent
cfg = Path(ultralytics.__file__).parent / "cfg" / "datasets"

# Dataset classes that are scene-level, too vague, or produce silly filenames.
# (Names listed in vocab_extra.txt are always kept.)
SKIP = {
    "other shoes", "other fish", "other balls", "person", "human body", "human face", "human head",
    "human hand", "human arm", "human leg", "human foot", "human ear", "human eye", "human mouth",
    "human nose", "human hair", "human beard", "mammal", "animal", "land vehicle", "vehicle",
    "clothing", "fashion accessory", "food", "drink", "furniture", "tool", "toy", "plant",
}


def clean(name: str) -> str:
    name = name.split("/")[0]  # LVIS synonyms: "airplane/aeroplane"
    name = re.sub(r"\(.*?\)", "", name).replace("_", " ")
    return re.sub(r"\s+", " ", name).strip().lower()


names: list[str] = []
seen: set[str] = set()


def add(n: str, extra: bool = False) -> None:
    n = clean(n)
    if not n or n in seen or (n in SKIP and not extra):
        return
    # crude plural de-dup: keep "tree" if "trees" also appears
    if n.endswith("s") and n[:-1] in seen:
        return
    seen.add(n)
    names.append(n)


# Extras first so their wording wins on duplicates.
for line in (here / "vocab_extra.txt").read_text().splitlines():
    if line.strip() and not line.startswith("#"):
        add(line, extra=True)
for f in ["lvis.yaml", "Objects365.yaml", "open-images-v7.yaml"]:
    for n in yaml.safe_load((cfg / f).read_text())["names"].values():
        add(n)

(here / "vocab.txt").write_text("\n".join(names) + "\n")
print(len(names), "names →", here / "vocab.txt")
