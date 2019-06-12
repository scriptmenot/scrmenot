# Podstawowe

sposób na uruchomienie lokalnie:
heroku local web

dane do bazy danych(należy ją najpierw utworzyć lokalnie!):
"username": "postgres",
"password": 123,
"database": "scrmenot",
"host": "127.0.0.1",

update npm:
npm install -g npm stable

update node:
npm install -g node

zaciągnięcie dependencji wymaganych w projekcie:
npm install

persystowanie modelu w bazie danych:
sequelize db:migrate

##DODATKOWE:


wersja node:
node --version

https://sequelize.readthedocs.io/en/v3/docs/getting-started/

pobranie sequlizera i klienta postgres:
npm install --save sequelize
npm install --save sequelize-cli
npm install --save pg pg-hstore

nie wykonywać(tylko dla informacji) - pozwala na utworzenie projektu Sequelize:
sequelize init

pomoc dotycząca tworzenia nowego modelu:
sequelize help:model:create

utworzenie nowego modelu:
sequelize model:create --name ModelName --attributes attribute1:data_type, attribute2:data_type

cofnięcie modelu:
sequelize db:migrate:undo 20190529210828-create-vote-opinion.js

drop bazy:
sequelize db:drop

opis typów danych w Sequelize:
http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes

utworzenie nowej migracji(w celu utrwaleniu zmian modelu w bazie danych):
sequelize migration:generate --name ModelName
