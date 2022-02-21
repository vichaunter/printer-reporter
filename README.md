# The idea behind

The main usage for the script is to recover and send total of copies made
by a given printer. 

Can be placed in a cron, the way that will periodically retrieve the info
and send it to a remote endpoint.

## How to install node

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
nvm install v16.14.0
```

## How to run the script

```
node index.js
```

## How to configure the script

There is 2 ways to configure the script, one is remotely and another is local.

Config file for base configuration must be placed next to the script:
```
folder/
  - printer-reporter.js
  - config.json
```
This way the script will use that config automatically.


For remote configuration is enough to provide the basic info + list of printer tokens:
```
{
    "id": "Some name 1",
    "baseUrl": "https://your-api-domain/api",
    "printers": [
        {
            "token": "32534c4d3e9512bdaca3d7fca9828018"
        }
    ]
}
```

This will make the script to ask the api endpoint `/api/printers/info` for the printers codeGroups configuration.

That codeGroups configuration coming from the api must be the same as the added for local configuration.

If you don't want to depend on remote api for the configuration, you can fill it like this:

```
{
    "id": "Some name 1",
    "baseUrl": "https://your-api-domain/api",
    "printers": [
        {
            "id": 1,
            "ip": "10.0.0.200",
            "codeGroups": [
                {
                    "type": "copiasbn",
                    "codes": [
                        "1.3.6.1.4.1.1347.42.3.1.2.1.1.1.1",
                        "1.3.6.1.4.1.1347.42.3.1.2.1.1.2.1"
                    ]
                },
                {
                    "type": "copiascl",
                    "codes": [
                        "1.3.6.1.4.1.1347.42.3.1.2.1.1.1.3",
                        "1.3.6.1.4.1.1347.42.3.1.2.1.1.2.3"
                    ]
                },
                {
                    "type": "copiasl",
                    "codes": [
                        "1.3.6.1.4.1.1347.42.2.4.1.1.1.1.2",
                        "1.3.6.1.4.1.1347.42.2.4.1.1.1.1.1"
                    ]
                },
                {
                    "type": "copiasll",
                    "codes": [
                        "1.3.6.1.4.1.1347.42.2.4.1.1.2.1.2",
                        "1.3.6.1.4.1.1347.42.2.4.1.1.1.1.1"
                    ]
                },
                {
                    "type": "copiaslll",
                    "codes": [
                        "1.3.6.1.4.1.1347.42.2.4.1.1.2.1.2",
                        "1.3.6.1.4.1.1347.42.2.4.1.1.2.1.1"
                    ]
                },
                
                {
                    "type": "escaneos",
                    "codes": [
                        "1.3.6.1.4.1.1347.42.3.1.3.1.1.2",
                        "1.3.6.1.4.1.1347.42.3.1.4.1.1.1"
                    ]
                }				
            ]
        }
    ]
}
```

Data extracted from printers will be sent to `/api/printers/update-report` one codeGroup at
once. You can place as many code groups as you want. Type will be included in the request
with the total result from sum all the codes provided for each type.

Each code executed on terminal must return only one line. Only the last number found in the
returning string from the command will be considered as the total for that code.

# Extra info

## Examples
```
bn
snmpwalk -c public -v 1 192.168.5.245 1.3.6.1.4.1.1347.42.3.1.2.1.1.1.1
color
snmpwalk -c public -v 1 192.168.5.246 1.3.6.1.4.1.1347.42.3.1.2.1.1.1.3
```

## SNMPWALK codes

IMPRESIONES BN
1.3.6.1.4.1.1347.42.3.1.2.1.1.1.1
FOTOCOPIAS BN
1.3.6.1.4.1.1347.42.3.1.2.1.1.2.1


IMPRESIONES COLOR
1.3.6.1.4.1.1347.42.3.1.2.1.1.1.3
FOTOCOPIAS COLOR
1.3.6.1.4.1.1347.42.3.1.2.1.1.2.3


PAGINAS ESCANEADAS COPIA
1.3.6.1.4.1.1347.42.3.1.3.1.1.2
PAGINAS ESCANEADAS OTRO
1.3.6.1.4.1.1347.42.3.1.4.1.1.1


Nivel 1 copia
1.3.6.1.4.1.1347.42.2.4.1.1.1.1.2
Nivel 1 Impresora
1.3.6.1.4.1.1347.42.2.4.1.1.1.1.1


Nivel 2 Copia
1.3.6.1.4.1.1347.42.2.4.1.1.2.1.2
Nivel 2 Impresora
1.3.6.1.4.1.1347.42.2.4.1.1.2.1.1


Nivel 3 Copia
1.3.6.1.4.1.1347.42.2.4.1.1.3.1.2
Nivel 3 Impresora
1.3.6.1.4.1.1347.42.2.4.1.1.3.1.1