Clone dspace-angular if is needed:
```
git clone -b dspace-7.6 git@github.com:DSpace/dspace-angular.git
```

Clone the template
```
git clone git@github.com:yorkulibraries/yorkspace-theme.git
```

Rename "dspace-angular/" with the folder name of your project (if applicable).
```
rsync -a --exclude=.git yorkspace-theme/ dspace-angular/ 
```

If the browser doesn't load the Altmetric or Plumx, add the following environment variables:
```
DSPACE_UI_ALTMETRIC=https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js
DSPACE_UI_PLUMX=https://cdn.plu.mx/widget-popup.js
```
