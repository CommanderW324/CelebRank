

parameters = ['topic_id', 'topic_name']
response = []
for row in rows:
    obj = {}
    for i in range(len(row)):
        obj[parameters[i]] = row[i]
    response.append(obj)
return response

