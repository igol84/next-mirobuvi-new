export async function GET() {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE yml_catalog SYSTEM "shops.dtd">
  <shop>
    <categories>
    <category id="287">Vans</category>
    <category id="188">Nike</category>
    <category id="214">Adidas</category>
    <category id="171">Converse</category>
    <category id="964">Dr. Martens</category>
    <category id="414">RenBen</category>
    <category id="407">Reebok</category>
    <category id="1346">Made in Ukraine</category>
    <category id="694">New Balance</category>
    <category id="225">Fashion</category>
    <category id="746">FILA</category>
    <category id="769">LIICI</category>
    <category id="1062">STILLI</category>
    <category id="1013">Prima d'Arte</category>
    <category id="1337">Lonza</category>
    <category id="398">UGG</category>
    <category id="600">Asics</category>
    <category id="495">LED кросівки</category>
    <category id="492">CAT</category>
    <category id="172">Rider</category>
    <category id="208">Tim</category>
    <category id="202">Різні</category>
  </categories>
  </shop>`;

  return new Response(xmlContent, { headers: { "Content-Type": "text/xml" } });
}