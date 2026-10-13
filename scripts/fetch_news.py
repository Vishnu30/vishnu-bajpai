"""Pulls martech, CRM and RevOps headlines into data/news.json. Run by GitHub Actions daily."""
import json, urllib.request, urllib.parse, xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone

QUERIES = ["Braze customer engagement", "Salesforce Agentforce", "revenue operations", "martech", "CRM marketing automation"]
items, seen = [], set()
for q in QUERIES:
    url = "https://news.google.com/rss/search?" + urllib.parse.urlencode({"q": q + " when:7d", "hl": "en-IN", "gl": "IN", "ceid": "IN:en"})
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        root = ET.fromstring(urllib.request.urlopen(req, timeout=20).read())
    except Exception as e:
        print("skip", q, e); continue
    for it in root.iter("item"):
        title = (it.findtext("title") or "").strip()
        src = (it.findtext("source") or "").strip()
        if src and title.endswith(" - " + src): title = title[: -len(src) - 3]
        key = title.lower()[:70]
        if not title or key in seen: continue
        seen.add(key)
        try: dt = parsedate_to_datetime(it.findtext("pubDate")).astimezone(timezone.utc)
        except Exception: dt = datetime.now(timezone.utc)
        items.append({"title": title, "source": src, "link": it.findtext("link"), "topic": q, "date": dt.isoformat()})
items.sort(key=lambda x: x["date"], reverse=True)
json.dump({"updated": datetime.now(timezone.utc).isoformat(), "items": items[:20]}, open("data/news.json", "w"), ensure_ascii=False, indent=2)
print(len(items[:20]), "headlines")
