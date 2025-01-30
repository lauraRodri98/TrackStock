@echo off

:: Abrir terminal para MongoDB
start cmd /k "cd /d C:\Program Files\MongoDB\Server\8.0\bin && mongod"

:: Abrir terminal para el Backend
start cmd /k "cd /d C:\Escritorio-Laura\inventario-GitHub\Backend && npm start"

:: Abrir terminal para el Frontend
start cmd /k "cd /d C:\Escritorio-Laura\inventario-GitHub\nextjs-dashboard && pnpm run dev"

echo Todas las terminales se han abierto. MongoDB, Backend y Frontend están iniciándose.
