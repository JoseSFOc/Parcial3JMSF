## Ejecutar API
1. Instalar proyecto: 
```
npm install
```
2. Abrir servidor base de datos
```
sudo service mongod start
```
3. Ejecutar nodejs
```
npm start
```



MongoDB:

__________________

```
Step 1: Remove lock file.
sudo rm /var/lib/mongodb/mongod.lock

Step 2: Repair mongodb. 
sudo mongod --repair 

Step 3: start mongodb.
sudo start mongodb 
or
sudo service mongodb start

Step 4: Check status of mongodb.
sudo status mongodb 
or   
sudo service mongodb status

Step 5: Start mongo console.
mongo 
```

