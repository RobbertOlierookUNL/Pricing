export const excelText = `Berekend op ${"basis"} van RSP (Retail Sales Price), de RSP is de gemiddelde consumentenverkoopprijs.
Bijgaande marge-bedragen berusten op een inschatting door Unilever en illustreren slechts een verandering in retailermarge op de betreffende producten over een bepaalde tijdsspanne. Het betreft geen weerspiegeling van de marge-ontwikkeling op het gehele portfolio. Unilever wenst op geen enkele manier discussie met de klant over de berekening of de juistheid van deze cijfers.`;

export const mailText = (name, category, retailer) => (
	`Hallo ${name},

Hierbij ontvang je het vrijblijvend advies voor ${retailer} betreffende ${category}. Controleer voor het uitsturen de bijlage op juistheid en stem onderling af wie welk vrijblijvend advies op welk niveau uitstuurt.

Onderstaande voorbeeldtekst kan gebruikt worden als basis voor het uitdragen van het vrijblijvende advies:

Beste [naam invullen],

Graag wil ik je attenderen op de door Unilever geadviseerde consumentenadviesprijs/-prijzen voor ${category}.
Uiteraard is het bepalen van de consumentenverkoopprijs enkel en alleen uw verantwoordelijkheid. Unilever is hierin slechts adviseur.

Bijgaande marge-bedragen berusten op een inschatting door Unilever en illustreren slechts een verandering in retailermarge op de betreffende producten over een bepaalde tijdsspanne.
Het betreft geen weerspiegeling van de marge-ontwikkeling op het gehele portfolio. Unilever wenst op geen enkele manier discussie met de klant over de berekening of de juistheid van deze cijfers.

Met vriendelijke groet,

${name}

Advies zal te allen tijde vrijblijvend moeten zijn voor de klant en worden gegeven binnen de legal guidelines. Voor Legal guidance wordt verwezen naar https://unilever.sharepoint.com/sites/AntitrustandCompetitionLaw/SitePages/Resources-for-our-business.aspx

Succes!

Vriendelijke groet,

Value & Pricing Team
`
);

export const mailHtml =  (name, category, retailer) => (
	`<div><p>Hallo ${name},</p>

<p>Hierbij ontvang je het vrijblijvend advies voor ${retailer} betreffende ${category}. Controleer voor het uitsturen de bijlage op juistheid en stem onderling af wie welk vrijblijvend advies op welk niveau uitstuurt.</p>

<p>Onderstaande voorbeeldtekst kan gebruikt worden als basis voor het uitdragen van het vrijblijvende advies:</p>

<i><p>Beste <b>[naam invullen]</b>,</p>

<p>Graag wil ik je attenderen op de door Unilever geadviseerde consumentenadviesprijs/-prijzen voor ${category}.
Uiteraard is het bepalen van de consumentenverkoopprijs enkel en alleen uw verantwoordelijkheid. Unilever is hierin slechts adviseur.</p>

<p>Bijgaande marge-bedragen berusten op een inschatting door Unilever en illustreren slechts een verandering in retailermarge op de betreffende producten over een bepaalde tijdsspanne.
Het betreft geen weerspiegeling van de marge-ontwikkeling op het gehele portfolio. Unilever wenst op geen enkele manier discussie met de klant over de berekening of de juistheid van deze cijfers.</p>

<p>Met vriendelijke groet,</p>

<p>${name}</p></i>

<p>Advies zal te allen tijde vrijblijvend moeten zijn voor de klant en worden gegeven binnen de legal guidelines. Voor Legal guidance wordt verwezen naar https://unilever.sharepoint.com/sites/AntitrustandCompetitionLaw/SitePages/Resources-for-our-business.aspx</p>

<p>Succes!</p>

<p>Vriendelijke groet,</p>

<p>Value & Pricing Team</p>
</div>
`
);
