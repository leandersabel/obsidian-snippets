> [!custom-callout-id] Custom Callout Title
>  ```dataview
> (DATAVIEW QUERY)
> ```

Current & Future Trips
 ```dataview
 LIST
 FROM "Journal/Activities" 
 WHERE type = "trip" AND ((end >= date(today) AND start) OR (date >= date(today) AND date)) 
 SORT choice(!start, date, start) DESC 
 LIMIT 3
 ```
Past Trips
```dataview
LIST
FROM "Journal/Activities" 
WHERE type = "trip" AND ((end < date(today) AND start) OR (date < date(today) AND date)) 
SORT choice(!start, date, start) 
DESC LIMIT 3
```

Recent Activities
 ```dataview
 LIST WITHOUT ID link(file.path, regexreplace(file.name, "^\d{4}-\d{2}-\d{2} - ", ""))
 FROM "Journal/Activities" 
 WHERE contains(file.tags, "#activity") 
 SORT choice(!start, date, start) DESC 
 LIMIT 5
 ```

Going Out
 ```dataview
 LIST WITHOUT ID link(file.path, regexreplace(file.name, "^\d{4}-\d{2}-\d{2} - ", ""))
 FROM "Journal" 
 WHERE contains(file.tags, "#going-out") 
 SORT date DESC 
 LIMIT 5
 ```

Recent Landmarks
 ```dataviewjs
 let pages = dv.pages('"Journal/Activities"')
 	.where(p => (p.type == "trip" || p.type == "hike") && p.visited)
 	.sort(p => p.end, 'desc')
 	.limit(6);
 let landmarks = pages.flatMap(p => p.visited).slice(0, 6);
 dv.list(landmarks);
 ```
