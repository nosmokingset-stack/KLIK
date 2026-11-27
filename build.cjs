/* One source for local HTML and Blogger XML. No dependencies. */
const fs=require('fs');
const body=fs.readFileSync('body.html','utf8').replace('<!-- LEGAL_DOCUMENTS -->', fs.readFileSync('legal.html','utf8')),css=fs.readFileSync('site.css','utf8')+'\n'+fs.readFileSync('styles-v1.2.css','utf8')+'\n'+fs.readFileSync('styles-v1.3.css','utf8')+'\n'+fs.readFileSync('styles-v1.4.css','utf8')+'\n'+fs.readFileSync('styles-v1.5.css','utf8')+'\n'+fs.readFileSync('styles-directory.css','utf8'),js=fs.readFileSync('site.js','utf8')+'\n'+fs.readFileSync('directory-search.js','utf8')+'\n'+fs.readFileSync('directory.js','utf8');
const arg=process.argv.indexOf('--asset-base');
const config=JSON.parse(fs.readFileSync('assets.config.json','utf8'));
const base=arg>=0?process.argv[arg+1]:config.baseUrl;
if(!base||!/^https:\/\//.test(base))throw Error('Asset base must be an HTTPS URL');
const root=base.replace(/\/$/,'')+'/';
const xmlEscape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;');
const absoluteBody=body.replaceAll('assets/',xmlEscape(root)+'assets/');
const title='KLIK – Магнітна кнопка для води';
const description='Магнітна кнопка KLIK для автоматів питної води. Один клік – вільні руки! Одна кнопка – 199 грн, дві – 299 грн.';
const fonts='<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Montserrat:ital,wght@0,700;0,800;0,900;1,800;1,900&amp;display=swap" rel="stylesheet"/>';
const seo=`<title>${title}</title><meta name="description" content="${description}"/><meta name="theme-color" content="#e5f4ff"/><meta property="og:type" content="website"/><meta property="og:locale" content="uk_UA"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/>`;
fs.writeFileSync('index.html',`<!doctype html>\n<html lang="uk"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>${seo}<meta property="og:image" content="${xmlEscape(root)}assets/products/07-hero-water-1200-white.webp"/><meta property="og:url" content="https://klickkhua.blogspot.com/"/><link rel="canonical" href="https://klickkhua.blogspot.com/"/>${fonts}<link rel="stylesheet" href="site.css"/><link rel="stylesheet" href="styles-v1.2.css"/><link rel="stylesheet" href="styles-v1.3.css"/><link rel="stylesheet" href="styles-v1.4.css"/><link rel="stylesheet" href="styles-v1.5.css"/><link rel="stylesheet" href="styles-directory.css"/></head><body>${body}<script src="site.js" defer="defer"></script><script src="directory-search.js" defer="defer"></script><script src="directory.js" defer="defer"></script></body></html>`);
fs.writeFileSync('template.xml',`<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:b="http://www.google.com/2005/gml/b" xmlns:data="http://www.google.com/2005/gml/data" xmlns:expr="http://www.google.com/2005/gml/expr" lang="uk" b:version="2" b:layoutsVersion="3" b:defaultwidgetversion="2" b:responsive="true">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
${seo}
<!-- Blogger's current canonical follows the connected domain. -->
<link expr:href="data:blog.canonicalUrl" rel="canonical"/>
<meta expr:content="data:blog.canonicalUrl" property="og:url"/>
<meta property="og:image" content="${xmlEscape(root)}assets/products/07-hero-water-1200-white.webp"/>
<meta property="og:image:alt" content="KLIK: жовта кнопка та візуалізація синьої"/>
<!-- Optional favicon: add a link rel="icon" with your HTTPS asset URL. -->
<!-- Optional Search Console verification meta and Analytics script go here after configuration. -->
${fonts}
<b:skin><![CDATA[\n${css}\n]]></b:skin>
<b:template-skin><![CDATA[body#layout .blogger-system{display:block!important}]]></b:template-skin>
</head><body>
${absoluteBody}
<!-- Required Blogger layout anchor; no blog feed or standard widgets. -->
<b:section id="bloggerSystem" class="blogger-system" maxwidgets="1" showaddelement="no"></b:section>
<script type="text/javascript">//<![CDATA[\n${js}\n//]]></script>
</body></html>`);
console.log('Built index.html and template.xml. Asset base: '+root);
fs.mkdirSync('preview',{recursive:true});
fs.writeFileSync('preview/index.html',fs.readFileSync('index.html','utf8').replace('<head>','<head><base href="../"/>'));
