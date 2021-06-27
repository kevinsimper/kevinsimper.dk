import React from 'react'

function nl2br(strings) {
  return strings.raw[0].split('\n').map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    )
  })
}

function BryllupPage() {
  return (
    <div>
      <style>{`header, footer { display: none}`}</style>
      <div className="h-screen flex flex-col justify-center">
        <h1 className="text-3xl text-center">Sofie & Kevins Bryllup</h1>
        <h2 className="text-xl text-center">30. Oktober 2021</h2>
      </div>

      <div className="h-screen flex flex-col justify-center">
        <div className="mx-auto">
          <p className="py-3">
            Efter 7 års eventyr skal vi nu giftes!
            <br />
            Det vil derfor glæde os at se jer til vores bryllup
          </p>

          <p className="py-3">LØRDAG DEN 30. OKTOBER 2021</p>

          <p className="py-3">
            Vi håber I vil være med til at fejre vores store dag!
          </p>

          <p className="py-3">
            De kærligste hilsner
            <br />
            Sofie & Kevin
          </p>
        </div>
      </div>

      <div className="pb-12">
        <h2 className="text-xl pt-6">PRAKTISK INFO</h2>

        <p className="py-3">
          Toastmaster-par:
          <br />
          Maria & Carina Hartmann Olsen
          <br />
          Mail:{' '}
          <a
            className="text-blue-800"
            href="mailto:carinahartmannolsen@hotmail.com"
          >
            carinahartmannolsen@hotmail.com
          </a>
          <br />
          Mobil:{' '}
          <a className="text-blue-800" href="tel:28434957">
            28 43 49 57
          </a>
        </p>

        <p className="py-3">
          Eventuelle indslag skal meddeles senest 14 dage inden brylluppet
        </p>

        <p className="py-3">
          Gavekoordinator:
          <br />
          Ønskeliste ligger i facebookgruppen: Sofie og Kevins bryllup
        </p>

        <p className="py-3">
          Hvis brug for ønskeliste på mail, kontakt:
          <br />
          Julie Nyberg Simper
          <br />
          Mail:{' '}
          <a className="text-blue-800" href="mailto:simperjulie@gmail.com">
            simperjulie@gmail.com
          </a>
          <br />
          Mobil:{' '}
          <a className="text-blue-800" href="tel:42411213">
            42 41 12 13
          </a>
        </p>

        <p className="py-3">
          Dresscode:
          <br />
          Kom i det fineste festtøj I har!
        </p>

        <p className="py-3">
          Allergener:
          <br />
          Oplys om allergener ved tilmeldingen.
        </p>

        <p className="py-3">
          S.U senest d. 30. august
          <br />
          Kevin:{' '}
          <a className="text-blue-800" href="tel:40360565">
            40 36 05 65
          </a>{' '}
          - Sofie:{' '}
          <a className="text-blue-800" href="tel:28573302">
            28 57 33 02
          </a>
          <br />
          Ved tilmelding bedes I venligst svare på,
          <br />
          om I deltager i både kanalrundfarten og bryllupsfesten.
        </p>
      </div>

      <div className="pb-12">
        <h2 className="text-xl pt-6">PROGRAM</h2>

        <p className="py-3">
          {nl2br`13.30
Vielsen starter i Vor Frue Kirke

15.30
Kanalrundfart fra Højbro Plads

16.25
Ankomst ved Den lille Havfrue
herfra 5 minutters gåtur til Langelinie-Pavillonen.

16.30
Velkomstdrink og bryllupskage

17.30
Fællesfoto

18.00
Middag

23.45
Brudevals

00.00-03.00
Fest, lækre drinks og natmad`}
        </p>
      </div>

      <div>
        <h2 className="text-xl pt-6 pb-2">ADRESSER</h2>

        <p className="py-3">
          <a
            className="underline hover:no-underline text-blue-800"
            href="https://goo.gl/maps/ZXuGYDMoCRqJ64AG8"
          >
            {nl2br`Kirke
Vor frue kirke
Fiolstræde 4
1171 København`}
          </a>
        </p>
        <p className="py-3">
          <a
            className="underline hover:no-underline text-blue-800"
            href="https://goo.gl/maps/Vh9UMpCyUeH9m2bT6"
          >
            {nl2br`Kanalrundfart
Ved stranden 26
1061 København
(Højbro Plads)`}
          </a>
        </p>
        <p className="py-3">
          <a
            className="underline hover:no-underline text-blue-800"
            href="https://goo.gl/maps/JCGwtVA7hGquyQiQ7"
          >
            {nl2br`Bryllupsfest
Langelinie-Pavillonen
Langelinie 10
2100 København`}
          </a>
        </p>
      </div>
    </div>
  )
}

export default BryllupPage
