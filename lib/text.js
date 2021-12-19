export const excelText = `De informatie in dit document bevat Unilever vertrouwelijke informatie. Klant is niet gerechtigd dit document of informatie hieruit met derden te delen. Tevens geldt dat:
 - Calculaties of bedragen betreffende mogelijk door klant behaalde of te behalen marges of omzetten niet meer zijn dan prognoses. De bedragen en prognoses
   zijn slechts illustratief en bieden geen enkele garantie, evenmin voor toekomstige Restore Value projecten. Klant kan hieraan dan ook geen rechten ontlenen. Unilever zal
   niet in discussie gaan over de berekening of juistheid van de vermelde bedragen; en
 - Verwijzingen naar CAP (Consumenten Advies Prijs) en/of RSV (Restore Value) of Prijsadvies uitsluitend betrekking hebben op de adviserende rol van Unilever ten
   aanzien van door klant te hanteren consumentenprijzen, en
 - Het klant te allen tijde vrij staat om haar eigen consumentenprijzen te bepalen.`;



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
